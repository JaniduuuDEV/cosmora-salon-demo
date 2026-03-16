export type ServiceCategory =
  | "Hair"
  | "Nails"
  | "Facial"
  | "Makeup"
  | "Spa"
  | "Grooming";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: ServiceCategory;
  image: string;
  popular?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  specialties: ServiceCategory[];
  avatar: string;
  bio: string;
  available: boolean;
  availability: DayAvailability[];
}

export interface DayAvailability {
  day: number; // 0=Sunday, 1=Monday, ...
  startTime: string;
  endTime: string;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";
export type PaymentStatus = "unpaid" | "pending" | "paid" | "refunded";
export type PaymentMethod = "pay_now" | "pay_at_salon";

export interface Booking {
  id: string;
  serviceId: string;
  staffId?: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
