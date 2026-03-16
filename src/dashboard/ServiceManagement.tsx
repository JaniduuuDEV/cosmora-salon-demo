import { useState } from "react";
import { Plus, Pencil, Trash2, X, Clock } from "lucide-react";
import { salonConfig, formatCurrency } from "../config/salon";
import { demoServices } from "../data/demo";
import type { Service, ServiceCategory } from "../types";

const categories: ServiceCategory[] = [
  "Hair",
  "Nails",
  "Facial",
  "Makeup",
  "Spa",
  "Grooming",
];

export default function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([...demoServices]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing({
      id: "s" + Date.now(),
      name: "",
      description: "",
      price: 0,
      duration: 30,
      category: "Hair",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    });
    setIsNew(true);
  };

  const save = () => {
    if (!editing || !editing.name.trim()) return;
    if (isNew) {
      setServices((prev) => [editing, ...prev]);
    } else {
      setServices((prev) =>
        prev.map((s) => (s.id === editing.id ? editing : s)),
      );
    }
    setEditing(null);
    setIsNew(false);
  };

  const remove = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Service Management
          </h2>
          <p className="text-sm text-gray-400">{services.length} services</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg"
          style={{ backgroundColor: salonConfig.primaryColor }}
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: salonConfig.accentColor }}
                >
                  {service.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {service.duration} min
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {service.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="font-bold"
                  style={{ color: salonConfig.primaryColor }}
                >
                  {formatCurrency(service.price)}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditing(service);
                      setIsNew(false);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => remove(service.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {isNew ? "Add Service" : "Edit Service"}
              </h3>
              <button
                onClick={() => {
                  setEditing(null);
                  setIsNew(false);
                }}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                  style={
                    {
                      "--tw-ring-color": salonConfig.primaryColor + "40",
                    } as React.CSSProperties
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 resize-none"
                  style={
                    {
                      "--tw-ring-color": salonConfig.primaryColor + "40",
                    } as React.CSSProperties
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editing.price}
                    onChange={(e) =>
                      setEditing({ ...editing, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                    style={
                      {
                        "--tw-ring-color": salonConfig.primaryColor + "40",
                      } as React.CSSProperties
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    min={15}
                    step={15}
                    value={editing.duration}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        duration: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                    style={
                      {
                        "--tw-ring-color": salonConfig.primaryColor + "40",
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      category: e.target.value as ServiceCategory,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 bg-white"
                  style={
                    {
                      "--tw-ring-color": salonConfig.primaryColor + "40",
                    } as React.CSSProperties
                  }
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editing.image}
                  onChange={(e) =>
                    setEditing({ ...editing, image: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                  style={
                    {
                      "--tw-ring-color": salonConfig.primaryColor + "40",
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => {
                  setEditing(null);
                  setIsNew(false);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: salonConfig.primaryColor }}
              >
                {isNew ? "Create" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
