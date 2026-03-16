import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./dashboard/AdminLayout";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import BookingPage from "./pages/BookingPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DashboardOverview from "./dashboard/DashboardOverview";
import BookingManagement from "./dashboard/BookingManagement";
import ServiceManagement from "./dashboard/ServiceManagement";
import StaffManagement from "./dashboard/StaffManagement";
import GalleryManagement from "./dashboard/GalleryManagement";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <DashboardOverview />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <AdminLayout>
              <BookingManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/services"
          element={
            <AdminLayout>
              <ServiceManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/staff"
          element={
            <AdminLayout>
              <StaffManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <AdminLayout>
              <GalleryManagement />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
