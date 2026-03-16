import { useState } from "react";
import { X } from "lucide-react";
import { salonConfig } from "../config/salon";
import { demoGallery } from "../data/demo";

const categories = ["All", ...new Set(demoGallery.map((g) => g.category))];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? demoGallery
      : demoGallery.filter((g) => g.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: salonConfig.secondaryColor }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Our Gallery
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Browse through our portfolio of stunning transformations and beauty
          creations.
        </p>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
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

          {/* Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((img) => (
              <div
                key={img.id}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setLightbox(img.src)}
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end">
                    <span className="text-white text-sm font-medium p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
