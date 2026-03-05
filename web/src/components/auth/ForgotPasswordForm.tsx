import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '@/config/api';
import { BirdSymbol } from '@/components/BirdSymbol';
import { Alert } from '@/components/ui/Alert';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch('/v1/auth/forgot-password', {
        method: 'POST',
        json: { email },
      });
    } catch {
      // Always show success to prevent email enumeration
    }
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden px-4">
      {/* Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/[0.08] blur-[100px] animate-float pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[80px] animate-float-slow pointer-events-none" />
      {/* Corner accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.08),transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-strong rounded-2xl overflow-hidden shadow-glow-sm">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="p-8 space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <BirdSymbol className="h-6 w-6 text-orange-500" />
                <span className="font-semibold text-foreground">The One Crawl</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            {sent ? (
              <Alert variant="success">
                If that email is registered, you'll receive a reset link shortly.
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    placeholder="you@example.com"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring/50 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
