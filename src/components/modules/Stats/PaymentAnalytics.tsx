import { usePaymentStatsQuery } from "@/redux/features/stats/stats.api";
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
import { DollarSign, Receipt, TrendingUp, Wallet } from "lucide-react";
import {
  colorForIndex,
  formatCurrency,
  formatNumber,
  titleCase,
  toChartData,
} from "@/utils/Chart.utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function PaymentAnalytics() {
  const { data, isLoading, isError } = usePaymentStatsQuery(undefined);

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Couldn't load payment stats</AlertTitle>
        <AlertDescription>Try refreshing the page.</AlertDescription>
      </Alert>
    );
  }

  const statusData = toChartData(data?.totalPaymentByStatus).map((d) => ({
    ...d,
    name: titleCase(d.name),
  }));

  const gatewayData = toChartData(data?.paymentGatewayData).map((d) => ({
    ...d,
    name: titleCase(d.name),
  }));

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Payments</h2>
        <p className="text-sm text-muted-foreground">
          Revenue, payment status, and gateway outcomes
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
              title="Total Revenue"
              value={formatCurrency(data?.totalRevenue)}
              icon={DollarSign}
              description="Paid payments only"
            />
            <StatCard
              title="Total Payments"
              value={formatNumber(data?.totalPayment)}
              icon={Receipt}
            />
            <StatCard
              title="Avg Payment"
              value={formatCurrency(data?.avgPaymentAmount)}
              icon={Wallet}
            />
            <StatCard
              title="Paid Rate"
              value={
                data?.totalPaymentByStatus
                  ? (() => {
                      const paid =
                        data.totalPaymentByStatus.find(
                          (s: { _id: string }) => s._id === "PAID",
                        )?.count ?? 0;
                      return data.totalPayment
                        ? `${Math.round((paid / data.totalPayment) * 100)}%`
                        : "0%";
                    })()
                  : "0%"
              }
              icon={TrendingUp}
            />
          </>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Payments by status
            </CardTitle>
            <CardDescription>Paid, pending, failed, refunded</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[240px] bg-muted animate-pulse rounded" />
            ) : statusData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">
                No payments yet.
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

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Gateway outcomes
            </CardTitle>
            <CardDescription>
              Raw status reported by the payment gateway
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[240px] bg-muted animate-pulse rounded" />
            ) : gatewayData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">
                No gateway data yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={gatewayData} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis allowDecimals={false} fontSize={12} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    cursor={{ fill: "hsl(var(--muted))" }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {gatewayData.map((_, i) => (
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
