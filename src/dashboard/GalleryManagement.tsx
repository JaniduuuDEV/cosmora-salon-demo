import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { salonConfig } from "../config/salon";
import { demoGallery } from "../data/demo";
import type { GalleryImage } from "../types";

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([...demoGallery]);
  const [showAdd, setShowAdd] = useState(false);
  const [newImage, setNewImage] = useState({
    src: "",
    alt: "",
    category: "Hair",
  });

  const addImage = () => {
    if (!newImage.src.trim()) return;
    setImages((prev) => [{ id: "g" + Date.now(), ...newImage }, ...prev]);
    setNewImage({ src: "", alt: "", category: "Hair" });
    setShowAdd(false);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Gallery Management
          </h2>
          <p className="text-sm text-gray-400">{images.length} images</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg"
          style={{ backgroundColor: salonConfig.primaryColor }}
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative rounded-xl overflow-hidden bg-gray-100"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-gray-700">
                {img.category}
              </div>
              <button
                onClick={() => removeImage(img.id)}
                className="p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Add Image</h3>
              <button
                onClick={() => setShowAdd(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={newImage.src}
                  onChange={(e) =>
                    setNewImage({ ...newImage, src: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                  style={
                    {
                      "--tw-ring-color": salonConfig.primaryColor + "40",
                    } as React.CSSProperties
                  }
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              {newImage.src && (
                <div className="rounded-lg overflow-hidden h-40 bg-gray-100">
                  <img
                    src={newImage.src}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={newImage.alt}
                  onChange={(e) =>
                    setNewImage({ ...newImage, alt: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                  style={
                    {
                      "--tw-ring-color": salonConfig.primaryColor + "40",
                    } as React.CSSProperties
                  }
                  placeholder="Description of the image"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newImage.category}
                  onChange={(e) =>
                    setNewImage({ ...newImage, category: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 bg-white"
                  style={
                    {
                      "--tw-ring-color": salonConfig.primaryColor + "40",
                    } as React.CSSProperties
                  }
                >
                  {["Hair", "Nails", "Facial", "Makeup", "Spa", "Grooming"].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addImage}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: salonConfig.primaryColor }}
              >
                Add Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
