export const salonConfig = {
  name: import.meta.env.VITE_SALON_NAME || "Cosmora Beauty Studio",
  tagline: import.meta.env.VITE_SALON_TAGLINE || "Where Beauty Meets Elegance",
  phone: import.meta.env.VITE_SALON_PHONE || "+1 (555) 123-4567",
  whatsapp: import.meta.env.VITE_SALON_WHATSAPP || "+15551234567",
  email: import.meta.env.VITE_SALON_EMAIL || "hello@cosmora.com",
  address:
    import.meta.env.VITE_SALON_ADDRESS ||
    "123 Elegance Avenue, Beverly Hills, CA 90210",
  mapLink: import.meta.env.VITE_SALON_MAP_LINK || "https://maps.google.com",

  primaryColor: import.meta.env.VITE_SALON_PRIMARY_COLOR || "#8B5E3C",
  secondaryColor: import.meta.env.VITE_SALON_SECONDARY_COLOR || "#F5E6D3",
  accentColor: import.meta.env.VITE_SALON_ACCENT_COLOR || "#D4A574",

  facebook: import.meta.env.VITE_SALON_FACEBOOK || "",
  instagram: import.meta.env.VITE_SALON_INSTAGRAM || "",
  tiktok: import.meta.env.VITE_SALON_TIKTOK || "",

  openDays: import.meta.env.VITE_SALON_OPEN_DAYS || "Monday - Saturday",
  openHours: import.meta.env.VITE_SALON_OPEN_HOURS || "9:00 AM - 7:00 PM",

  onlineBookingEnabled: import.meta.env.VITE_ONLINE_BOOKING_ENABLED === "true",
  onlinePaymentEnabled: import.meta.env.VITE_ONLINE_PAYMENT_ENABLED === "true",
  payAtSalonEnabled: import.meta.env.VITE_PAY_AT_SALON_ENABLED === "true",

  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || "",

  currency: import.meta.env.VITE_CURRENCY || "USD",
  timezone: import.meta.env.VITE_TIMEZONE || "America/Los_Angeles",
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: salonConfig.currency,
  }).format(amount);
};
