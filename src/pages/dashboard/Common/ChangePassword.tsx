import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthConfig = [
  { label: "Too weak", color: "bg-destructive" },
  { label: "Weak", color: "bg-destructive" },
  { label: "Fair", color: "bg-yellow-500" },
  { label: "Good", color: "bg-blue-500" },
  { label: "Strong", color: "bg-green-500" },
];

export default function ChangePassword() {
  const navigate = useNavigate();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<ChangePasswordFormValues>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const newPassword = form.watch("newPassword");
  const strength = getPasswordStrength(newPassword || "");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      form.setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }

    if (data.oldPassword === data.newPassword) {
      form.setError("newPassword", {
        message: "New password must be different from old password",
      });
      return;
    }

    try {
      const res = await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      if (res.success) {
        toast.success("Password changed successfully");
        form.reset();
        navigate("/");
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
      );
    }
  };

  return (
    <div className="flex items-center justify-center md:px-4 md:py-10">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Change Password</CardTitle>
          <CardDescription>
            Choose a strong password to keep your account secure.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="grid grid-cols-1 gap-4">
                  {/* Old Password */}
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    rules={{ required: "Current password is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showOld ? "text" : "password"}
                              placeholder="Enter current password"
                              {...field}
                              value={field.value || ""}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              onClick={() => setShowOld((prev) => !prev)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showOld ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* New Password */}
                  <FormField
                    control={form.control}
                    name="newPassword"
                    rules={{
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showNew ? "text" : "password"}
                              placeholder="Enter new password"
                              {...field}
                              value={field.value || ""}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              onClick={() => setShowNew((prev) => !prev)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showNew ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>

                        {/* Strength meter */}
                        {field.value && (
                          <div className="mt-1.5 space-y-1">
                            <div className="flex gap-1">
                              {[0, 1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "h-1.5 flex-1 rounded-full bg-muted transition-colors",
                                    i < strength &&
                                      strengthConfig[strength].color,
                                  )}
                                />
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {strengthConfig[strength].label}
                            </p>
                          </div>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    rules={{
                      required: "Please confirm your new password",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirm ? "text" : "password"}
                              placeholder="Re-enter new password"
                              {...field}
                              value={field.value || ""}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              onClick={() => setShowConfirm((prev) => !prev)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showConfirm ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FieldGroup>

              <div className="mt-6 flex items-start gap-2 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Use at least 8 characters, including a number, an uppercase
                  letter, and a symbol for a stronger password.
                </p>
              </div>

              <Button
                type="submit"
                className="mt-5 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
