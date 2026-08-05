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
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Why travel with us
          </h2>
          <p className="text-muted-foreground">
            Booking a tour should feel as good as taking one.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="text-center sm:text-left">
              <div className="inline-flex items-center justify-center size-11 rounded-lg bg-primary/10 text-primary mb-4">
                <feature.icon className="size-5" />
              </div>
              <h3 className="font-semibold mb-1.5">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}