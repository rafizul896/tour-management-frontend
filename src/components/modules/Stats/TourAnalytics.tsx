import { useTourStatsQuery } from "@/redux/features/stats/stats.api";
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
import { Map, DollarSign, Compass, Trophy } from "lucide-react";
import { colorForIndex, formatCurrency, formatNumber, toChartData } from "@/utils/Chart.utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TourAnalytics() {
  const { data, isLoading, isError } = useTourStatsQuery(undefined);

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Couldn't load tour stats</AlertTitle>
        <AlertDescription>Try refreshing the page.</AlertDescription>
      </Alert>
    );
  }

  // avgTourConst is returned as a raw aggregate array from the API
  // (unlike the other stats, it isn't pre-destructured server-side).
  const avgCost = data?.avgTourConst?.[0]?.avgCostFrom;

  const typeData = toChartData(data?.totalTourByTourType);
  const divisionData = toChartData(data?.totalTourByDivision);

  const topBooked = data?.totalHighestBookedTour ?? [];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Tours</h2>
        <p className="text-sm text-muted-foreground">
          Catalog composition, pricing, and top performers
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
              title="Total Tours"
              value={formatNumber(data?.totalTour)}
              icon={Map}
            />
            <StatCard
              title="Avg Starting Cost"
              value={formatCurrency(avgCost)}
              icon={DollarSign}
            />
            <StatCard
              title="Tour Types"
              value={formatNumber(typeData.length)}
              icon={Compass}
            />
            <StatCard
              title="Divisions Covered"
              value={formatNumber(divisionData.length)}
              icon={Map}
            />
          </>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Tours by type
            </CardTitle>
            <CardDescription>Catalog composition</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[240px] bg-muted animate-pulse rounded" />
            ) : typeData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">
                No tours yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={typeData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                  >
                    {typeData.map((_, i) => (
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

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Tours by division
            </CardTitle>
            <CardDescription>Geographic spread</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[240px] bg-muted animate-pulse rounded" />
            ) : divisionData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">
                No division data yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={divisionData} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    fontSize={11}
                    angle={-20}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis allowDecimals={false} fontSize={12} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    cursor={{ fill: "hsl(var(--muted))" }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {divisionData.map((_, i) => (
                      <Cell key={i} fill={colorForIndex(i)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            Top 5 booked tours
          </CardTitle>
          <CardDescription>Ranked by number of bookings</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : topBooked.length === 0 ? (
            <p className="text-sm text-muted-foreground py-10 text-center">
              No bookings yet.
            </p>
          ) : (
            <ul className="divide-y">
              {topBooked.map(
                (
                  t: {
                    _id: string;
                    bookingCount: number;
                    tour: { title: string; slug: string };
                  },
                  i: number
                ) => (
                  <li
                    key={t._id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">
                        {t.tour?.title}
                      </span>
                    </div>
                    <Badge variant="secondary">
                      {formatNumber(t.bookingCount)} bookings
                    </Badge>
                  </li>
                )
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}