import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm, ForgotPasswordSent } from "./ForgotPasswordForm";

export type AuthMode =
  | "login"
  | "signup"
  | "forgot-password"
  | "forgot-password-sent";

export function AuthDialog() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [resetEmail, setResetEmail] = useState("");

  function handleOpenChange(open: boolean) {
    if (!open) {
      setMode("login");
      setResetEmail("");
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="default">Login</Button>} />
      <DialogContent className="sm:max-w-sm">
        {mode === "login" && (
          <LoginForm
            onSwitchToSignup={() => setMode("signup")}
            onSwitchToForgotPassword={() => setMode("forgot-password")}
          />
        )}

        {mode === "signup" && (
          <RegisterForm onSwitchToLogin={() => setMode("login")} />
        )}

        {mode === "forgot-password" && (
          <ForgotPasswordForm
            onSwitchToLogin={() => setMode("login")}
            onSent={(email) => {
              setResetEmail(email);
              setMode("forgot-password-sent");
            }}
          />
        )}

        {mode === "forgot-password-sent" && (
          <ForgotPasswordSent
            email={resetEmail}
            onSwitchToLogin={() => setMode("login")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
