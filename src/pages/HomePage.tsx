import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Clock,
  Phone,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { salonConfig, formatCurrency } from "../config/salon";
import { demoServices, demoTestimonials, demoGallery } from "../data/demo";

export default function HomePage() {
  const featuredServices = demoServices.filter((s) => s.popular);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop"
            alt="Salon interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90 mb-6"
              style={{ backgroundColor: `${salonConfig.primaryColor}CC` }}
            >
              <Sparkles className="w-4 h-4" />
              Premium Beauty Experience
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {salonConfig.tagline.split(" ").slice(0, -1).join(" ")}{" "}
              <span style={{ color: salonConfig.accentColor }}>
                {salonConfig.tagline.split(" ").slice(-1)}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
              Experience the art of beauty at {salonConfig.name}. Our expert
              stylists create looks that make you feel confident and radiant.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{ backgroundColor: salonConfig.primaryColor }}
              >
                Book Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                View Services
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">10+</p>
                <p className="text-sm text-white/60">Years Experience</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-3xl font-bold text-white">5K+</p>
                <p className="text-sm text-white/60">Happy Clients</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <p className="text-3xl font-bold text-white">4.9</p>
                </div>
                <p className="text-sm text-white/60">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: salonConfig.secondaryColor + "40" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: salonConfig.primaryColor }}
            >
              Our Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Popular Treatments
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Discover our most loved beauty services, crafted by expert
              professionals to make you look and feel your absolute best.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold"
                    style={{ color: salonConfig.primaryColor }}
                  >
                    {formatCurrency(service.price)}
                  </div>
                </div>
                <div className="p-5">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: salonConfig.accentColor }}
                  >
                    {service.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-1 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {service.duration} min
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-semibold transition-all hover:text-white"
              style={{
                borderColor: salonConfig.primaryColor,
                color: salonConfig.primaryColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  salonConfig.primaryColor;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = salonConfig.primaryColor;
              }}
            >
              View All Services
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About/Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop"
                  alt="Salon experience"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl shadow-xl hidden lg:block overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop"
                  alt="Nail art"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: salonConfig.primaryColor }}
              >
                Why Choose Us
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Beauty That Tells{" "}
                <span style={{ color: salonConfig.primaryColor }}>
                  Your Story
                </span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                At {salonConfig.name}, we believe beauty is personal. Our
                talented team of professionals works with you to create looks
                that enhance your unique features and match your lifestyle.
              </p>

              <div className="space-y-5">
                {[
                  {
                    title: "Expert Professionals",
                    desc: "Our team of certified stylists and therapists bring years of industry experience.",
                  },
                  {
                    title: "Premium Products",
                    desc: "We use only the finest professional-grade beauty products for lasting results.",
                  },
                  {
                    title: "Relaxing Atmosphere",
                    desc: "Enjoy a serene, luxurious environment designed for your comfort and well-being.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: salonConfig.secondaryColor }}
                    >
                      <Sparkles
                        className="w-5 h-5"
                        style={{ color: salonConfig.primaryColor }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-8 font-semibold hover:gap-3 transition-all"
                style={{ color: salonConfig.primaryColor }}
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: salonConfig.primaryColor }}
            >
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoTestimonials.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400">{t.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: salonConfig.primaryColor }}
            >
              Our Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Gallery
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {demoGallery.slice(0, 8).map((img) => (
              <div
                key={img.id}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:gap-3"
              style={{ color: salonConfig.primaryColor }}
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Opening Hours & CTA */}
      <section
        className="py-20 lg:py-28 text-white relative overflow-hidden"
        style={{ backgroundColor: salonConfig.primaryColor }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-white/30" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border border-white/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Look Amazing?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg">
                Book your appointment today and let our experts transform your
                look. Walk in or book online — we're here for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  style={{ color: salonConfig.primaryColor }}
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={`tel:${salonConfig.phone}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Opening Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
                  { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center py-2 border-b border-white/10"
                  >
                    <span className="text-white/80">{item.day}</span>
                    <span className="font-semibold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
