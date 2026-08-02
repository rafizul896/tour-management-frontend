import { useUserStatsQuery } from "@/redux/features/stats/stats.api";
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Users, UserCheck, UserX, ShieldBan } from "lucide-react";
import { colorForIndex, formatNumber, titleCase } from "@/utils/Chart.utils"
import { AlertCircle } from "lucide-react";
import { StatCard, StatCardSkeleton } from "./StatCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function UserAnalytics() {
  const { data, isLoading, isError } = useUserStatsQuery(undefined);

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Couldn't load user stats</AlertTitle>
        <AlertDescription>Try refreshing the page.</AlertDescription>
      </Alert>
    );
  }

  const roleData = (data?.usersByRole ?? []).map(
    (r: { _id: string; count: number }) => ({
      name: titleCase(r._id ?? "Unknown"),
      count: r.count,
    })
  );

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Users</h2>
        <p className="text-sm text-muted-foreground">
          Signups, account status, and role distribution
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
              title="Total Users"
              value={formatNumber(data?.totalUsers)}
              icon={Users}
            />
            <StatCard
              title="Active"
              value={formatNumber(data?.totalActiveUsers)}
              icon={UserCheck}
              description={
                data?.totalUsers
                  ? `${Math.round(
                      (data.totalActiveUsers / data.totalUsers) * 100
                    )}% of total`
                  : undefined
              }
            />
            <StatCard
              title="Inactive"
              value={formatNumber(data?.totalInActiveUsers)}
              icon={UserX}
            />
            <StatCard
              title="Blocked"
              value={formatNumber(data?.totalBlockedUsers)}
              icon={ShieldBan}
            />
          </>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">New signups</CardTitle>
            <CardDescription>Rolling windows</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">
                Last 7 days
              </span>
              <span className="text-xl font-semibold">
                {isLoading ? "—" : formatNumber(data?.newUsersInLast7Days)}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">
                Last 30 days
              </span>
              <span className="text-xl font-semibold">
                {isLoading ? "—" : formatNumber(data?.newUsersInLast30Days)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Users by role</CardTitle>
            <CardDescription>Distribution across account roles</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[220px] bg-muted animate-pulse rounded" />
            ) : roleData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">
                No role data yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={roleData} layout="vertical" margin={{ left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={90}
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    cursor={{ fill: "hsl(var(--muted))" }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {roleData.map((_: unknown, i: number) => (
                      <Cell key={i} fill={colorForIndex(i)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}