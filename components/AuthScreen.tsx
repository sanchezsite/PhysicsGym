import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import type { AuthMode } from "@/types";

export function AuthScreen({
  mode,
  email,
  password,
  error,
  setEmail,
  setPassword,
  setMode,
  submit,
  usingDemoAuth,
}: {
  mode: AuthMode;
  email: string;
  password: string;
  error: string | null;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setMode: (v: AuthMode) => void;
  submit: () => void;
  usingDemoAuth: boolean;
}) {
  const isSignUp = mode === "signup";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 items-center py-8">
      <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-300/70">
            Account foundation
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-yellow-100 md:text-6xl">
            {isSignUp ? "Create your training account." : "Welcome back."}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-yellow-100/70">
            Your path, attempts, and completed problems live here.
          </p>
        </div>

        <Card className="rounded-[2rem] border-yellow-300/45 p-8 shadow-2xl shadow-black/40">
          <div className="flex gap-3 rounded-2xl bg-black/20 p-2">
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isSignUp
                  ? "bg-yellow-400 text-red-950"
                  : "text-yellow-100/70 hover:bg-yellow-400/10"
              }`}
            >
              Sign up
            </button>

            <button
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition ${
                !isSignUp
                  ? "bg-yellow-400 text-red-950"
                  : "text-yellow-100/70 hover:bg-yellow-400/10"
              }`}
            >
              Log in
            </button>
          </div>

          <label className="mt-6 block text-sm font-semibold text-yellow-100/80">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-yellow-300/35 bg-black/25 px-4 py-3 text-yellow-50 outline-none focus:border-yellow-300"
            placeholder="you@example.com"
            type="email"
          />

          <label className="mt-5 block text-sm font-semibold text-yellow-100/80">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-yellow-300/35 bg-black/25 px-4 py-3 text-yellow-50 outline-none focus:border-yellow-300"
            placeholder="At least 6 characters"
            type="password"
          />

          {error ? (
            <p className="mt-4 rounded-2xl border border-amber-300/50 bg-amber-400/10 p-3 text-sm text-amber-100">
              {error}
            </p>
          ) : null}

          <Button onClick={submit} className="mt-6 h-12 w-full text-base">
            {isSignUp ? "Create account →" : "Continue training →"}
          </Button>

          {usingDemoAuth ? (
            <p className="mt-5 text-sm leading-6 text-yellow-100/50">
              Demo mode: Supabase env variables were not detected.
            </p>
          ) : null}
        </Card>
      </div>
    </div>
  );
}