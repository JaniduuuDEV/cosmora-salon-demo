import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, Search } from "lucide-react";
import { salonConfig, formatCurrency } from "../config/salon";
import { demoServices } from "../data/demo";
import type { ServiceCategory } from "../types";

const categories: ("All" | ServiceCategory)[] = [
  "All",
  "Hair",
  "Nails",
  "Facial",
  "Makeup",
  "Spa",
  "Grooming",
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | ServiceCategory>(
    "All",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = demoServices.filter((s) => {
    const matchesCategory =
      activeCategory === "All" || s.category === activeCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{ backgroundColor: salonConfig.secondaryColor }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
            Explore our full range of beauty and wellness treatments designed to
            make you look and feel extraordinary.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 text-sm"
              style={
                {
                  "--tw-ring-color": salonConfig.primaryColor,
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      </section>

      {/* Categories & Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={
                  activeCategory === cat
                    ? { backgroundColor: salonConfig.primaryColor }
                    : undefined
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Service Cards */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No services found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {service.popular && (
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: salonConfig.primaryColor }}
                      >
                        Popular
                      </div>
                    )}
                    <div
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold"
                      style={{ color: salonConfig.primaryColor }}
                    >
                      {formatCurrency(service.price)}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: salonConfig.accentColor }}
                      >
                        {service.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {service.duration} min
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {service.description}
                    </p>
                    <Link
                      to={`/booking?service=${service.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                      style={{ color: salonConfig.primaryColor }}
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
