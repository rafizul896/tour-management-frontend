import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  ShieldCheck,
  ListChecks,
  Users,
  MapPinned,
  BadgeCheck,
  Landmark,
} from "lucide-react";

const stats = [
  { label: "Divisions covered", value: "8/8", icon: MapPinned },
  { label: "Verified guides", value: "240+", icon: BadgeCheck },
  { label: "Tours completed", value: "1,850", icon: Compass },
  { label: "Travelers hosted", value: "22K+", icon: Users },
];

const divisions = [
  { name: "Sylhet", highlight: "Tea gardens & waterfalls" },
  { name: "Chattogram", highlight: "Cox's Bazar & hill tracts" },
  { name: "Khulna", highlight: "Sundarbans mangrove forest" },
  { name: "Barishal", highlight: "River life & floating markets" },
  { name: "Rajshahi", highlight: "Mango orchards & Puthia temples" },
  { name: "Rangpur", highlight: "Tea gardens & the Teesta" },
  { name: "Mymensingh", highlight: "Madhutila eco park" },
  { name: "Dhaka", highlight: "Old Dhaka heritage walks" },
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

        <div className="relative mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-28 sm:py-36">
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
              <Link to="/become-a-guide">Become a guide</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden border-x border-border bg-border sm:grid-cols-4">
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

      {/* Divisions — signature element, grounded in the Division model */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-14 max-w-xl">
          <span className="text-sm font-medium text-primary">
            Where we operate
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Every division, one platform
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every tour is filed under a division and matched with guides based
            there — so local knowledge is built into the structure, not just the
            marketing copy.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {divisions.map((division) => (
            <Card
              key={division.name}
              className="border-border bg-card transition-colors hover:border-primary/50"
            >
              <CardContent className="flex flex-col gap-2 pt-6">
                <Badge
                  variant="secondary"
                  className="w-fit text-[11px] font-medium"
                >
                  Division
                </Badge>
                <h3 className="text-base font-semibold text-foreground">
                  {division.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {division.highlight}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust / how it works */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mb-14 max-w-xl">
            <span className="text-sm font-medium text-primary">
              Why it's different
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
        </div>
      </section>

      {/* Guide recruitment */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="flex flex-col items-start gap-6 rounded-xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <span className="text-sm font-medium text-primary">
              For local guides
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Know your division better than any app does?
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Submit your NID for verification, get approved, and start listing
              tours in your division. Review usually takes 1–2 business days.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link to="/become-a-guide">Apply as a guide</Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
              Your next trip is already mapped.
            </h2>
            <p className="mt-2 max-w-md text-primary-foreground/80">
              Filter tours by division, cost, or the dates you've actually got
              free.
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
