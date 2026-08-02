import { useBookingStatsQuery } from "@/redux/features/stats/stats.api";
import { StatCard, StatCardSkeleton } from "./StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarCheck, Users2, TrendingUp, Clock } from "lucide-react";
import { colorForIndex, formatNumber, titleCase, toChartData } from "@/utils/Chart.utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function BookingAnalytics() {
  const { data, isLoading, isError } = useBookingStatsQuery(undefined);

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Couldn't load booking stats</AlertTitle>
        <AlertDescription>Try refreshing the page.</AlertDescription>
      </Alert>
    );
  }

  const statusData = toChartData(data?.totalBookingByStatus).map((d) => ({
    ...d,
    name: titleCase(d.name),
  }));

  const topTours = (data?.bookingsPerTour ?? []).map(
    (b: { tour: { title: string }; bookingCount: number }) => ({
      name: b.tour?.title ?? "Untitled tour",
      count: b.bookingCount,
    })
  );

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Bookings</h2>
        <p className="text-sm text-muted-foreground">
          Volume, status breakdown, and most-booked tours
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Bookings"
              value={formatNumber(data?.totalBooking)}
              icon={CalendarCheck}
            />
            <StatCard
              title="Avg Guests / Booking"
              value={
                data?.avgGuestCountPerBooking
                  ? data.avgGuestCountPerBooking.toFixed(1)
                  : "0"
              }
              icon={Users2}
            />
            <StatCard
              title="Last 7 Days"
              value={formatNumber(data?.bookingsLast7Days)}
              icon={Clock}
            />
            <StatCard
              title="Last 30 Days"
              value={formatNumber(data?.bookingsLast30Days)}
              icon={TrendingUp}
            />
          </>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Bookings by status
            </CardTitle>
            <CardDescription>Current pipeline breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[240px] bg-muted animate-pulse rounded" />
            ) : statusData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">
                No bookings yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                  >
                    {statusData.map((_, i) => (
                      <Cell key={i} fill={colorForIndex(i)} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Most-booked tours
            </CardTitle>
            <CardDescription>Top 10 by booking count</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[280px] bg-muted animate-pulse rounded" />
            ) : topTours.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">
                No bookings yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={topTours}
                  layout="vertical"
                  margin={{ left: 8, right: 16 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={140}
                    fontSize={11}
                    tickFormatter={(v: string) =>
                      v.length > 20 ? `${v.slice(0, 20)}…` : v
                    }
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    cursor={{ fill: "hsl(var(--muted))" }}
                  />
                  <Bar dataKey="count" fill={colorForIndex(0)} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}