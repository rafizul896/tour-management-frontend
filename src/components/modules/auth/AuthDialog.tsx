import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm, ForgotPasswordSent } from "./ForgotPasswordForm";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  closeAuthDialog,
  openAuthDialog,
  setAuthMode,
} from "@/redux/features/uiModeSlice";

export function AuthDialog() {
  const dispatch = useAppDispatch();
  const { authDialogOpen, authMode } = useAppSelector((state) => state.ui);
  const [resetEmail, setResetEmail] = useState("");

  function handleOpenChange(open: boolean) {
    if (open) {
      dispatch(openAuthDialog("login"));
    } else {
      dispatch(closeAuthDialog());
      setResetEmail("");
    }
  }

  return (
    <Dialog open={authDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={() => dispatch(openAuthDialog("login"))}
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        {authMode === "login" && (
          <LoginForm
            onSwitchToSignup={() => dispatch(setAuthMode("signup"))}
            onSwitchToForgotPassword={() =>
              dispatch(setAuthMode("forgot-password"))
            }
            onLoginSuccess={() => dispatch(closeAuthDialog())}
          />
        )}

        {authMode === "signup" && (
          <RegisterForm
            onSwitchToLogin={() => dispatch(setAuthMode("login"))}
            onSignupSuccess={() => dispatch(closeAuthDialog())}
          />
        )}

        {authMode === "forgot-password" && (
          <ForgotPasswordForm
            onSwitchToLogin={() => dispatch(setAuthMode("login"))}
            onSent={(email) => {
              setResetEmail(email);
              dispatch(setAuthMode("forgot-password-sent"));
            }}
          />
        )}

        {authMode === "forgot-password-sent" && (
          <ForgotPasswordSent
            email={resetEmail}
            onSwitchToLogin={() => dispatch(setAuthMode("login"))}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
