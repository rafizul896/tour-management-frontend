import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";

export default function Unauthorized() {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-5">
            <ShieldX className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>

        <p className="mt-3 text-muted-foreground">
          Sorry, you don't have permission to access this page. Please sign in
          with an account that has the required permissions.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={() => navigate(-1)}>Go Back</Button>

          <Button variant="outline" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
