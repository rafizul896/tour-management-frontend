import {
  useUserStatsQuery,
  useBookingStatsQuery,
  usePaymentStatsQuery,
  useTourStatsQuery,
} from "@/redux/features/stats/stats.api";
import { StatCard, StatCardSkeleton } from "./StatCard";
import { Users, CalendarCheck, DollarSign, Map } from "lucide-react";
import { formatCurrency, formatNumber } from "@/utils/Chart.utils"

export function OverviewStrip() {
  const { data: userStats, isLoading: userLoading } = useUserStatsQuery(undefined);
  const { data: bookingStats, isLoading: bookingLoading } = useBookingStatsQuery(undefined);
  const { data: paymentStats, isLoading: paymentLoading } = usePaymentStatsQuery(undefined);
  const { data: tourStats, isLoading: tourLoading } = useTourStatsQuery(undefined);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {userLoading ? (
        <StatCardSkeleton />
      ) : (
        <StatCard
          title="Total Users"
          value={formatNumber(userStats?.totalUsers)}
          icon={Users}
        />
      )}
      {bookingLoading ? (
        <StatCardSkeleton />
      ) : (
        <StatCard
          title="Total Bookings"
          value={formatNumber(bookingStats?.totalBooking)}
          icon={CalendarCheck}
        />
      )}
      {paymentLoading ? (
        <StatCardSkeleton />
      ) : (
        <StatCard
          title="Total Revenue"
          value={formatCurrency(paymentStats?.totalRevenue)}
          icon={DollarSign}
        />
      )}
      {tourLoading ? (
        <StatCardSkeleton />
      ) : (
        <StatCard
          title="Total Tours"
          value={formatNumber(tourStats?.totalTour)}
          icon={Map}
        />
      )}
    </div>
  );
}