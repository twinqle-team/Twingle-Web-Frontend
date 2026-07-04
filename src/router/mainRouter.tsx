import { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
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


const Home = lazy(() => import("@/pages/homePage"));
const RealEstate = lazy(() => import("@/pages/realEstatePage"));
const Automotive = lazy(() => import("@/pages/automotivePage"));
const Verification = lazy(() => import("@/pages/verificationPage"));

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
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "real-estate", element: withSuspense(RealEstate) },
      { path: "automotive", element: withSuspense(Automotive) },
      { path: "verification", element: withSuspense(Verification) },
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
      // { path: "dashboard", element: withSuspense(Dashboard) },
    ],
  },

  //adminRouter
];

export const router = createBrowserRouter(routes);
