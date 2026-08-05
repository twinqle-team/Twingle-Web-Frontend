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



import ProfileLayout from "@/components/layout/profileLayout";
import ProfileDashboard from "@/components/userProfile/profileDashboard";
import VendorNewPass from "@/components/auth/vendor/VendorNewPass";
import Verifyvendor from "@/components/auth/vendor/Verifyvendor";
import Verify from "@/components/auth/vendor/Verify";


const Home = lazy(() => import("@/pages/homePage"));
const RealEstate = lazy(() => import("@/pages/realEstatePage"));
const Automotive = lazy(() => import("@/pages/automotivePage"));
const About = lazy(() => import("@/pages/verificationPage"));
const Listings = lazy(() => import("@/pages/vendorsListingPage"));
const CarDetail = lazy(() => import("@/pages/carDetailPage"));
const PropertyDetail = lazy(() => import("@/pages/propertyDetailPage"));
const VendorDetailPage = lazy(() => import("@/pages/vendorDetailPage"));

// Lazy load vendor routes
const VendorDashboard = lazy(() => import("@/components/vendor/Main/Dashboard"));
const VendorProperty = lazy(() => import("@/components/vendor/Product/Property/Property-form/Property"));
const VendorPropertyList = lazy(() => import("@/components/vendor/Product/Property/Property-list/PropertyList"));
const VendorAutomotiveList = lazy(() => import("@/components/vendor/Product/Auto/vehiclelist/AutomotiveList"));
// const VendorAutomotive = lazy(() => import("@/components/vendor/Product/Auto/Automotive"));
const VendorReview = lazy(() => import("@/components/vendor/Review/Review"));
const VendorProfile = lazy(() => import("@/components/vendor/Setting/Profile"));
const VendorPayment = lazy(() => import("@/components/vendor/Payment/Payment"));
const VendorCustomer = lazy(() => import("@/components/vendor/Customer/Customer"));
const VendorChat = lazy(() => import("@/components/vendor/Chat/Chat"));
const VendorBilling = lazy(() => import("@/components/vendor/Billing/Billing"));
const VendorKYC = lazy(() => import("@/components/vendor/Kyc/KYCVerification"));

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
    path: "/profile",
    element: <ProfileLayout />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<Spinner />}>
            <ProfileDashboard />
          </Suspense>
        ) 
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={<Spinner />}><Home /></Suspense> },
      { path: "real-estate", element: <Suspense fallback={<Spinner />}><RealEstate /></Suspense> },
      { path: "automotive", element: <Suspense fallback={<Spinner />}><Automotive /></Suspense> },
      { path: "automotive/:id", element: <Suspense fallback={<Spinner />}><CarDetail /></Suspense> },
      { path: "property/:id", element: <Suspense fallback={<Spinner />}><PropertyDetail /></Suspense> },
      { path: "about", element: <Suspense fallback={<Spinner />}><About /></Suspense> },
      { path: "listings/:type", element: <Suspense fallback={<Spinner />}><Listings /></Suspense> },
      { path: "vendor/:type/:id", element: <Suspense fallback={<Spinner />}><VendorDetailPage /></Suspense> },
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
  {
    path: "/new",
    element: <VendorNewPass />
  },
  {
    path: "/app",
    element: <VendorLayout />,
    children: [

      { index: true, element: <Suspense fallback={<Spinner />}><VendorDashboard /></Suspense> },
      { path: "All-Properties", element: <Suspense fallback={<Spinner />}><VendorProperty /></Suspense> },
      { path: "new-property", element: <Suspense fallback={<Spinner />}><VendorPropertyList /></Suspense> },
      { path: "all-automotives", element: <Suspense fallback={<Spinner />}><VendorAutomotiveList /></Suspense> },
      // { path: "new-automotive", element: <Suspense fallback={<Spinner />}><VendorAutomotive /></Suspense> },
      { path: "reviews", element: <Suspense fallback={<Spinner />}><VendorReview /></Suspense> },
      { path: "settings", element: <Suspense fallback={<Spinner />}><VendorProfile /></Suspense> },
      { path: "Payment", element: <Suspense fallback={<Spinner />}><VendorPayment /></Suspense> },
      { path: "Customers", element: <Suspense fallback={<Spinner />}><VendorCustomer /></Suspense> },
      { path: "inbox", element: <Suspense fallback={<Spinner />}><VendorChat /></Suspense> },
      { path: "kyc", element: <Suspense fallback={<Spinner />}><VendorKYC /></Suspense> },
      { path: "billing", element: <Suspense fallback={<Spinner />}><VendorBilling /></Suspense> },

    ],
  },

  //adminRouter
  ];

export const router = createBrowserRouter(routes);
