import { Button } from "@/components/ui/button";
import {
  DialogDescription,
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
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name is too short",
      })
      .max(50),
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password is too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSignupSuccess: () => void;
}

export function RegisterForm({
  onSwitchToLogin,
  onSignupSuccess,
}: RegisterFormProps) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await register(userInfo).unwrap();

      if (res.success) {
        toast.success("User created successfully");
        navigate("/verify", {
          state: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        });
        onSignupSuccess();
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
          <DialogTitle className="text-lg">Create an account</DialogTitle>
          <DialogDescription>
            Enter your details below to get started
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Password {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
    </Form>
  );
}
