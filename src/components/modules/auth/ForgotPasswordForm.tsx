"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void
  onSent: (email: string) => void
}

export function ForgotPasswordForm({
  onSwitchToLogin,
  onSent,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: call your "send reset link" API here
    onSent(email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Reset your password</DialogTitle>
        <DialogDescription>
          Enter your email and we&apos;ll send you a link to reset your
          password
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="reset-email">Email</Label>
          <Input
            id="reset-email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <DialogFooter className="flex-col gap-2 sm:flex-col">
        <Button type="submit" className="w-full">
          Send reset link
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={onSwitchToLogin}
        >
          Back to login
        </Button>
      </DialogFooter>
    </form>
  )
}

interface ForgotPasswordSentProps {
  email: string
  onSwitchToLogin: () => void
}

export function ForgotPasswordSent({
  email,
  onSwitchToLogin,
}: ForgotPasswordSentProps) {
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Check your email</DialogTitle>
        <DialogDescription>
          We sent a password reset link to{" "}
          {email ? <span className="font-medium text-foreground">{email}</span> : "your email"}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="flex-col gap-2 pt-4 sm:flex-col">
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={onSwitchToLogin}
        >
          Back to login
        </Button>
      </DialogFooter>
    </div>
  )
}