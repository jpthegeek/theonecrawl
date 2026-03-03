import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAccount, useUpdateAccount, useDeleteAccount } from '@/hooks/useAccount';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export function SettingsPage() {
  const { account: authAccount, logout } = useAuth();
  const { data: account } = useAccount();
  const updateAccount = useUpdateAccount();
  const deleteAccount = useDeleteAccount();
  const navigate = useNavigate();

  const [name, setName] = useState(account?.name ?? authAccount?.name ?? '');
  const [newPassword, setNewPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    const updates: { name?: string; password?: string } = {};
    if (name !== account?.name) updates.name = name;
    if (newPassword) updates.password = newPassword;
    if (Object.keys(updates).length === 0) return;

    await updateAccount.mutateAsync(updates);
    setNewPassword('');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDelete = async () => {
    await deleteAccount.mutateAsync();
    await logout();
    navigate('/');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings.</p>
      </div>

      {saved && <Alert variant="success">Settings saved.</Alert>}

      <Card>
        <CardHeader><h2 className="font-semibold">Profile</h2></CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Email"
              value={account?.email ?? authAccount?.email ?? ''}
              disabled
            />
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="New password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              minLength={8}
            />
            <Button type="submit" loading={updateAccount.isPending}>
              Save changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><h2 className="font-semibold text-red-600">Danger Zone</h2></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Deleting your account is permanent. All data, API keys, and crawl history will be lost.
          </p>
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <Button variant="danger" onClick={handleDelete} loading={deleteAccount.isPending}>
                Yes, delete my account
              </Button>
              <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
              Delete account
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
