import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary text-primary-foreground px-6 py-12 sm:px-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Ready to see Bangladesh?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-7">
            Browse every tour we run and find the one that fits your dates,
            budget, and group size.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/tours">Browse all tours</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}