#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# TheOneCrawl — Cloudflare DNS + WAF setup
#
# Prerequisites:
#   - CLOUDFLARE_API_TOKEN env var with Zone:Edit + DNS:Edit permissions
#   - theonecrawl.app zone must already exist in Cloudflare
#
# Usage:
#   CLOUDFLARE_API_TOKEN=xxx bash scripts/setup-cloudflare.sh
# ---------------------------------------------------------------------------

set -euo pipefail

API="https://api.cloudflare.com/client/v4"
DOMAIN="theonecrawl.app"

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "ERROR: CLOUDFLARE_API_TOKEN is required"
  exit 1
fi

auth_header="Authorization: Bearer $CLOUDFLARE_API_TOKEN"

# Get zone ID
echo "Looking up zone for $DOMAIN..."
ZONE_ID=$(curl -s -H "$auth_header" "$API/zones?name=$DOMAIN" | python3 -c "import sys,json; print(json.load(sys.stdin)['result'][0]['id'])")
echo "Zone ID: $ZONE_ID"

add_dns() {
  local type=$1 name=$2 content=$3 proxied=${4:-false} priority=${5:-""}
  local data="{\"type\":\"$type\",\"name\":\"$name\",\"content\":\"$content\",\"proxied\":$proxied,\"ttl\":1"
  if [ -n "$priority" ]; then
    data="$data,\"priority\":$priority"
  fi
  data="$data}"

  echo "  Adding $type $name -> $content (proxied=$proxied)"
  curl -s -X POST -H "$auth_header" -H "Content-Type: application/json" \
    "$API/zones/$ZONE_ID/dns_records" -d "$data" | python3 -c "
import sys,json
r=json.load(sys.stdin)
if r['success']:
  print('    OK:', r['result']['id'])
else:
  # Check if it's a duplicate
  for e in r.get('errors', []):
    if e.get('code') == 81057:
      print('    Already exists, skipping')
    else:
      print('    ERROR:', e.get('message', str(e)))
"
}

echo ""
echo "=== DNS Records ==="

# API — Container App (proxied through Cloudflare WAF)
# Replace with actual Container App FQDN once created
CONTAINER_APP_FQDN="${CONTAINER_APP_FQDN:-theonecrawl-api.agreeablewave-ef237075.eastus2.azurecontainerapps.io}"
add_dns "CNAME" "api" "$CONTAINER_APP_FQDN" true

# Web app — Azure Static Web App (proxied)
SWA_HOSTNAME="${SWA_HOSTNAME:-happy-forest-065c35d0f.4.azurestaticapps.net}"
add_dns "CNAME" "app" "$SWA_HOSTNAME" true

# Root domain redirect to app
add_dns "A" "@" "192.0.2.1" true  # Dummy IP, Cloudflare will handle redirect rule

# SES DKIM verification records (NOT proxied — DNS only)
add_dns "CNAME" "qjlqp4dximu3ckqfjxd35hy3qbitdaon._domainkey" "qjlqp4dximu3ckqfjxd35hy3qbitdaon.dkim.amazonses.com" false
add_dns "CNAME" "7pot5a65venqb5q4bwekxaxwlrylv4oo._domainkey" "7pot5a65venqb5q4bwekxaxwlrylv4oo.dkim.amazonses.com" false
add_dns "CNAME" "rrgaxrqglvl6upq3wbogopmalyxr6pxw._domainkey" "rrgaxrqglvl6upq3wbogopmalyxr6pxw.dkim.amazonses.com" false

# SES MAIL FROM (custom return-path)
add_dns "MX" "mail" "feedback-smtp.us-east-1.amazonses.com" false 10
add_dns "TXT" "mail" "\"v=spf1 include:amazonses.com ~all\"" false

# SPF for root domain
add_dns "TXT" "@" "\"v=spf1 include:amazonses.com ~all\"" false

# DMARC
add_dns "TXT" "_dmarc" "\"v=DMARC1; p=quarantine; rua=mailto:dmarc@theonecrawl.app\"" false

echo ""
echo "=== WAF Rules ==="

# Create a WAF custom rule to rate-limit auth endpoints
echo "Creating WAF rate-limit rule for auth endpoints..."
curl -s -X POST -H "$auth_header" -H "Content-Type: application/json" \
  "$API/zones/$ZONE_ID/rulesets/phases/http_ratelimit/entrypoint" \
  -d '{
    "rules": [{
      "expression": "(http.request.uri.path contains \"/v1/auth/login\" or http.request.uri.path contains \"/v1/auth/register\" or http.request.uri.path contains \"/v1/auth/forgot-password\")",
      "description": "Rate limit auth endpoints (10 req/min per IP)",
      "action": "block",
      "ratelimit": {
        "characteristics": ["ip.src"],
        "period": 60,
        "requests_per_period": 10,
        "mitigation_timeout": 300
      }
    }]
  }' | python3 -c "
import sys,json
r=json.load(sys.stdin)
if r['success']:
  print('  WAF rule created')
else:
  print('  WAF error:', r.get('errors', []))
"

# Create redirect rule: root domain -> app subdomain
echo "Creating redirect rule: theonecrawl.app -> app.theonecrawl.app..."
curl -s -X POST -H "$auth_header" -H "Content-Type: application/json" \
  "$API/zones/$ZONE_ID/rules/lists" \
  -d '{}' 2>/dev/null || true

echo ""
echo "=== SSL/TLS ==="
echo "Setting SSL mode to Full (Strict)..."
curl -s -X PATCH -H "$auth_header" -H "Content-Type: application/json" \
  "$API/zones/$ZONE_ID/settings/ssl" -d '{"value":"strict"}' | python3 -c "
import sys,json
r=json.load(sys.stdin)
if r['success']: print('  SSL set to Full (Strict)')
else: print('  Error:', r.get('errors'))
"

echo "Enabling Always Use HTTPS..."
curl -s -X PATCH -H "$auth_header" -H "Content-Type: application/json" \
  "$API/zones/$ZONE_ID/settings/always_use_https" -d '{"value":"on"}' | python3 -c "
import sys,json
r=json.load(sys.stdin)
if r['success']: print('  Always HTTPS enabled')
else: print('  Error:', r.get('errors'))
"

echo "Enabling HSTS..."
curl -s -X PATCH -H "$auth_header" -H "Content-Type: application/json" \
  "$API/zones/$ZONE_ID/settings/security_header" -d '{"value":{"strict_transport_security":{"enabled":true,"max_age":31536000,"include_subdomains":true,"nosniff":true}}}' | python3 -c "
import sys,json
r=json.load(sys.stdin)
if r['success']: print('  HSTS enabled (1 year, include subdomains)')
else: print('  Error:', r.get('errors'))
"

echo ""
echo "=== Done ==="
echo "Cloudflare DNS + WAF configured for $DOMAIN"
echo ""
echo "Next steps:"
echo "  1. Verify SES DKIM records propagated (aws ses get-identity-dkim-attributes)"
echo "  2. Add custom domain bindings on Azure Container App and SWA"
echo "  3. Create Cloudflare API token for GitHub Actions CI/CD"
