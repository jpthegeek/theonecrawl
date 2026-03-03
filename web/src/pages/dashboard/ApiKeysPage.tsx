import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useApiKeys, useCreateApiKey, useRevokeApiKey } from '@/hooks/useApiKeys';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table';
import { CopyButton } from '@/components/ui/CopyButton';
import { Alert } from '@/components/ui/Alert';
import { Skeleton } from '@/components/ui/Skeleton';

export function ApiKeysPage() {
  const { data: keys, isLoading } = useApiKeys();
  const createKey = useCreateApiKey();
  const revokeKey = useRevokeApiKey();
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);

  const handleCreate = async () => {
    const result = await createKey.mutateAsync({ name: newKeyName, environment: 'live' });
    setNewKeyValue(result.key);
    setNewKeyName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your API keys for SDK and API access.</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create key
        </Button>
      </div>

      {newKeyValue && (
        <Alert variant="warning">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="font-medium">Save your API key now</p>
              <p className="text-sm mt-1">This is the only time you'll see the full key.</p>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-white/50 dark:bg-black/50 rounded px-2 py-1">{newKeyValue}</code>
              <CopyButton text={newKeyValue} />
            </div>
          </div>
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => setNewKeyValue(null)}>
            Dismiss
          </Button>
        </Alert>
      )}

      <Card>
        {isLoading ? (
          <CardContent className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        ) : !keys?.length ? (
          <CardContent className="text-center py-12 text-gray-500">
            No API keys yet. Create one to get started.
          </CardContent>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Key</TableHeader>
                <TableHeader>Environment</TableHeader>
                <TableHeader>Created</TableHeader>
                <TableHeader>Last used</TableHeader>
                <TableHeader />
              </TableRow>
            </TableHead>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell><code className="text-xs">{key.key_prefix}</code></TableCell>
                  <TableCell className="capitalize">{key.environment}</TableCell>
                  <TableCell className="text-gray-500">{new Date(key.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-gray-500">{key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => revokeKey.mutate(key.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create API Key">
        <div className="space-y-4">
          <Input
            label="Key name"
            placeholder="e.g., Production, Development"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreate} loading={createKey.isPending} disabled={!newKeyName}>
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
