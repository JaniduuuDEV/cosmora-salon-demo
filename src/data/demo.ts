import type {
  Service,
  StaffMember,
  Testimonial,
  GalleryImage,
  Booking,
} from "../types";

export const demoServices: Service[] = [
  {
    id: "s1",
    name: "Classic Haircut & Style",
    description:
      "Expert precision cut tailored to your face shape, includes wash, cut, and blowout styling.",
    price: 65,
    duration: 45,
    category: "Hair",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "s2",
    name: "Balayage Highlights",
    description:
      "Hand-painted highlights for a natural, sun-kissed look with seamless blending.",
    price: 185,
    duration: 120,
    category: "Hair",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "s3",
    name: "Keratin Smoothing Treatment",
    description:
      "Professional keratin treatment to eliminate frizz and add incredible shine for weeks.",
    price: 250,
    duration: 150,
    category: "Hair",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop",
  },
  {
    id: "s4",
    name: "Luxury Gel Manicure",
    description:
      "Long-lasting gel polish with cuticle care, hand massage, and flawless finish.",
    price: 45,
    duration: 60,
    category: "Nails",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "s5",
    name: "Spa Pedicure",
    description:
      "Relaxing foot soak, exfoliation, massage, and perfect polish application.",
    price: 55,
    duration: 75,
    category: "Nails",
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop",
  },
  {
    id: "s6",
    name: "Nail Art Design",
    description:
      "Custom nail art with intricate designs, gems, and creative patterns.",
    price: 35,
    duration: 45,
    category: "Nails",
    image:
      "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=300&fit=crop",
  },
  {
    id: "s7",
    name: "Deep Cleansing Facial",
    description:
      "Thorough cleansing, exfoliation, extraction, and hydrating mask for radiant skin.",
    price: 95,
    duration: 60,
    category: "Facial",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "s8",
    name: "Anti-Aging Facial",
    description:
      "Advanced treatment targeting fine lines and wrinkles with premium serums.",
    price: 135,
    duration: 75,
    category: "Facial",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
  },
  {
    id: "s9",
    name: "Bridal Makeup",
    description:
      "Stunning bridal look with trial session, airbrush application, and all-day wear formula.",
    price: 200,
    duration: 90,
    category: "Makeup",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "s10",
    name: "Glam Makeup Session",
    description:
      "Full glam look for special events with contouring, lashes, and perfect finish.",
    price: 120,
    duration: 60,
    category: "Makeup",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
  },
  {
    id: "s11",
    name: "Hot Stone Massage",
    description:
      "Heated basalt stones placed on key points to melt away tension and stress.",
    price: 110,
    duration: 60,
    category: "Spa",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
  },
  {
    id: "s12",
    name: "Aromatherapy Body Wrap",
    description:
      "Full body wrap with essential oils to detoxify, hydrate, and rejuvenate skin.",
    price: 140,
    duration: 90,
    category: "Spa",
    image:
      "https://sweetspa.ae/wp-content/uploads/2025/07/hand-oil-massage-woman-spa-wellness-relax-stress-relief-with-back-massage-masseuse-luxury-back-girl-hands-therapist-with-product-body-skin-muscle-therapy-scaled.jpg",
  },
  {
    id: "s13",
    name: "Classic Gentleman's Cut",
    description:
      "Precision men's haircut with hot towel, straight razor lineup, and styling.",
    price: 45,
    duration: 30,
    category: "Grooming",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop",
  },
  {
    id: "s14",
    name: "Beard Sculpting & Trim",
    description:
      "Expert beard shaping with hot towel treatment and beard oil conditioning.",
    price: 35,
    duration: 30,
    category: "Grooming",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop",
  },
];

export const demoStaff: StaffMember[] = [
  {
    id: "st1",
    name: "Isabella Chen",
    role: "Senior Hair Stylist",
    specialties: ["Hair"],
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    bio: "12 years of experience in color correction and balayage techniques.",
    available: true,
    availability: [
      { day: 1, startTime: "09:00", endTime: "17:00" },
      { day: 2, startTime: "09:00", endTime: "17:00" },
      { day: 3, startTime: "09:00", endTime: "17:00" },
      { day: 4, startTime: "09:00", endTime: "17:00" },
      { day: 5, startTime: "09:00", endTime: "17:00" },
      { day: 6, startTime: "10:00", endTime: "16:00" },
    ],
  },
  {
    id: "st2",
    name: "Marcus Williams",
    role: "Barber & Grooming Specialist",
    specialties: ["Grooming", "Hair"],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Master barber specializing in modern and classic men's styles.",
    available: true,
    availability: [
      { day: 1, startTime: "09:00", endTime: "19:00" },
      { day: 2, startTime: "09:00", endTime: "19:00" },
      { day: 3, startTime: "09:00", endTime: "19:00" },
      { day: 4, startTime: "09:00", endTime: "19:00" },
      { day: 5, startTime: "09:00", endTime: "19:00" },
      { day: 6, startTime: "09:00", endTime: "15:00" },
    ],
  },
  {
    id: "st3",
    name: "Sophia Rodriguez",
    role: "Nail Artist",
    specialties: ["Nails"],
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bio: "Creative nail artist with a passion for intricate designs and trends.",
    available: true,
    availability: [
      { day: 1, startTime: "10:00", endTime: "18:00" },
      { day: 2, startTime: "10:00", endTime: "18:00" },
      { day: 3, startTime: "10:00", endTime: "18:00" },
      { day: 4, startTime: "10:00", endTime: "18:00" },
      { day: 5, startTime: "10:00", endTime: "18:00" },
      { day: 6, startTime: "10:00", endTime: "16:00" },
    ],
  },
  {
    id: "st4",
    name: "Olivia Park",
    role: "Skincare Specialist",
    specialties: ["Facial", "Spa"],
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bio: "Licensed esthetician with expertise in advanced facial treatments.",
    available: true,
    availability: [
      { day: 1, startTime: "09:00", endTime: "17:00" },
      { day: 2, startTime: "09:00", endTime: "17:00" },
      { day: 3, startTime: "09:00", endTime: "17:00" },
      { day: 5, startTime: "09:00", endTime: "17:00" },
      { day: 6, startTime: "10:00", endTime: "15:00" },
    ],
  },
  {
    id: "st5",
    name: "Maya Johnson",
    role: "Makeup Artist",
    specialties: ["Makeup"],
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    bio: "Celebrity makeup artist known for flawless bridal and editorial looks.",
    available: true,
    availability: [
      { day: 2, startTime: "10:00", endTime: "18:00" },
      { day: 3, startTime: "10:00", endTime: "18:00" },
      { day: 4, startTime: "10:00", endTime: "18:00" },
      { day: 5, startTime: "10:00", endTime: "18:00" },
      { day: 6, startTime: "09:00", endTime: "17:00" },
    ],
  },
];

export const demoTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Absolutely love my balayage! Isabella is incredibly talented and really listened to what I wanted. The salon is gorgeous and I felt so pampered.",
    service: "Balayage Highlights",
  },
  {
    id: "t2",
    name: "Jessica Torres",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Best facial I've ever had! My skin was glowing for days. Olivia really knows her stuff and the products they use are top-notch.",
    service: "Deep Cleansing Facial",
  },
  {
    id: "t3",
    name: "David Kim",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Marcus gives the best fade in town. Clean, precise, and always on point. The hot towel finish is a great touch. Been coming here for 2 years.",
    service: "Classic Gentleman's Cut",
  },
  {
    id: "t4",
    name: "Emily Watson",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "My bridal makeup was flawless! Maya made me feel like a princess. She did a trial run and nailed the exact look I wanted.",
    service: "Bridal Makeup",
  },
  {
    id: "t5",
    name: "Amanda Lopez",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The gel manicure lasted over 3 weeks without chipping! Sophia is a true artist. The nail art she created was stunning.",
    service: "Luxury Gel Manicure",
  },
];

export const demoGallery: GalleryImage[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    alt: "Hair styling",
    category: "Hair",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=800&fit=crop",
    alt: "Balayage results",
    category: "Hair",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop",
    alt: "Nail art",
    category: "Nails",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop",
    alt: "Facial treatment",
    category: "Facial",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=800&fit=crop",
    alt: "Bridal makeup",
    category: "Makeup",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
    alt: "Spa treatment",
    category: "Spa",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop",
    alt: "Men grooming",
    category: "Grooming",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=800&fit=crop",
    alt: "Smooth hair treatment",
    category: "Hair",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop",
    alt: "Nail designs",
    category: "Nails",
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop",
    alt: "Glam makeup",
    category: "Makeup",
  },
  {
    id: "g11",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&h=800&fit=crop",
    alt: "Body treatment",
    category: "Spa",
  },
  {
    id: "g12",
    src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop",
    alt: "Beard grooming",
    category: "Grooming",
  },
];

export const demoBookings: Booking[] = [
  {
    id: "b1",
    serviceId: "s1",
    staffId: "st1",
    date: "2026-03-16",
    timeSlot: "10:00",
    customerName: "Alice Johnson",
    customerEmail: "alice@example.com",
    customerPhone: "+1 555-0101",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "pay_now",
    createdAt: "2026-03-14T10:30:00Z",
  },
  {
    id: "b2",
    serviceId: "s7",
    staffId: "st4",
    date: "2026-03-16",
    timeSlot: "14:00",
    customerName: "Rebecca Smith",
    customerEmail: "rebecca@example.com",
    customerPhone: "+1 555-0102",
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "pay_at_salon",
    createdAt: "2026-03-15T08:00:00Z",
  },
  {
    id: "b3",
    serviceId: "s9",
    staffId: "st5",
    date: "2026-03-17",
    timeSlot: "11:00",
    customerName: "Jennifer Lee",
    customerEmail: "jennifer@example.com",
    customerPhone: "+1 555-0103",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "pay_now",
    createdAt: "2026-03-13T16:45:00Z",
  },
  {
    id: "b4",
    serviceId: "s13",
    staffId: "st2",
    date: "2026-03-16",
    timeSlot: "09:00",
    customerName: "Michael Brown",
    customerEmail: "michael@example.com",
    customerPhone: "+1 555-0104",
    status: "checked_in",
    paymentStatus: "pending",
    paymentMethod: "pay_at_salon",
    createdAt: "2026-03-15T18:20:00Z",
  },
  {
    id: "b5",
    serviceId: "s4",
    staffId: "st3",
    date: "2026-03-18",
    timeSlot: "13:00",
    customerName: "Sarah Davis",
    customerEmail: "sarah@example.com",
    customerPhone: "+1 555-0105",
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "pay_at_salon",
    createdAt: "2026-03-15T20:10:00Z",
  },
  {
    id: "b6",
    serviceId: "s2",
    staffId: "st1",
    date: "2026-03-15",
    timeSlot: "10:00",
    customerName: "Emma Wilson",
    customerEmail: "emma@example.com",
    customerPhone: "+1 555-0106",
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "pay_now",
    createdAt: "2026-03-12T14:00:00Z",
  },
];
