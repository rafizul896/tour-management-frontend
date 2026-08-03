import config from "@/config";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
  onLoginSuccess: () => void;
}

export function LoginForm({
  onSwitchToSignup,
  onSwitchToForgotPassword,
  onLoginSuccess,
}: LoginFormProps) {
  const [showOld, setShowOld] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    //! For development only
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
        onLoginSuccess();
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="text-lg">Login to your account</DialogTitle>
        </DialogHeader>

        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 mt-5">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <Button
                      type="button"
                      variant="link"
                      className="ml-auto h-auto p-0 text-[13px]"
                      onClick={onSwitchToForgotPassword}
                    >
                      Forgot your password?
                    </Button>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showOld ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        value={field.value || ""}
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
    </Form>
  );
}
