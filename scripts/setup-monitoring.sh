#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# TheOneCrawl — Set up Azure Log Analytics + Application Insights
# ---------------------------------------------------------------------------
set -euo pipefail

RG="TheOneCrawl"
LOCATION="eastus2"
WORKSPACE_NAME="theonecrawl-logs"
INSIGHTS_NAME="theonecrawl-insights"
CONTAINER_APP="theonecrawl-api"
CONTAINER_ENV="theonecrawl-env"

echo "=== Creating Log Analytics workspace: $WORKSPACE_NAME ==="
az monitor log-analytics workspace create \
  --resource-group "$RG" \
  --workspace-name "$WORKSPACE_NAME" \
  --location "$LOCATION" \
  --retention-time 90

WORKSPACE_ID=$(az monitor log-analytics workspace show \
  --resource-group "$RG" \
  --workspace-name "$WORKSPACE_NAME" \
  --query "customerId" -o tsv)

WORKSPACE_KEY=$(az monitor log-analytics workspace get-shared-keys \
  --resource-group "$RG" \
  --workspace-name "$WORKSPACE_NAME" \
  --query "primarySharedKey" -o tsv)

WORKSPACE_RESOURCE_ID=$(az monitor log-analytics workspace show \
  --resource-group "$RG" \
  --workspace-name "$WORKSPACE_NAME" \
  --query "id" -o tsv)

echo "=== Creating Application Insights: $INSIGHTS_NAME ==="
az monitor app-insights component create \
  --app "$INSIGHTS_NAME" \
  --location "$LOCATION" \
  --resource-group "$RG" \
  --kind web \
  --application-type web \
  --workspace "$WORKSPACE_RESOURCE_ID"

INSIGHTS_CONNECTION=$(az monitor app-insights component show \
  --app "$INSIGHTS_NAME" \
  --resource-group "$RG" \
  --query "connectionString" -o tsv)

echo "=== Connecting Container App environment to Log Analytics ==="
az containerapp env update \
  --resource-group "$RG" \
  --name "$CONTAINER_ENV" \
  --logs-workspace-id "$WORKSPACE_ID" \
  --logs-workspace-key "$WORKSPACE_KEY"

echo "=== Setting APPLICATIONINSIGHTS_CONNECTION_STRING on Container App ==="
az containerapp update \
  --resource-group "$RG" \
  --name "$CONTAINER_APP" \
  --set-env-vars "APPLICATIONINSIGHTS_CONNECTION_STRING=$INSIGHTS_CONNECTION"

echo "=== Done! ==="
echo "Log Analytics workspace: $WORKSPACE_NAME (ID: $WORKSPACE_ID)"
echo "Application Insights: $INSIGHTS_NAME"
echo "Connection string set on $CONTAINER_APP"
