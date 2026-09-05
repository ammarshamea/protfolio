import { Lock } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authenticateDashboard } from "@/lib/dashboard-auth";

export function DashboardLogin({ error }: { error?: boolean }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <GlassCard hover={false} padding="lg" className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-3">
          <Lock className="h-5 w-5 text-[var(--accent)]" />
          <h1 className="text-lg font-semibold font-[family-name:var(--font-display)]">
            Private dashboard
          </h1>
        </div>
        <form action={authenticateDashboard} className="space-y-4">
          <div>
            <Label htmlFor="secret">Secret key</Label>
            <Input
              id="secret"
              name="secret"
              type="password"
              required
              className="mt-2"
              autoFocus
            />
          </div>
          {error ? (
            <p className="text-sm text-[var(--danger)]">
              Incorrect secret key.
            </p>
          ) : null}
          <Button type="submit" className="w-full">
            Unlock
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
