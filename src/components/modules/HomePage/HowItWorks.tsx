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
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            How it works
          </h2>
          <p className="text-muted-foreground">
            Three steps between you and your next trip.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="inline-flex items-center justify-center size-14 rounded-full bg-background border border-muted shadow-sm mb-4 relative">
                <step.icon className="size-6 text-primary" />
                <span className="absolute -top-2 -right-2 size-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-semibold mb-1.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}