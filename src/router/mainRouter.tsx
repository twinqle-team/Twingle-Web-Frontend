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

import Review from "@/components/vendor/Review/Review";
import Profile from "@/components/vendor/Setting/Profile";
import Payment from "@/components/vendor/Payment/Payment";
import Customer from "@/components/vendor/Customer/Customer";
// import Chat from "@/components/vendor/Chat/Chat";
import Billing from "@/components/vendor/Billing/Billing";
import KYCVerification from "@/components/vendor/Kyc/KYCVerification";


import ProfileLayout from "@/components/layout/profileLayout";
import ProfileDashboard from "@/components/userProfile/profileDashboard";
import VendorNewPass from "@/components/auth/vendor/VendorNewPass";
import Verifyvendor from "@/components/auth/vendor/Verifyvendor";
import Verify from "@/components/auth/vendor/Verify";
import Property from "@/components/vendor/Product/Property/Property-form/Property";
import PropertiesList from "@/components/vendor/Product/Property/Property-list/PropertyList";
import AutomotiveList from "@/components/vendor/Product/Auto/vehiclelist/AutomotiveList";
import vehicleForm from "@/components/vendor/Product/Auto/vehicle/VehicleForm";
import AdminSignUp from "@/components/auth/admin/AdminSignUp";
import AdminLogin from "@/components/auth/admin/AdminLogin";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import AdminDash from "@/components/admin/main/AdminDash";
import Chat from "@/components/vendor/Chat/Chat";
import Adminchat from "@/components/admin/chat/Adminchat";
import AdminSetting from "@/components/admin/setting/Adminsetting";
import AdminReview from "@/components/admin/reviews/AdminReview";
// import AllUsers from "@/components/admin/usersManger/AllUsers";


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
    path: "/verify",
    element: <Verify />,
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
    element: <Verifyvendor />,
  },
  {
    path: "/new",
    element: <VendorNewPass />,
  },
  {
    path: "/app",
    element: <VendorLayout />,
    children: [
      { index: true, element: withSuspense(Dashboard) },
      {path: "new-property", element: withSuspense(Property)},
      {path: "My-Properties", element: withSuspense(PropertiesList)},
      {path: "My-Automotives", element: withSuspense(AutomotiveList)},
      {path: "new-automotive", element: withSuspense(vehicleForm)},
      { path: "reviews", element: withSuspense(Review) },
      { path: "settings", element: withSuspense(Profile) },
      { path: "Payment", element: withSuspense(Payment) },
      { path: "Customers", element: withSuspense(Customer) },
      { path: "inbox", element: withSuspense(Chat) },
      { path: "kyc", element: withSuspense(KYCVerification) },
      { path: "billing", element: withSuspense(Billing) },
    ],
  },

  //adminRouter
   {
    path: "/admin-signup",
    element: <AdminSignUp />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: withSuspense(AdminDash) },
      { path: "inbox", element: withSuspense(Adminchat) },
      { path: "settings", element: withSuspense(AdminSetting) },
      { path: "reviews", element: withSuspense(AdminReview) },
      // { path: "all", element: withSuspense(AllUsers) },
      // {path: "new-property", element: withSuspense(Property)},
    ],
  },
  
];

export const router = createBrowserRouter(routes);
