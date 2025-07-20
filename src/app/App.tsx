import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../contexts/AppContext';
import PrivateRoute from './auth/PrivateRoute';
import { Error404Page, ForgotPassword, SignIn, SignUp, Unauthorized, VerifyEmail } from './main';
import { About, StayWithUs, Home, DineWithUs, RoomView, Menu, ContactUs, BlogPage, BlogView, TableView, RoomBook, TableBook, UserProfile } from './pages';
import { AdminUsers, Dashboard, Guests, RoomBookings, RoomOverview, RoomsManagement, Settings, TableManagement, TableOverview, TableReservations, Reports, PaymentManagement } from './admin';
import { AllRooms, AllTables } from './admin';
import { PrivacyPolicy, RefundPolicy, TermsAndConditions } from './pages/policies';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import AppConfigProvider from './theme/ConfigProvider';


const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ToastContainer />
        <AppConfigProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute element={<Home />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/sign-in" element={<PrivateRoute element={<SignIn />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/sign-up" element={<PrivateRoute element={<SignUp />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/forgot-password" element={<PrivateRoute element={<ForgotPassword />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/verify-email" element={<PrivateRoute element={<VerifyEmail />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/about" element={<PrivateRoute element={<About />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/stay-with-us" element={<PrivateRoute element={<StayWithUs />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/dine-with-us" element={<PrivateRoute element={<DineWithUs />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/room-view/:id" element={<PrivateRoute element={<RoomView />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/table-view/:id" element={<PrivateRoute element={<TableView />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/menu" element={<PrivateRoute element={<Menu />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/contact-us" element={<PrivateRoute element={<ContactUs />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/blog" element={<PrivateRoute element={<BlogPage />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/blog/:id" element={<PrivateRoute element={<BlogView />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            {/* room-book */}
            <Route path="/room-book/:id" element={<PrivateRoute element={<RoomBook />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            {/* table-book */}
            <Route path="/table-book/:id" element={<PrivateRoute element={<TableBook />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            {/* User Profile */}
            <Route path="/profile" element={<PrivateRoute element={<UserProfile />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/privacy-policy" element={<PrivateRoute element={<PrivacyPolicy />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/refund-policy" element={<PrivateRoute element={<RefundPolicy />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/terms-and-conditions" element={<PrivateRoute element={<TermsAndConditions />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            {/* Common Routes */}
            {/* Admin Routes */}

            {/* User Routes */}

            {/* Admin Routes */}
            {/* User Routes */}


            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<PrivateRoute element={<Dashboard />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/table-reservations" element={<PrivateRoute element={<TableReservations />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/room-bookings" element={<PrivateRoute element={<RoomBookings />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/rooms-management" element={<PrivateRoute element={<RoomsManagement />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/table-management" element={<PrivateRoute element={<TableManagement />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/guests" element={<PrivateRoute element={<Guests />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/admin-users" element={<PrivateRoute element={<AdminUsers />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/settings" element={<PrivateRoute element={<Settings />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/rooms-management/:id" element={<PrivateRoute element={<RoomOverview />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/table-management/:id" element={<PrivateRoute element={<TableOverview />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/reports" element={<PrivateRoute element={<Reports />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/payment-management" element={<PrivateRoute element={<PaymentManagement />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/all-rooms" element={<PrivateRoute element={<AllRooms />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            <Route path="/admin/all-tables" element={<PrivateRoute element={<AllTables />} roles={['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST']} />} />
            {/* Common Routes */}
            <Route path="*" element={<Error404Page />} />
            <Route path="unauthorized" element={<Unauthorized />} />
          </Routes>
        </AppConfigProvider>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
