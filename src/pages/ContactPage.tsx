import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
} from "lucide-react";
import { salonConfig } from "../config/salon";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: salonConfig.secondaryColor }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Get In Touch
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Have a question or want to book an appointment? We'd love to hear from
          you.
        </p>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 mb-10">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: salonConfig.phone,
                    href: `tel:${salonConfig.phone}`,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: salonConfig.email,
                    href: `mailto:${salonConfig.email}`,
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    value: salonConfig.address,
                    href: salonConfig.mapLink,
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "Send us a message",
                    href: `https://wa.me/${salonConfig.whatsapp.replace(/\D/g, "")}`,
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={
                      item.label === "Address" || item.label === "WhatsApp"
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      item.label === "Address" || item.label === "WhatsApp"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: salonConfig.secondaryColor }}
                    >
                      <item.icon
                        className="w-5 h-5"
                        style={{ color: salonConfig.primaryColor }}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-medium text-gray-900 group-hover:underline">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Opening Hours */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock
                    className="w-5 h-5"
                    style={{ color: salonConfig.primaryColor }}
                  />
                  Opening Hours
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between py-1.5">
                      <span className="text-gray-500">{item.day}</span>
                      <span
                        className={`font-medium ${item.hours === "Closed" ? "text-red-400" : "text-gray-900"}`}
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {salonConfig.facebook && (
                    <a
                      href={salonConfig.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      style={{
                        backgroundColor: salonConfig.secondaryColor,
                        color: salonConfig.primaryColor,
                      }}
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {salonConfig.instagram && (
                    <a
                      href={salonConfig.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      style={{
                        backgroundColor: salonConfig.secondaryColor,
                        color: salonConfig.primaryColor,
                      }}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Fill out the form and we'll get back to you shortly.
                </p>

                {submitted ? (
                  <div className="text-center py-16">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: salonConfig.secondaryColor }}
                    >
                      <Send
                        className="w-7 h-7"
                        style={{ color: salonConfig.primaryColor }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Thank you for reaching out. We'll respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm transition-all"
                          style={
                            {
                              "--tw-ring-color":
                                salonConfig.primaryColor + "40",
                            } as React.CSSProperties
                          }
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm transition-all"
                          style={
                            {
                              "--tw-ring-color":
                                salonConfig.primaryColor + "40",
                            } as React.CSSProperties
                          }
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            subject: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm transition-all"
                        style={
                          {
                            "--tw-ring-color": salonConfig.primaryColor + "40",
                          } as React.CSSProperties
                        }
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            message: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm transition-all resize-none"
                        style={
                          {
                            "--tw-ring-color": salonConfig.primaryColor + "40",
                          } as React.CSSProperties
                        }
                        placeholder="Your message..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-[1.02]"
                      style={{ backgroundColor: salonConfig.primaryColor }}
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map Embed Placeholder */}
          <div className="mt-16 rounded-2xl overflow-hidden h-80 bg-gray-100 relative">
            <iframe
              title="Salon Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26430.393554!2d-118.42!3d34.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly+Hills%2C+CA!5e0!3m2!1sen!2sus!4v1"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
