"use client"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    // TODO: wire up to your auth logic
    console.log("signup", Object.fromEntries(data))
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Create an account</DialogTitle>
        <DialogDescription>
          Enter your details below to get started
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Pedro Duarte" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
          />
        </div>
      </div>

      <DialogFooter className="flex-col gap-2 sm:flex-col">
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="h-auto p-0"
            onClick={onSwitchToLogin}
          >
            Login
          </Button>
        </p>
      </DialogFooter>
    </form>
  )
}