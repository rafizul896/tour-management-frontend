"use client";

import config from "@/components/config";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
}

export function LoginForm({
  onSwitchToSignup,
  onSwitchToForgotPassword,
}: LoginFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("login", Object.fromEntries(data));

  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="text-lg">Login to your account</DialogTitle>
      </DialogHeader>

      <FieldGroup>
        <div className="grid grid-cols-1 gap-4 mt-5">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
            />
          </Field>

          {/* Password */}
          <Field>
            <div className="flex  justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Button
                type="button"
                variant="link"
                className="ml-auto h-auto p-0 text-[13px]"
                onClick={onSwitchToForgotPassword}
              >
                Forgot your password?
              </Button>
            </div>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </Field>
        </div>
      </FieldGroup>

      <DialogFooter className="flex-col gap-2 sm:flex-col mt-4">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => window.open(`${config.baseUrl}/auth/google`)}
        >
          Login with Google
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="h-auto p-0"
            onClick={onSwitchToSignup}
          >
            Sign Up
          </Button>
        </p>
      </DialogFooter>
    </form>
  );
}
