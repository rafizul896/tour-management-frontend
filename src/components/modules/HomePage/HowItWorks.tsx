import { Search, CalendarCheck, Luggage } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a tour",
    description: "Filter by division or tour type to find a trip that fits.",
  },
  {
    icon: CalendarCheck,
    title: "Book your spot",
    description: "Pick your guest count and confirm your booking in minutes.",
  },
  {
    icon: Luggage,
    title: "Pack your bags",
    description: "We handle the logistics — you just show up ready to go.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Process
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
            How it works
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line, desktop only */}
          <div className="hidden sm:block absolute top-7 left-[16.66%] right-[16.66%] h-px bg-border" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="relative inline-flex items-center justify-center size-14 rounded-full bg-background border-2 border-primary mb-5">
                  <step.icon className="size-6 text-primary" />
                </div>
                <span className="block text-xs font-semibold text-primary mb-1.5">
                  Step {index + 1}
                </span>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}