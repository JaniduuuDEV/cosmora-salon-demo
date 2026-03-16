import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Wallet,
  Calendar,
  User,
  CheckCircle2,
} from "lucide-react";
import { salonConfig, formatCurrency } from "../config/salon";
import { demoServices, demoStaff } from "../data/demo";
import { useBookings } from "../hooks/useBookings";
import { format, addDays, startOfToday } from "date-fns";
import type { PaymentMethod } from "../types";

const steps = [
  "Service",
  "Stylist",
  "Date & Time",
  "Details",
  "Payment",
  "Confirmation",
];

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "";
  const { addBooking, isTimeSlotBooked } = useBookings();

  const [currentStep, setCurrentStep] = useState(preselectedService ? 1 : 0);
  const [selectedService, setSelectedService] = useState(preselectedService);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("pay_at_salon");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const service = demoServices.find((s) => s.id === selectedService);
  const staff = demoStaff.find((s) => s.id === selectedStaff);

  const availableStaff = useMemo(() => {
    if (!service) return [];
    return demoStaff.filter(
      (s) => s.available && s.specialties.includes(service.category),
    );
  }, [service]);

  const availableDates = useMemo(() => {
    const dates: string[] = [];
    const today = startOfToday();
    for (let i = 1; i <= 21; i++) {
      const date = addDays(today, i);
      if (date.getDay() !== 0) {
        dates.push(format(date, "yyyy-MM-dd"));
      }
    }
    return dates;
  }, []);

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const slots: { time: string; label: string; available: boolean }[] = [];
    for (let h = 9; h < 19; h++) {
      for (const m of [0, 30]) {
        const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        const label = format(new Date(2026, 0, 1, h, m), "h:mm a");
        const booked = isTimeSlotBooked(
          selectedDate,
          time,
          selectedStaff || undefined,
        );
        slots.push({ time, label, available: !booked });
      }
    }
    return slots;
  }, [selectedDate, selectedStaff, isTimeSlotBooked]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Invalid email address";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 3 && !validateForm()) return;
    if (currentStep === 4) {
      handleSubmitBooking();
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, 5));
  };

  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmitBooking = () => {
    const id = "b" + Date.now().toString(36);
    addBooking({
      id,
      serviceId: selectedService,
      staffId: selectedStaff || undefined,
      date: selectedDate,
      timeSlot: selectedTime,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      status: paymentMethod === "pay_now" ? "confirmed" : "pending",
      paymentStatus: paymentMethod === "pay_now" ? "paid" : "unpaid",
      paymentMethod,
      createdAt: new Date().toISOString(),
    });
    setBookingId(id);
    setBookingComplete(true);
    setCurrentStep(5);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!selectedService;
      case 1:
        return true; // staff is optional
      case 2:
        return !!selectedDate && !!selectedTime;
      case 3:
        return formData.name && formData.email && formData.phone;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: salonConfig.secondaryColor + "30" }}
    >
      {/* Header */}
      <section
        className="py-12 text-center"
        style={{ backgroundColor: salonConfig.secondaryColor }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Book an Appointment
        </h1>
        <p className="text-gray-500">
          Schedule your perfect beauty experience in just a few steps
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-2">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < currentStep
                      ? "text-white"
                      : i === currentStep
                        ? "text-white shadow-lg"
                        : "bg-gray-200 text-gray-400"
                  }`}
                  style={
                    i <= currentStep
                      ? { backgroundColor: salonConfig.primaryColor }
                      : undefined
                  }
                >
                  {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
                </div>
                <span
                  className={`text-xs mt-2 font-medium whitespace-nowrap ${
                    i <= currentStep ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 mt-[-1rem] ${
                    i < currentStep ? "" : "bg-gray-200"
                  }`}
                  style={
                    i < currentStep
                      ? { backgroundColor: salonConfig.primaryColor }
                      : undefined
                  }
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 min-h-[400px]">
          {/* Step 0: Select Service */}
          {currentStep === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Choose a Service
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {demoServices.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                      selectedService === s.id ? "shadow-md" : "border-gray-100"
                    }`}
                    style={
                      selectedService === s.id
                        ? {
                            borderColor: salonConfig.primaryColor,
                            backgroundColor: salonConfig.secondaryColor + "40",
                          }
                        : undefined
                    }
                  >
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">
                        {s.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {s.category} · {s.duration} min
                      </p>
                      <p
                        className="text-sm font-bold mt-1"
                        style={{ color: salonConfig.primaryColor }}
                      >
                        {formatCurrency(s.price)}
                      </p>
                    </div>
                    {selectedService === s.id && (
                      <CheckCircle2
                        className="w-5 h-5 shrink-0"
                        style={{ color: salonConfig.primaryColor }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Select Staff */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Choose a Stylist
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Optional — select your preferred professional or skip to let us
                assign one
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedStaff("")}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    selectedStaff === "" ? "shadow-md" : "border-gray-100"
                  }`}
                  style={
                    selectedStaff === ""
                      ? {
                          borderColor: salonConfig.primaryColor,
                          backgroundColor: salonConfig.secondaryColor + "40",
                        }
                      : undefined
                  }
                >
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Any Available</p>
                    <p className="text-xs text-gray-400">
                      We'll assign the best available stylist
                    </p>
                  </div>
                </button>
                {availableStaff.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStaff(s.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                      selectedStaff === s.id ? "shadow-md" : "border-gray-100"
                    }`}
                    style={
                      selectedStaff === s.id
                        ? {
                            borderColor: salonConfig.primaryColor,
                            backgroundColor: salonConfig.secondaryColor + "40",
                          }
                        : undefined
                    }
                  >
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.role}</p>
                    </div>
                    {selectedStaff === s.id && (
                      <CheckCircle2
                        className="w-5 h-5 ml-auto shrink-0"
                        style={{ color: salonConfig.primaryColor }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Pick a Date & Time
              </h2>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Select Date
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableDates.map((d) => {
                    const dateObj = new Date(d + "T12:00:00");
                    return (
                      <button
                        key={d}
                        onClick={() => {
                          setSelectedDate(d);
                          setSelectedTime("");
                        }}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          selectedDate === d
                            ? "text-white shadow-md"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                        style={
                          selectedDate === d
                            ? { backgroundColor: salonConfig.primaryColor }
                            : undefined
                        }
                      >
                        <span className="block text-xs opacity-70">
                          {format(dateObj, "EEE")}
                        </span>
                        {format(dateObj, "MMM d")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Select Time
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() =>
                          slot.available && setSelectedTime(slot.time)
                        }
                        disabled={!slot.available}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          selectedTime === slot.time
                            ? "text-white shadow-md"
                            : slot.available
                              ? "bg-gray-50 text-gray-700 hover:bg-gray-100"
                              : "bg-gray-100 text-gray-300 cursor-not-allowed line-through"
                        }`}
                        style={
                          selectedTime === slot.time
                            ? { backgroundColor: salonConfig.primaryColor }
                            : undefined
                        }
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Customer Details */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Details
              </h2>
              <div className="space-y-5 max-w-md">
                {[
                  {
                    key: "name",
                    label: "Full Name",
                    type: "text",
                    placeholder: "Jane Doe",
                  },
                  {
                    key: "email",
                    label: "Email Address",
                    type: "email",
                    placeholder: "jane@example.com",
                  },
                  {
                    key: "phone",
                    label: "Phone Number",
                    type: "tel",
                    placeholder: "+1 555-000-0000",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 text-sm ${
                        formErrors[field.key]
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-200"
                      }`}
                      style={
                        !formErrors[field.key]
                          ? ({
                              "--tw-ring-color":
                                salonConfig.primaryColor + "40",
                            } as React.CSSProperties)
                          : undefined
                      }
                    />
                    {formErrors[field.key] && (
                      <p className="text-xs text-red-500 mt-1">
                        {formErrors[field.key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Payment Method */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Method
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Choose how you'd like to pay for your appointment
              </p>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Booking Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service</span>
                    <span className="font-medium">{service?.name}</span>
                  </div>
                  {staff && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Stylist</span>
                      <span className="font-medium">{staff.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">
                      {selectedDate &&
                        format(
                          new Date(selectedDate + "T12:00:00"),
                          "EEEE, MMMM d, yyyy",
                        )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium">
                      {selectedTime &&
                        format(
                          new Date(
                            2026,
                            0,
                            1,
                            parseInt(selectedTime),
                            parseInt(selectedTime.split(":")[1]),
                          ),
                          "h:mm a",
                        )}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span
                      className="font-bold text-lg"
                      style={{ color: salonConfig.primaryColor }}
                    >
                      {service && formatCurrency(service.price)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {salonConfig.onlinePaymentEnabled && (
                  <button
                    onClick={() => setPaymentMethod("pay_now")}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === "pay_now"
                        ? "shadow-md"
                        : "border-gray-100"
                    }`}
                    style={
                      paymentMethod === "pay_now"
                        ? {
                            borderColor: salonConfig.primaryColor,
                            backgroundColor: salonConfig.secondaryColor + "40",
                          }
                        : undefined
                    }
                  >
                    <CreditCard
                      className="w-6 h-6"
                      style={{ color: salonConfig.primaryColor }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Pay Now</p>
                      <p className="text-xs text-gray-400">
                        Secure online payment via Stripe
                      </p>
                    </div>
                  </button>
                )}
                {salonConfig.payAtSalonEnabled && (
                  <button
                    onClick={() => setPaymentMethod("pay_at_salon")}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === "pay_at_salon"
                        ? "shadow-md"
                        : "border-gray-100"
                    }`}
                    style={
                      paymentMethod === "pay_at_salon"
                        ? {
                            borderColor: salonConfig.primaryColor,
                            backgroundColor: salonConfig.secondaryColor + "40",
                          }
                        : undefined
                    }
                  >
                    <Wallet
                      className="w-6 h-6"
                      style={{ color: salonConfig.primaryColor }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Pay at Salon
                      </p>
                      <p className="text-xs text-gray-400">
                        Pay when you visit — cash or card accepted
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && bookingComplete && (
            <div className="text-center py-10">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: salonConfig.secondaryColor }}
              >
                <CheckCircle2
                  className="w-10 h-10"
                  style={{ color: salonConfig.primaryColor }}
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Booking Confirmed!
              </h2>
              <p className="text-gray-500 mb-2">
                Your appointment has been successfully booked.
              </p>
              <p className="text-sm text-gray-400 mb-8">
                Booking ID:{" "}
                <span className="font-mono font-medium">{bookingId}</span>
              </p>

              <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto text-left mb-8">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service</span>
                    <span className="font-medium">{service?.name}</span>
                  </div>
                  {staff && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Stylist</span>
                      <span className="font-medium">{staff.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">
                      {selectedDate &&
                        format(
                          new Date(selectedDate + "T12:00:00"),
                          "EEEE, MMMM d",
                        )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium">
                      {selectedTime &&
                        format(
                          new Date(
                            2026,
                            0,
                            1,
                            parseInt(selectedTime),
                            parseInt(selectedTime.split(":")[1]),
                          ),
                          "h:mm a",
                        )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment</span>
                    <span className="font-medium">
                      {paymentMethod === "pay_now"
                        ? "Paid Online"
                        : "Pay at Salon"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-6">
                A confirmation email will be sent to{" "}
                <strong>{formData.email}</strong>
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                style={{ backgroundColor: salonConfig.primaryColor }}
              >
                {currentStep === 4 ? "Confirm Booking" : "Continue"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
