import { BookingAnalytics } from "@/components/modules/Stats/BookingAnalytics";
import { OverviewStrip } from "@/components/modules/Stats/OverviewStrip";
import { PaymentAnalytics } from "@/components/modules/Stats/PaymentAnalytics";
import { TourAnalytics } from "@/components/modules/Stats/TourAnalytics";
import { UserAnalytics } from "@/components/modules/Stats/UserAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const TABS = [
  { value: "users", label: "Users", Component: UserAnalytics },
  { value: "bookings", label: "Bookings", Component: BookingAnalytics },
  { value: "payments", label: "Payments", Component: PaymentAnalytics },
  { value: "tours", label: "Tours", Component: TourAnalytics },
] as const;

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<string>("users");
  const [visited, setVisited] = useState<Set<string>>(new Set(["users"]));

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          A snapshot of users, bookings, payments, and tours across the
          platform.
        </p>
      </div>

      <OverviewStrip />

      <Tabs
        value={activeTab}
        onValueChange={(v) => {
          setActiveTab(v);
          setVisited((prev) => new Set(prev).add(v));
        }}
      >
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map(({ value, Component }) => (
          <TabsContent key={value} value={value} className="pt-4">
            {visited.has(value) && <Component />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
