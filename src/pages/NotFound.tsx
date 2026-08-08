import { Button } from "@/components/ui/button";
import { Compass, MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Compass className="h-12 w-12 text-primary" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Error 404
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
          Page Not Found
        </h1>

        <p className="mt-6 text-lg text-muted-foreground">
          Looks like this destination isn't on our map. The page you're looking
          for may have been moved, deleted, or the URL might be incorrect.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/">Back to Home</Link>
          </Button>

          <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
            <MoveLeft className="inline h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
