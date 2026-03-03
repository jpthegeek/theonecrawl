#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# TheOneCrawl — Provision Azure Cache for Redis
# ---------------------------------------------------------------------------
set -euo pipefail

RG="TheOneCrawl"
LOCATION="eastus2"
REDIS_NAME="theonecrawl-redis"
KEY_VAULT="theonecrawl-vault"
CONTAINER_APP="theonecrawl-api"
CONTAINER_ENV="theonecrawl-env"

echo "=== Creating Azure Cache for Redis: $REDIS_NAME ==="
az redis create \
  --resource-group "$RG" \
  --name "$REDIS_NAME" \
  --location "$LOCATION" \
  --sku Standard \
  --vm-size C0 \
  --enable-non-ssl-port false \
  --minimum-tls-version 1.2

echo "=== Waiting for Redis to provision... ==="
az redis wait --resource-group "$RG" --name "$REDIS_NAME" --created

echo "=== Retrieving connection info ==="
REDIS_HOST=$(az redis show --resource-group "$RG" --name "$REDIS_NAME" --query "hostName" -o tsv)
REDIS_KEY=$(az redis list-keys --resource-group "$RG" --name "$REDIS_NAME" --query "primaryKey" -o tsv)
REDIS_PORT=6380
REDIS_URL="rediss://:${REDIS_KEY}@${REDIS_HOST}:${REDIS_PORT}"

echo "=== Storing connection string in Key Vault ==="
az keyvault secret set \
  --vault-name "$KEY_VAULT" \
  --name "redis-url" \
  --value "$REDIS_URL"

echo "=== Setting REDIS_URL on Container App ==="
VAULT_URI=$(az keyvault show --name "$KEY_VAULT" --query "properties.vaultUri" -o tsv)
az containerapp update \
  --resource-group "$RG" \
  --name "$CONTAINER_APP" \
  --set-env-vars "REDIS_URL=secretref:redis-url"

echo "=== Done! Redis: $REDIS_HOST:$REDIS_PORT ==="
echo "Redis URL stored in Key Vault as 'redis-url'"
