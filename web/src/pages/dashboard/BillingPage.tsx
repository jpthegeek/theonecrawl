import { useAuth } from '@/hooks/useAuth';
import { useCheckout, useBillingPortal } from '@/hooks/useBilling';
import { plans } from '@/config/plans';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { useSearchParams } from 'react-router-dom';

export function BillingPage() {
  const { account } = useAuth();
  const checkout = useCheckout();
  const portal = useBillingPortal();
  const [searchParams] = useSearchParams();

  const currentPlan = plans.find((p) => p.id === account?.plan) ?? plans[0]!;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your plan and billing.</p>
      </div>

      {searchParams.get('success') === 'true' && (
        <Alert variant="success">Your plan has been upgraded successfully.</Alert>
      )}
      {searchParams.get('canceled') === 'true' && (
        <Alert variant="warning">Checkout was canceled.</Alert>
      )}

      {/* Current plan */}
      <Card>
        <CardContent className="flex items-center justify-between py-5">
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <p className="text-xl font-bold mt-1 capitalize">{currentPlan.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {currentPlan.price === 0 ? 'Free forever' : `$${currentPlan.price}/mo`}
            </p>
          </div>
          {account?.plan !== 'free' && (
            <Button variant="secondary" onClick={() => portal.mutate()} loading={portal.isPending}>
              Manage billing
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Plan comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => {
          const isCurrent = plan.id === account?.plan;
          return (
            <Card key={plan.id} className={plan.highlighted ? 'ring-2 ring-brand-500' : ''}>
              <CardContent className="py-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{plan.name}</h3>
                    {isCurrent && <Badge variant="info">Current</Badge>}
                    {plan.highlighted && !isCurrent && <Badge variant="success">Popular</Badge>}
                  </div>
                  <p className="text-3xl font-bold mt-2">
                    ${plan.price}<span className="text-sm font-normal text-gray-500">/mo</span>
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <Button variant="secondary" className="w-full" disabled>Current plan</Button>
                ) : plan.price === 0 ? null : (
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                    onClick={() => checkout.mutate(plan.id)}
                    loading={checkout.isPending}
                  >
                    Upgrade
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
