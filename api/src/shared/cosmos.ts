// ---------------------------------------------------------------------------
// TheOneCrawl — Direct Cosmos DB client
//
// Single-database architecture: database "theonecrawl" with containers:
//   - accounts: account, api_key, membership, webhook_config
//   - jobs: crawl_job, scrape_result, batch_job
//   - billing: credit_record, invoice, subscription, usage_event
// ---------------------------------------------------------------------------

import { CosmosClient, type Container, type Database, type SqlParameter, type ItemDefinition, type PatchRequestBody } from '@azure/cosmos';
import { DefaultAzureCredential } from '@azure/identity';

let client: CosmosClient | null = null;
let database: Database | null = null;
const containers = new Map<string, Container>();

const DATABASE_NAME = process.env['COSMOS_DATABASE'] || 'theonecrawl';

export function getCosmosClient(): CosmosClient {
  if (client) return client;

  const endpoint = process.env['COSMOS_ENDPOINT'];
  const key = process.env['COSMOS_KEY'];

  if (!endpoint) {
    throw new Error('COSMOS_ENDPOINT environment variable is required');
  }

  if (key) {
    client = new CosmosClient({ endpoint, key });
  } else {
    // Use managed identity in production
    const credential = new DefaultAzureCredential();
    client = new CosmosClient({ endpoint, aadCredentials: credential });
  }

  return client;
}

export function getDatabase(): Database {
  if (database) return database;
  database = getCosmosClient().database(DATABASE_NAME);
  return database;
}

export function getContainer(name: string): Container {
  const cached = containers.get(name);
  if (cached) return cached;

  const container = getDatabase().container(name);
  containers.set(name, container);
  return container;
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export async function cosmosQuery<T>(
  containerName: string,
  query: string,
  parameters: SqlParameter[] = [],
): Promise<T[]> {
  const container = getContainer(containerName);
  const { resources } = await container.items
    .query<T>({ query, parameters })
    .fetchAll();
  return resources;
}

export async function cosmosRead<T extends ItemDefinition>(
  containerName: string,
  id: string,
  partitionKey: string,
): Promise<T | null> {
  try {
    const container = getContainer(containerName);
    const { resource } = await container.item(id, partitionKey).read<T>();
    return resource ?? null;
  } catch (err) {
    const code = (err as { code?: number }).code;
    if (code === 404) return null;
    throw err;
  }
}

export async function cosmosUpsert<T extends { id: string }>(
  containerName: string,
  doc: T,
): Promise<T> {
  const container = getContainer(containerName);
  const { resource } = await container.items.upsert<T>(doc);
  return resource as T;
}

export async function cosmosCreate<T extends { id: string }>(
  containerName: string,
  doc: T,
): Promise<T> {
  const container = getContainer(containerName);
  const { resource } = await container.items.create<T>(doc);
  return resource as T;
}

export async function cosmosDelete(
  containerName: string,
  id: string,
  partitionKey: string,
): Promise<boolean> {
  try {
    const container = getContainer(containerName);
    await container.item(id, partitionKey).delete();
    return true;
  } catch (err) {
    const code = (err as { code?: number }).code;
    if (code === 404) return false;
    throw err;
  }
}

export async function cosmosPatch<T extends ItemDefinition>(
  containerName: string,
  id: string,
  partitionKey: string,
  operations: PatchRequestBody,
): Promise<T | null> {
  try {
    const container = getContainer(containerName);
    const { resource } = await container.item(id, partitionKey).patch<T>(operations);
    return resource ?? null;
  } catch (err) {
    const code = (err as { code?: number }).code;
    if (code === 404) return null;
    throw err;
  }
}

/**
 * Check if Cosmos DB is configured and available.
 */
export function isCosmosConfigured(): boolean {
  return !!process.env['COSMOS_ENDPOINT'];
}
