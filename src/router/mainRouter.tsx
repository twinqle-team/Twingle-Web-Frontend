import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Layout from "@/components/layout/layout";
import Spinner from "@/components/common/Spinner";

import LoginPage from "@/components/auth/user/login";
import SignupPage from "@/components/auth/user/signup";
import ForgotPasswordPage from "@/components/auth/user/forgotPassword";
import VerifyOtpPage from "@/components/auth/user/verifyOtp";

import Signupvendor from "@/components/auth/vendor/Signupvendor";
import ForgotPasswordvendor from "@/components/auth/vendor/forgotPasswordvendor";
import Loginvendor from "@/components/auth/vendor/Loginvendor";

import AccountTypeSelectionPage from "@/pages/accountTypeSelectionPage";
import VendorLayout from "@/components/vendor/Layout/Layout";
import Dashboard from "@/components/vendor/Main/Dashboard";

import PropertyList from "@/components/vendor/Product/Property/Property-list/PropertyList";
import AutomotiveList from "@/components/vendor/Product/Auto/vehiclelist/AutomotiveList";
import Review from "@/components/vendor/Review/Review";
import Profile from "@/components/vendor/Setting/Profile";
import Payment from "@/components/vendor/Payment/Payment";
import Customer from "@/components/vendor/Customer/Customer";
import Billing from "@/components/vendor/Billing/Billing";
import KYCVerification from "@/components/vendor/Kyc/KYCVerification";
import Property from "@/components/vendor/Product/Property/Property-form/Property";
import VehicleForm from "@/components/vendor/Product/Auto/vehicle/VehicleForm";


import ProfileLayout from "@/components/layout/profileLayout";
// import ProfileDashboard from "@/components/userProfile/profileDashboard";
import Verifyvendor from "@/components/auth/vendor/Verifyvendor";
import Verify from "@/components/auth/vendor/Verify";
import AdminSignUp from "@/components/auth/admin/AdminSignUp";
import AdminLogin from "@/components/auth/admin/AdminLogin";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import Chat from "@/components/vendor/Chat/Chat";
import AdminDash from "@/components/admin/main/AdminDash";
import Adminchat from "@/components/admin/chat/Adminchat";
import AdminSetting from "@/components/admin/setting/Adminsetting";
import AdminReview from "@/components/admin/reviews/AdminReview";


import OrderPage from "@/components/checkout pages/orderPage";
import MessagesPage from "@/components/userProfile/messagesPage";
import SavedPage from "@/components/userProfile/savedPage";
import VendorNewPass from "@/components/auth/vendor/VendorNewPass";
import OrdersPage from "@/components/userProfile/ordersPage";
import ProfilePage from "@/components/userProfile/profilePage";

const Home = lazy(() => import("@/pages/homePage"));
const RealEstate = lazy(() => import("@/pages/realEstatePage"));
const Automotive = lazy(() => import("@/pages/automotivePage"));
const About = lazy(() => import("@/pages/verificationPage"));
const Listings = lazy(() => import("@/pages/vendorsListingPage"));
const CarDetail = lazy(() => import("@/pages/carDetailPage"));
const PropertyDetail = lazy(() => import("@/pages/propertyDetailPage"));
const VendorDetailPage = lazy(() => import("@/pages/vendorDetailPage"));


const routes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<Spinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Spinner />}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "/select-account",
    element: (
      <Suspense fallback={<Spinner />}>
        <AccountTypeSelectionPage />
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<Spinner />}>
        <ForgotPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "/verify-otp",
    element: (
      <Suspense fallback={<Spinner />}>
        <VerifyOtpPage />
      </Suspense>
    ),
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/checkout",
    element: <OrderPage />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<Spinner />}>
            <OrdersPage />
          </Suspense>
        ),
      },
      {
        path: "saved",
        element: (
          <Suspense fallback={<Spinner />}>
            <SavedPage />
          </Suspense>
        ),
      },
      {
        path: "messages",
        element: (
          <Suspense fallback={<Spinner />}>
            <MessagesPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "real-estate",
        element: (
          <Suspense fallback={<Spinner />}>
            <RealEstate />
          </Suspense>
        ),
      },
      {
        path: "automotive",
        element: (
          <Suspense fallback={<Spinner />}>
            <Automotive />
          </Suspense>
        ),
      },
      {
        path: "automotive/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <CarDetail />
          </Suspense>
        ),
      },
      {
        path: "property/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <PropertyDetail />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Spinner />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "listings/:type",
        element: (
          <Suspense fallback={<Spinner />}>
            <Listings />
          </Suspense>
        ),
      },
      {
        path: "vendor/:type/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <VendorDetailPage />
          </Suspense>
        ),
      },
      { path: "verification", element: <Navigate to="/about" replace /> },
    ],
  },

  //vendorRouter
  {
    path: "/vendor-signup",
    element: (
      <Suspense fallback={<Spinner />}>
        <Signupvendor />
      </Suspense>
    ),
  },
  {
    path: "/vendor-login",
    element: (
      <Suspense fallback={<Spinner />}>
        <Loginvendor />
      </Suspense>
    ),
  },
  {
    path: "/vendor-forgot",
    element: (
      <Suspense fallback={<Spinner />}>
        <ForgotPasswordvendor />
      </Suspense>
    ),
  },
  {
    path: "/vendor-verify",
    element: <Verifyvendor />,
  },
  // {
  //   path: "/new",
  //   element: <VendorNewPass />,
  //   element: (
  //     <Suspense fallback={<Spinner />}>
  //       <VerifyOtpPage />
  //     </Suspense>
  //   ),
  // },
  {
    path: "/new",
    element: <VendorNewPass />,
  },
  {
    path: "/app",
    element: <VendorLayout />,
    children: [
      { index: true, element: <Suspense fallback={<Spinner />}><Dashboard /></Suspense> },
      { path: "new-property", element: <Suspense fallback={<Spinner />}><Property /></Suspense> },
      { path: "My-Properties", element: <Suspense fallback={<Spinner />}><PropertyList /></Suspense> },
      { path: "My-Automotives", element: <Suspense fallback={<Spinner />}><AutomotiveList /></Suspense> },
      { path: "new-automotive", element: <Suspense fallback={<Spinner />}><VehicleForm /></Suspense> },
      { path: "reviews", element: <Suspense fallback={<Spinner />}><Review /></Suspense> },
      { path: "settings", element: <Suspense fallback={<Spinner />}><Profile /></Suspense> },
      { path: "Payment", element: <Suspense fallback={<Spinner />}><Payment /></Suspense> },
      { path: "Customers", element: <Suspense fallback={<Spinner />}><Customer /></Suspense> },
      { path: "inbox", element: <Suspense fallback={<Spinner />}><Chat /></Suspense> },
      { path: "kyc", element: <Suspense fallback={<Spinner />}><KYCVerification /></Suspense> },
      { path: "billing", element: <Suspense fallback={<Spinner />}><Billing /></Suspense> },
    ],
  },

  //adminRouter
  {
    path: "/admin-signup",
    element: (
      <Suspense fallback={<Spinner />}>
        <AdminSignUp />
      </Suspense>
    ),
  },
  {
    path: "/admin-login",
    element: (
      <Suspense fallback={<Spinner />}>
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Suspense fallback={<Spinner />}><AdminDash /></Suspense> },
      { path: "inbox", element: <Suspense fallback={<Spinner />}><Adminchat /></Suspense> },
      { path: "settings", element: <Suspense fallback={<Spinner />}><AdminSetting /></Suspense> },
      { path: "reviews", element: <Suspense fallback={<Spinner />}><AdminReview /></Suspense> },
    ],
  },  
];

export const router = createBrowserRouter(routes);
