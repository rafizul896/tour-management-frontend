import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Clock,
  Compass,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { error: "Name is too short" }).max(80),
  email: z.email(),
  phone: z.string().optional(),
  reason: z.string().min(1, { error: "Select a reason" }),
  message: z.string().min(10, { error: "Give us a bit more detail" }).max(1000),
});

const reasons = [
  { value: "booking", label: "Booking a tour" },
  { value: "guide", label: "Becoming a guide" },
  { value: "existing-trip", label: "An existing booking" },
  { value: "partnership", label: "Partnership / press" },
  { value: "other", label: "Something else" },
];

const contactDetails = [
  {
    icon: Phone,
    label: "Call us",
    value: "+880 1XXX-XXXXXX",
    hint: "Sat–Thu, 9:00 AM – 8:00 PM",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "support@tourbd.com",
    hint: "We reply within 1 business day",
  },
  {
    icon: MapPin,
    label: "Head office",
    value: "House 12, Road 5, Dhanmondi, Dhaka 1209",
    hint: "By appointment only",
  },
  {
    icon: Clock,
    label: "Office hours",
    value: "9:00 AM – 6:00 PM",
    hint: "Closed Friday",
  },
];

const quickLinks = [
  {
    icon: Compass,
    title: "Looking to book a trip?",
    description: "Browse tours by division, dates, and group size.",
    cta: "Browse tours",
    href: "/tours",
  },
  {
    icon: ShieldCheck,
    title: "Want to guide with us?",
    description: "Apply with your NID and start listing tours.",
    cta: "Apply as a guide",
    href: "/dashboard/apply-guide",
  },
  {
    icon: Users,
    title: "Booking for a group?",
    description: "Tell us your headcount and dates for a custom quote.",
    cta: "Talk to sales",
    href: "#contact-form",
  },
];

const Contact = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      reason: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    try {
      // TODO: wire up to useSendContactMessageMutation once the endpoint exists
      console.log("contact form", data);
      toast.success("Message sent — we'll get back to you soon");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border bg-muted/40">
        <div className="container mx-auto px-6 py-20 text-center">
          <span className="text-sm font-medium text-primary">Get in touch</span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Questions before your next trip?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Whether it's a booking, a guide application, or a group trip across
            divisions — reach us here and a real person will answer.
          </p>
        </div>
      </section>

      {/* Quick links */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {quickLinks.map(({ icon: Icon, title, description, cta, href }) => (
            <Card key={title} className="border-border bg-card">
              <CardContent className="flex flex-col gap-3 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
                <a
                  href={href}
                  className="mt-auto text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {cta} →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact details + form */}
      <section id="contact-form" className="border-y border-border bg-muted/40">
        <div className="mx-auto grid container  gap-10 px-6 py-20 lg:grid-cols-5">
          {/* Details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Reach us directly
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer to skip the form? Use any of the channels below.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {contactDetails.map(({ icon: Icon, label, value, hint }) => (
                <div key={label} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {label}
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground">{hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="border-border bg-card lg:col-span-3">
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input placeholder="Rafizul Islam" {...field} />
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
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+880 1XXX-XXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for contact</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                            >
                              <option value="" disabled>
                                Select a reason
                              </option>
                              {reasons.map((r) => (
                                <option key={r.value} value={r.value}>
                                  {r.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what you need help with..."
                            className="min-h-32 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? "Sending..."
                      : "Send message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
