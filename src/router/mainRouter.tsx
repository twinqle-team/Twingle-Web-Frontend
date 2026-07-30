import { lazy } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Layout from "@/components/layout/layout";
import { withSuspense } from "@/router/withSuspense";

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
// import Chat from "@/components/vendor/Chat/Chat";
import Billing from "@/components/vendor/Billing/Billing";
import KYCVerification from "@/components/vendor/Kyc/KYCVerification";
import Property from "@/components/vendor/Product/Property/Property-form/Property";
import VehicleForm from "@/components/vendor/Product/Auto/vehicle/VehicleForm";


import ProfileLayout from "@/components/layout/profileLayout";
import ProfileDashboard from "@/components/userProfile/profileDashboard";


const Home = lazy(() => import("@/pages/homePage"));
const RealEstate = lazy(() => import("@/pages/realEstatePage"));
const Automotive = lazy(() => import("@/pages/automotivePage"));
const About = lazy(() => import("@/pages/verificationPage"));
const Listings = lazy(() => import("@/pages/listingsPage"));
const CarDetail = lazy(() => import("@/pages/carDetailPage"));
const PropertyDetail = lazy(() => import("@/pages/propertyDetailPage"));

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/select-account",
    element: <AccountTypeSelectionPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtpPage />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
    children: [{ index: true, element: <ProfileDashboard /> }],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "real-estate", element: withSuspense(RealEstate) },
      { path: "automotive", element: withSuspense(Automotive) },
      { path: "automotive/:id", element: withSuspense(CarDetail) },
      { path: "property/:id", element: withSuspense(PropertyDetail) },
      { path: "about", element: withSuspense(About) },
      { path: "listings/:type", element: withSuspense(Listings) },
      { path: "verification", element: <Navigate to="/about" replace /> },
    ],
  },

  //vendorRouter
  {
    path: "/vendor-signup",
    element: <Signupvendor />,
  },
  {
    path: "/vendor-login",
    element: <Loginvendor />,
  },
  {
    path: "/vendor-forgot",
    element: <ForgotPasswordvendor />,
  },
  {
    path: "/vendor-verify",
    element: <VerifyOtpPage />,
  },
  {
    path: "/app",
    element: <VendorLayout />,
    children: [
      { index: true, element: withSuspense(Dashboard) },
      { path: "new-property", element: withSuspense(Property) },
      { path: "My-Properties", element: withSuspense(PropertyList) },
      { path: "My-Automotives", element: withSuspense(AutomotiveList) },
      { path: "new-automotive", element: withSuspense(VehicleForm) },
      { path: "reviews", element: withSuspense(Review) },
      { path: "settings", element: withSuspense(Profile) },
      { path: "Payment", element: withSuspense(Payment) },
      { path: "Customers", element: withSuspense(Customer) },
      // { path: "inbox", element: withSuspense(Chat) },
      { path: "kyc", element: withSuspense(KYCVerification) },
      { path: "billing", element: withSuspense(Billing) },
    ],
  },

  //adminRouter
];

export const router = createBrowserRouter(routes);
