import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { salonConfig, formatCurrency } from "../config/salon";
import { useBookings } from "../hooks/useBookings";
import { demoServices, demoStaff } from "../data/demo";
import type { BookingStatus, PaymentStatus } from "../types";

const bookingStatuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "checked_in",
  "in_progress",
  "completed",
  "cancelled",
  "no_show",
];
const paymentStatuses: PaymentStatus[] = [
  "unpaid",
  "pending",
  "paid",
  "refunded",
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

export default function BookingManagement() {
  const { bookings, updateBooking } = useBookings();
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
              style={
                {
                  "--tw-ring-color": salonConfig.primaryColor + "40",
                } as React.CSSProperties
              }
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as BookingStatus | "all")
              }
              className="pl-10 pr-8 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 appearance-none cursor-pointer"
              style={
                {
                  "--tw-ring-color": salonConfig.primaryColor + "40",
                } as React.CSSProperties
              }
            >
              <option value="all">All Statuses</option>
              {bookingStatuses.map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
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
                  Date/Time
                </th>
                <th className="text-left p-4 font-medium text-gray-500">
                  Status
                </th>
                <th className="text-left p-4 font-medium text-gray-500">
                  Payment
                </th>
                <th className="text-left p-4 font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => {
                  const service = demoServices.find(
                    (s) => s.id === booking.serviceId,
                  );
                  const staffMember = demoStaff.find(
                    (s) => s.id === booking.staffId,
                  );
                  const isEditing = editingId === booking.id;

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
                          {booking.customerPhone}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-gray-700">{service?.name}</p>
                        <p className="text-xs text-gray-400">
                          {service && formatCurrency(service.price)}
                        </p>
                      </td>
                      <td className="p-4">
                        {isEditing ? (
                          <select
                            value={booking.staffId || ""}
                            onChange={(e) =>
                              updateBooking(booking.id, {
                                staffId: e.target.value || undefined,
                              })
                            }
                            className="text-xs border rounded-lg px-2 py-1.5"
                          >
                            <option value="">Any</option>
                            {demoStaff.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-600">
                            {staffMember?.name || "Any"}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-gray-600 whitespace-nowrap">
                        {booking.date}
                        <br />
                        <span className="text-xs text-gray-400">
                          {booking.timeSlot}
                        </span>
                      </td>
                      <td className="p-4">
                        {isEditing ? (
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              updateBooking(booking.id, {
                                status: e.target.value as BookingStatus,
                              })
                            }
                            className="text-xs border rounded-lg px-2 py-1.5"
                          >
                            {bookingStatuses.map((s) => (
                              <option key={s} value={s}>
                                {s.replace("_", " ")}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-medium text-white"
                            style={{
                              backgroundColor:
                                statusColors[booking.status] || "#6B7280",
                            }}
                          >
                            {booking.status.replace("_", " ")}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {isEditing ? (
                          <select
                            value={booking.paymentStatus}
                            onChange={(e) =>
                              updateBooking(booking.id, {
                                paymentStatus: e.target.value as PaymentStatus,
                              })
                            }
                            className="text-xs border rounded-lg px-2 py-1.5"
                          >
                            {paymentStatuses.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        ) : (
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
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            setEditingId(isEditing ? null : booking.id)
                          }
                          className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                          style={
                            isEditing
                              ? { backgroundColor: "#10B981", color: "white" }
                              : {
                                  backgroundColor: salonConfig.secondaryColor,
                                  color: salonConfig.primaryColor,
                                }
                          }
                        >
                          {isEditing ? "Save" : "Edit"}
                        </button>
                        {!isEditing &&
                          booking.paymentMethod === "pay_at_salon" &&
                          booking.paymentStatus !== "paid" && (
                            <button
                              onClick={() =>
                                updateBooking(booking.id, {
                                  paymentStatus: "paid",
                                })
                              }
                              className="ml-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-all"
                            >
                              Mark Paid
                            </button>
                          )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
