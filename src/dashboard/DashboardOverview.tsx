import {
  CalendarDays,
  DollarSign,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { formatCurrency } from "../config/salon";
import { useBookings } from "../hooks/useBookings";
import { demoServices, demoStaff } from "../data/demo";

export default function DashboardOverview() {
  const { bookings } = useBookings();

  const today = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter((b) => b.date === today);
  const upcomingBookings = bookings.filter(
    (b) =>
      b.date >= today && b.status !== "cancelled" && b.status !== "completed",
  );
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => {
      const service = demoServices.find((s) => s.id === b.serviceId);
      return sum + (service?.price || 0);
    }, 0);
  const pendingPayments = bookings.filter(
    (b) => b.paymentStatus === "unpaid" || b.paymentStatus === "pending",
  );

  const stats = [
    {
      label: "Today's Bookings",
      value: todayBookings.length,
      icon: CalendarDays,
      color: "#3B82F6",
      bg: "#EFF6FF",
    },
    {
      label: "Upcoming",
      value: upcomingBookings.length,
      icon: Clock,
      color: "#8B5CF6",
      bg: "#F5F3FF",
    },
    {
      label: "Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "#10B981",
      bg: "#ECFDF5",
    },
    {
      label: "Pending Payments",
      value: pendingPayments.length,
      icon: AlertCircle,
      color: "#F59E0B",
      bg: "#FFFBEB",
    },
  ];

  const statusColors: Record<string, string> = {
    pending: "#F59E0B",
    confirmed: "#3B82F6",
    checked_in: "#8B5CF6",
    in_progress: "#6366F1",
    completed: "#10B981",
    cancelled: "#EF4444",
    no_show: "#6B7280",
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 font-medium text-gray-500">
                  Customer
                </th>
                <th className="text-left p-4 font-medium text-gray-500">
                  Service
                </th>
                <th className="text-left p-4 font-medium text-gray-500">
                  Staff
                </th>
                <th className="text-left p-4 font-medium text-gray-500">
                  Date & Time
                </th>
                <th className="text-left p-4 font-medium text-gray-500">
                  Status
                </th>
                <th className="text-left p-4 font-medium text-gray-500">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 10).map((booking) => {
                const service = demoServices.find(
                  (s) => s.id === booking.serviceId,
                );
                const staff = demoStaff.find((s) => s.id === booking.staffId);
                return (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-medium text-gray-900">
                        {booking.customerName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {booking.customerEmail}
                      </p>
                    </td>
                    <td className="p-4 text-gray-600">
                      {service?.name || "—"}
                    </td>
                    <td className="p-4 text-gray-600">
                      {staff?.name || "Any"}
                    </td>
                    <td className="p-4 text-gray-600">
                      {booking.date} · {booking.timeSlot}
                    </td>
                    <td className="p-4">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white"
                        style={{
                          backgroundColor:
                            statusColors[booking.status] || "#6B7280",
                        }}
                      >
                        {booking.status === "completed" && (
                          <CheckCircle2 className="w-3 h-3" />
                        )}
                        {booking.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          booking.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : booking.paymentStatus === "unpaid"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
