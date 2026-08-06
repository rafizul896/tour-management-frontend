import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Compass,
  ShieldCheck,
  ListChecks,
  Users,
  MapPinned,
  BadgeCheck,
  Landmark,
  HeartHandshake,
  
  ScrollText,
  ClipboardCheck,
  UserCheck,
  Sparkles,
} from "lucide-react";

const stats = [
  { label: "Divisions covered", value: "8/8", icon: MapPinned },
  { label: "Verified guides", value: "240+", icon: BadgeCheck },
  { label: "Tours completed", value: "1,850", icon: Compass },
  { label: "Travelers hosted", value: "22K+", icon: Users },
];

const missionPillars = [
  {
    icon: Compass,
    title: "Access",
    description: "Every division on one platform, so no region is a phone call away from being invisible.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    description: "No guide goes live without an NID check. No tour hides what's included until after you've paid.",
  },
  {
    icon: HeartHandshake,
    title: "Fairness for guides",
    description: "Local guides list their own tours and set their own pace — this isn't a call center reselling their work.",
  },
];

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Guides verified by NID",
    description:
      "Every guide on the platform is approved after an NID check before their profile ever goes live. No anonymous listings.",
  },
  {
    icon: ListChecks,
    title: "Included and excluded, upfront",
    description:
      "Each tour lists exactly what's covered and what isn't, before you book — not buried in a PDF after payment.",
  },
  {
    icon: Users,
    title: "Group size stays honest",
    description:
      "Every tour has a max guest count and, where relevant, a minimum age — so you know who you're travelling with.",
  },
  {
    icon: Landmark,
    title: "Organized division by division",
    description:
      "Tours are mapped to Bangladesh's divisions, so a Sundarbans boat trip is never mixed up with a Sylhet tea-garden hike.",
  },
];

const verificationSteps = [
  {
    icon: ScrollText,
    step: "01",
    title: "NID submitted",
    description: "A guide applies with their division and a photo of their National ID — no application goes live yet.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Reviewed by our team",
    description: "We check the ID against the application by hand. Usually done in 1–2 business days.",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Approved & listed",
    description: "Only once approved can a guide publish tours. You're never booking a stranger's guesswork.",
  },
];

const howItWorks = [
  {
    value: "browse",
    title: "1. Browse & compare tours",
    description:
      "Filter by division, dates, or price. Every tour lists what's included, what's excluded, its max guest count, and any minimum age — before you commit to anything.",
  },
  {
    value: "book",
    title: "2. Book with your guest count",
    description:
      "Choose how many people are coming. If a tour caps guests or sets a minimum age, you'll see it on the booking form, not after you've already reserved a spot.",
  },
  {
    value: "pay",
    title: "3. Pay securely",
    description:
      "Payment is handled through our gateway and tied to your booking. You get a transaction ID and a downloadable invoice, and your payment status updates as it clears.",
  },
  {
    value: "confirm",
    title: "4. Get confirmed & meet your guide",
    description:
      "Once payment goes through, your booking status moves from pending to confirmed and you're matched with one of the tour's verified guides.",
  },
];

const About = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
        </div>

        <div className="container relative mx-auto flex flex-col items-start gap-6 px-6 py-28 sm:py-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Compass className="h-3.5 w-3.5 text-primary" />
            Built for travel across all 8 divisions of Bangladesh
          </span>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            From the hills of Bandarban
            <br />
            to the tides of Sundarbans.
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            We connect travelers with verified local guides across Bangladesh —
            so booking a trip to Cox's Bazar, the Sylhet tea gardens, or the
            Sundarbans takes minutes, not a chain of phone calls to someone's
            cousin.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg" asChild>
              <Link to="/tours">Browse tours</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard/apply-guide">Become a guide</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid container grid-cols-2 gap-px overflow-hidden border-x border-border bg-border sm:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 bg-card px-4 py-10 text-center"
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold text-foreground">
                {value}
              </span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Our story / mission */}
      <section className="mx-auto container px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="text-sm font-medium text-primary">Why we exist</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Booking a local guide shouldn't mean chasing phone numbers
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                Across Bangladesh, some of the best travel experiences never
                make it online. They live in a guide's phone contacts, passed
                from one traveler to the next — no listing, no reviews, no way
                to know what you're agreeing to until you're already there.
              </p>
              <p>
                We built this platform to put that same local knowledge in
                the open: guides list their own tours, travelers see the real
                price and what's included before they pay, and every guide is
                checked against their NID before they can publish anything.
              </p>
            </div>
          </div>

          <Card className="border-border bg-muted/40">
            <CardContent className="flex flex-col gap-6 pt-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  What we're building toward
                </span>
              </div>
              <div className="flex flex-col gap-5">
                {missionPillars.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto container px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="text-sm font-medium text-primary">
              Booking a tour
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-muted-foreground">
              From browsing to meeting your guide — four steps, no back-and-forth
              over the phone to confirm what you already thought you booked.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {howItWorks.map(({ value, title, description }) => (
              <AccordionItem key={value} value={value} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                  {title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto container px-6 py-24">
          <div className="mb-14 max-w-xl">
            <span className="text-sm font-medium text-primary">
              Trust & safety
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built to remove the guesswork
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {trustPoints.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-border bg-card">
                <CardContent className="flex gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Verification timeline */}
          <div className="mt-16">
            <h3 className="text-lg font-semibold text-foreground">
              How guide verification works
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {verificationSteps.map(({ icon: Icon, step, title, description }, i) => (
                <div key={step} className="relative">
                  {i < verificationSteps.length - 1 && (
                    <div className="absolute left-5 top-11 hidden h-px w-full bg-border sm:block" />
                  )}
                  <div className="relative flex flex-col gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Step {step}
                      </span>
                      <h4 className="mt-1 font-semibold text-foreground">
                        {title}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guide recruitment */}
      <section className="mx-auto container px-6 py-24">
        <div className="flex flex-col items-start gap-6 rounded-xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <span className="text-sm font-medium text-primary">
              For local guides
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Know your division better than any app does?
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Submit your NID for verification and start listing tours in
              your division — see the steps above for how review works.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link to="/dashboard/apply-guide">Apply as a guide</Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary">
        <div className="mx-auto flex container flex-col items-start gap-6 px-6 py-20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
              Your next trip is already mapped.
            </h2>
            <p className="mt-2 max-w-md text-primary-foreground/80">
              Filter tours by division, cost, or the dates you've actually
              got free.
            </p>
          </div>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/tours">Browse tours</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;