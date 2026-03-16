import { useState } from "react";
import { Plus, Pencil, X, ToggleLeft, ToggleRight } from "lucide-react";
import { salonConfig } from "../config/salon";
import { demoStaff } from "../data/demo";
import type { StaffMember, ServiceCategory } from "../types";

const categories: ServiceCategory[] = [
  "Hair",
  "Nails",
  "Facial",
  "Makeup",
  "Spa",
  "Grooming",
];

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([...demoStaff]);
  const [editing, setEditing] = useState<StaffMember | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing({
      id: "st" + Date.now(),
      name: "",
      role: "",
      specialties: [],
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "",
      available: true,
      availability: [
        { day: 1, startTime: "09:00", endTime: "17:00" },
        { day: 2, startTime: "09:00", endTime: "17:00" },
        { day: 3, startTime: "09:00", endTime: "17:00" },
        { day: 4, startTime: "09:00", endTime: "17:00" },
        { day: 5, startTime: "09:00", endTime: "17:00" },
      ],
    });
    setIsNew(true);
  };

  const save = () => {
    if (!editing || !editing.name.trim()) return;
    if (isNew) {
      setStaff((prev) => [editing, ...prev]);
    } else {
      setStaff((prev) => prev.map((s) => (s.id === editing.id ? editing : s)));
    }
    setEditing(null);
    setIsNew(false);
  };

  const toggleAvailability = (id: string) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, available: !s.available } : s)),
    );
  };

  const toggleSpecialty = (spec: ServiceCategory) => {
    if (!editing) return;
    const has = editing.specialties.includes(spec);
    setEditing({
      ...editing,
      specialties: has
        ? editing.specialties.filter((s) => s !== spec)
        : [...editing.specialties, spec],
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Staff Management</h2>
          <p className="text-sm text-gray-400">{staff.length} members</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg"
          style={{ backgroundColor: salonConfig.primaryColor }}
        >
          <Plus className="w-4 h-4" />
          Add Staff
        </button>
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map((member) => (
          <div
            key={member.id}
            className={`bg-white rounded-xl border shadow-sm overflow-hidden ${!member.available ? "opacity-60" : "border-gray-100"}`}
          >
            <div className="flex items-center gap-4 p-5">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p
                  className="text-sm"
                  style={{ color: salonConfig.primaryColor }}
                >
                  {member.role}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {member.bio}
                </p>
              </div>
            </div>
            <div className="px-5 pb-3">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {member.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
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
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50 bg-gray-50/50">
              <button
                onClick={() => toggleAvailability(member.id)}
                className="flex items-center gap-2 text-xs font-medium"
              >
                {member.available ? (
                  <ToggleRight className="w-6 h-6 text-green-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-300" />
                )}
                {member.available ? "Active" : "Inactive"}
              </button>
              <button
                onClick={() => {
                  setEditing(member);
                  setIsNew(false);
                }}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{
                  backgroundColor: salonConfig.secondaryColor,
                  color: salonConfig.primaryColor,
                }}
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <h3 className="text-lg font-bold text-gray-900">
                {isNew ? "Add Staff Member" : "Edit Staff Member"}
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
                  Role
                </label>
                <input
                  type="text"
                  value={editing.role}
                  onChange={(e) =>
                    setEditing({ ...editing, role: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                  style={
                    {
                      "--tw-ring-color": salonConfig.primaryColor + "40",
                    } as React.CSSProperties
                  }
                  placeholder="e.g., Senior Hair Stylist"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={editing.bio}
                  onChange={(e) =>
                    setEditing({ ...editing, bio: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 resize-none"
                  style={
                    {
                      "--tw-ring-color": salonConfig.primaryColor + "40",
                    } as React.CSSProperties
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialties
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleSpecialty(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        editing.specialties.includes(cat)
                          ? "text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                      style={
                        editing.specialties.includes(cat)
                          ? { backgroundColor: salonConfig.primaryColor }
                          : undefined
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={editing.avatar}
                  onChange={(e) =>
                    setEditing({ ...editing, avatar: e.target.value })
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
            <div className="flex justify-end gap-3 p-5 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-2xl">
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
                {isNew ? "Add Member" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
