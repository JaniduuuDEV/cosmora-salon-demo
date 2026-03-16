import { Heart, Award, Leaf, Users } from "lucide-react";
import { salonConfig } from "../config/salon";
import { demoStaff } from "../data/demo";

const values = [
  {
    icon: Heart,
    title: "Passion for Beauty",
    description:
      "We pour our hearts into every service, ensuring each client leaves feeling confident and beautiful.",
  },
  {
    icon: Award,
    title: "Excellence & Quality",
    description:
      "Only the finest products and techniques are used — we never compromise on quality.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We're committed to eco-friendly practices, using sustainable and cruelty-free products.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Our salon is more than a business — it's a welcoming space for everyone in our community.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&h=600&fit=crop"
            alt="Salon"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Story
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Discover the passion, people, and philosophy behind{" "}
            {salonConfig.name}.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: salonConfig.primaryColor }}
              >
                Since 2014
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                A Decade of Making People Feel Beautiful
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  {salonConfig.name} was founded with a simple vision: to create
                  a welcoming sanctuary where everyone can discover their best
                  self. What started as a small studio has grown into a premier
                  beauty destination.
                </p>
                <p>
                  Our team of passionate professionals brings together diverse
                  expertise in hair, skincare, nails, and makeup. We stay at the
                  forefront of beauty trends while honoring timeless techniques
                  that deliver exceptional results.
                </p>
                <p>
                  Every client who walks through our doors receives personalized
                  attention and leaves with a renewed sense of confidence.
                  That's our promise.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop"
                    alt="Salon interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop"
                    alt="Facial treatment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop"
                    alt="Nail art"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop"
                    alt="Spa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-20"
        style={{ backgroundColor: salonConfig.secondaryColor + "50" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: salonConfig.primaryColor }}
            >
              Our Values
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: salonConfig.secondaryColor }}
                >
                  <v.icon
                    className="w-7 h-7"
                    style={{ color: salonConfig.primaryColor }}
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: salonConfig.primaryColor }}
            >
              Our Team
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet the Experts
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our talented team of professionals is dedicated to making you look
              and feel your best.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoStaff.map((member) => (
              <div
                key={member.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: salonConfig.primaryColor }}
                  >
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500">{member.bio}</p>
                  <div className="flex gap-2 mt-3">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: salonConfig.secondaryColor,
                          color: salonConfig.primaryColor,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
