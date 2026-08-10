import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  HelpCircle,
  Wallet,
  ShieldCheck,
  UserCog,
  MapPinned,
  Compass,
  MessageCircleQuestion,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  title: string;
  icon: typeof HelpCircle;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting started",
    icon: Compass,
    items: [
      {
        question: "How do I book a tour?",
        answer:
          "Browse tours by division, dates, or price on the Tours page, open the one you want, and choose your guest count. You'll see exactly what's included and excluded before you pay — nothing is added after checkout.",
      },
      {
        question: "Do I need an account to browse tours?",
        answer:
          "No — you can browse and compare tours without signing up. You'll need an account to book, so we can confirm your booking and send you the invoice.",
      },
      {
        question: "Which parts of Bangladesh do you cover?",
        answer:
          "All 8 divisions — Dhaka, Chattogram, Sylhet, Khulna, Barishal, Rajshahi, Rangpur, and Mymensingh. Every tour is filed under a division and matched with guides based there.",
      },
    ],
  },
  {
    id: "bookings-payments",
    title: "Bookings & payments",
    icon: Wallet,
    items: [
      {
        question: "How do I pay for a tour?",
        answer:
          "Payment is handled securely through our payment gateway, with support for mobile banking (like bKash and Nagad) and cards. You'll get a transaction ID and a downloadable invoice once payment clears.",
      },
      {
        question: "Is there a limit on how many people I can bring?",
        answer:
          "Some tours set a maximum guest count, and a few set a minimum age depending on the activity. Both are shown on the tour page and enforced when you book, so you'll never overbook a spot.",
      },
      {
        question: "My payment didn't go through — was I charged?",
        answer:
          "If a payment fails, no amount is deducted and your booking stays on hold rather than being confirmed. You can retry payment from your bookings page, or contact support with your transaction ID if you're unsure.",
      },
      {
        question: "Where can I find my invoice?",
        answer:
          "Once a payment is confirmed, a downloadable invoice is attached to that booking under My Bookings in your dashboard.",
      },
    ],
  },
  {
    id: "cancellations",
    title: "Cancellations & refunds",
    icon: ShieldCheck,
    items: [
      {
        question: "Can I cancel a booking?",
        answer:
          "Cancellation terms can vary by tour and guide. Reach out to the guide or our support team as early as possible — the sooner you contact us, the more options you'll have.",
      },
      {
        question: "What happens if the guide cancels on me?",
        answer:
          "If a guide cancels a confirmed booking, you're entitled to a full refund for that booking, processed back through your original payment method.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Refunds are processed back through the original payment method. Timing depends on your bank or mobile banking provider once we've issued it on our end.",
      },
    ],
  },
  {
    id: "guides",
    title: "Guides & verification",
    icon: UserCog,
    items: [
      {
        question: "How do I know a guide is legitimate?",
        answer:
          "Every guide applies with their National ID (NID), and our team manually reviews it before their profile goes live — usually within 1–2 business days. No guide can list a tour until they're approved.",
      },
      {
        question: "How do I become a guide?",
        answer:
          "Apply from your dashboard with your division and a photo of your NID. Once approved, you can list your own tours — you set the price, the itinerary, and what's included.",
      },
      {
        question: "Can I message my guide before the trip?",
        answer:
          "Once your booking is confirmed, you'll have the guide's contact details so you can coordinate directly before the tour date.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & security",
    icon: MapPinned,
    items: [
      {
        question: "Why do I need to verify my email?",
        answer:
          "We send a one-time password (OTP) to your email when you register to confirm it's really yours — this keeps bookings and payment records tied to an account only you can access.",
      },
      {
        question: "I forgot my password — what do I do?",
        answer:
          "Use \"Forgot password\" on the login screen. We'll send a reset link to your email that's valid for a limited time.",
      },
      {
        question: "Is my National ID photo visible to other users?",
        answer:
          "No. NID photos submitted for guide verification are only used by our review team to confirm your application — they're never shown publicly on your profile.",
      },
    ],
  },
];

const FAQ = () => {
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqCategories;

    return faqCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  const hasResults = filteredCategories.length > 0;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border bg-muted/40">
        <div className="container mx-auto px-6 py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <MessageCircleQuestion className="h-3.5 w-3.5 text-primary" />
            Frequently asked questions
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Got questions? Start here.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Answers on booking, payments, guide verification, and your
            account. Can't find it? Our team is a message away.
          </p>

          <div className="relative mx-auto mt-8 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="bg-card pl-9"
            />
          </div>
        </div>
      </section>

      {/* FAQ content */}
      <section className="container mx-auto px-6 py-16">
        {hasResults ? (
          <div className="mx-auto max-w-2xl space-y-12">
            {filteredCategories.map(({ id, title, icon: Icon, items }) => (
              <div key={id}>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {title}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {items.map((item, index) => (
                    <AccordionItem
                      key={item.question}
                      value={`${id}-${index}`}
                      className="border-border"
                    >
                      <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">
              No results for "{query}"
            </h3>
            <p className="text-sm text-muted-foreground">
              Try a different search term, or reach out to us directly below.
            </p>
            <Button variant="outline" onClick={() => setQuery("")}>
              Clear search
            </Button>
          </div>
        )}
      </section>

      {/* Still need help CTA */}
      <section className="border-t border-border bg-muted/40">
        <div className="container mx-auto flex flex-col items-center gap-4 px-6 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Still need help?
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Our team replies within 1 business day — whether it's a booking
            question or something about your guide application.
          </p>
          <Button asChild>
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FAQ;