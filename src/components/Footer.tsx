import { Link } from "react-router-dom";
import {
  Scissors,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
} from "lucide-react";
import { salonConfig } from "../config/salon";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: salonConfig.primaryColor }}
              >
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                {salonConfig.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              {salonConfig.tagline}. Premium beauty services tailored to enhance
              your natural beauty.
            </p>
            <div className="flex gap-3 mt-6">
              {salonConfig.facebook && (
                <a
                  href={salonConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {salonConfig.instagram && (
                <a
                  href={salonConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { path: "/services", label: "Our Services" },
                { path: "/booking", label: "Book Appointment" },
                { path: "/gallery", label: "Gallery" },
                { path: "/about", label: "About Us" },
                { path: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Phone
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: salonConfig.accentColor }}
                />
                <a
                  href={`tel:${salonConfig.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {salonConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: salonConfig.accentColor }}
                />
                <a
                  href={`mailto:${salonConfig.email}`}
                  className="hover:text-white transition-colors"
                >
                  {salonConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: salonConfig.accentColor }}
                />
                <span>{salonConfig.address}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Opening Hours
            </h3>
            <div className="flex items-start gap-3 text-sm">
              <Clock
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: salonConfig.accentColor }}
              />
              <div>
                <p>{salonConfig.openDays}</p>
                <p className="text-white font-medium">
                  {salonConfig.openHours}
                </p>
                <p className="mt-2 text-gray-500">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {salonConfig.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
