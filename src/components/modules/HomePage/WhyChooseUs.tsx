import { ShieldCheck, Wallet, Headset, MapPinned } from "lucide-react";

const features = [
  {
    icon: MapPinned,
    title: "Local, verified guides",
    description:
      "Every tour is led by guides who know the region — not a call center reading a script.",
  },
  {
    icon: Wallet,
    title: "Transparent pricing",
    description:
      "The price you see is the price you pay. No surprise fees added at checkout.",
  },
  {
    icon: ShieldCheck,
    title: "Secure booking",
    description:
      "Payments are processed securely, and your booking is confirmed instantly.",
  },
  {
    icon: Headset,
    title: "Support when you need it",
    description:
      "Questions before, during, or after your trip — a real person answers them.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-neutral-950 dark:bg-zinc-900 dark:border-y dark:border-border text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Why us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
              Booking a tour should feel as good as taking one
            </h2>
          </div>
          <p className="text-white/60 max-w-sm">
            We built this around the things that actually go wrong with
            travel booking — hidden fees, unreachable support, guides who
            don't know the area.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 dark:bg-white/5 rounded-2xl overflow-hidden">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-neutral-950 dark:bg-zinc-900 p-6 sm:p-7 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-center size-11 rounded-lg bg-primary/15 mb-5">
                <feature.icon className="size-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}