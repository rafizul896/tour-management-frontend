import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Loader2, MailCheck, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const RESEND_COOLDOWN = 30;

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as {
    name: string;
    email: string;
    password: string;
  };
  const name = state?.name;
  const email = state?.email;
  const password = state?.password;

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP");

    try {
      const res = await sendOtp({ name, email }).unwrap();

      if (res.success) {
        toast.success("OTP sent", { id: toastId });
        setOtpSent(true);
        setTimer(RESEND_COOLDOWN);
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
        {
          id: toastId,
        },
      );
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP");

    try {
      const res = await verifyOtp({ email, otp: data.pin }).unwrap();

      if (res.success) {
        toast.loading("Signing you in...", { id: toastId });
        await login({ email, password }).unwrap();
        toast.success("Welcome!", { id: toastId });
        navigate("/");
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
        {
          id: toastId,
        },
      );
    }
  };

  useEffect(() => {
    if (!email || !otpSent || timer === 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, otpSent, timer]);

  if (!email) {
    return (
      <div className="flex min-h-screen justify-center items-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Nothing to verify</CardTitle>
            <CardDescription>
              We couldn't find an email to verify. Please start from the
              registration page again.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center items-center px-4 py-10">
      {otpSent ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              Enter the 6-digit code we sent to
              <br />
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-time password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="flex items-center gap-1">
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer !== 0 || isSendingOtp}
                          className={cn("h-auto p-0", {
                            "text-muted-foreground": timer !== 0,
                          })}
                        >
                          {isSendingOtp ? "Sending..." : "Resend OTP"}
                        </Button>
                        {timer > 0 && (
                          <span className="text-muted-foreground">
                            in {timer}s
                          </span>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              form="otp-form"
              type="submit"
              disabled={isVerifying || isLoggingIn}
            >
              {(isVerifying || isLoggingIn) && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {isVerifying
                ? "Verifying..."
                : isLoggingIn
                  ? "Signing in..."
                  : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MailCheck className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We'll send a one-time code to
              <br />
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              onClick={handleSendOtp}
              disabled={isSendingOtp}
              className="w-full"
            >
              {isSendingOtp && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSendingOtp ? "Sending..." : "Send code"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
