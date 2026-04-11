import { LoginForm } from "./LoginForm";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md rounded-xl border border-border/60 bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <span className="font-heading text-lg leading-none">S</span>
          </div>
          <div>
            <div className="font-heading text-xl font-semibold">{siteConfig.shortName}</div>
            <div className="text-xs text-muted-foreground">Admin sign-in</div>
          </div>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Default seeded credentials: <code>admin@example.com</code> / <code>admin123</code>
        </p>
      </div>
    </div>
  );
}
