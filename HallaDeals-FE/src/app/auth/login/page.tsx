"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CiLock } from "react-icons/ci";
import TextInput from "@/components/UI/TextInput";
import Button from "@/components/UI/Button";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";
import { loginStyles } from "./classNames";
import { HandleError } from "@/utils/HandleError";
import { useAuth } from "@/context/AuthContext";
import { FiMail, FiPhone } from "react-icons/fi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Image from "next/image";
import Header from "@/components/Header";
import { LoginMsg } from "@/constants/content";
import { getDefaultSocialButtons } from "@/components/SocialLoginButtons/socialLoginData";
import { HandleLoginWithGoogle, HandleloginFacebook } from "@/services/authService";
import { useRouter } from "next/navigation";

// handle social Auth
const handleGoogle = async () => {
  try {
    await HandleLoginWithGoogle();
  } catch (error) {
    console.log("error happen while login", error);
  }
};

const handleFacebook = async () => {
  try {
    await HandleloginFacebook();
  } catch (error) {
    console.log("error happen while login", error);
  }
};

const Login = () => {
  const router = useRouter();
  const [loginChoice, setLoginChoice] = useState<"email" | "phone">("email");
  const [loading, setLoading] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  // Enhanced validation schema with proper type checking
  const validationSchema = Yup.object().shape({
    email: Yup.string().when("loginChoice", {
      is: "email",
      then: (schema) =>
        schema
          .email("Please enter a valid email address")
          .required("Email is required")
          .max(100, "Email should not exceed 100 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),
    phone: Yup.string().when("loginChoice", {
      is: "phone",
      then: (schema) =>
        schema.required("Phone number is required").matches(/^\+?[0-9\s-]{6,}$/, "Invalid Phone number"),
      otherwise: (schema) => schema.notRequired(),
    }),
    password: Yup.string().required("Password is required").min(10, "Password must be at least 10 characters"),
    loginChoice: Yup.string().oneOf(["email", "phone"]).required("Login method is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      password: "",
      loginChoice: "email",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading("loading");
      setError(null);
      try {
        const identifier = loginChoice === "email" ? values.email : values.phone;
        if (!identifier) {
          throw new Error("Please provide a valid email or phone number");
        }
        const result = await login(identifier, values.password, loginChoice);
        if (result.success) {
          router.push("/");
        }
      } catch (err: unknown) {
        setError(error);
        console.error("Login error:", err);

      } finally {
        setLoading("idle");
        resetForm();
      }
    },
  });

  const handleLoginChoiceChange = (choice: "email" | "phone") => {
    setLoginChoice(choice);
    formik.setFieldValue("loginChoice", choice);
    // Clear the unused field
    if (choice === "email") {
      formik.setFieldValue("phone", "");
    } else {
      formik.setFieldValue("email", "");
    }
  };
  // handle Auth By facebook & google
  const socialButtons = getDefaultSocialButtons({
    facebook: handleFacebook,
    google: handleGoogle,
  });

  return (
    <div className={`${loginStyles.container}`}>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className={loginStyles.loginMainContent}>
        {/* Left Section */}
        <div className={`${loginStyles.leftSectionStyle} `}>
          <div className="flex flex-col items-start justify-start">
            <h1 className={`${loginStyles.WelcomeMessage} `}>Hi, Welcome 😊</h1>
            <p className="text-lg font-medium text-gray-60">{LoginMsg}</p>
          </div>
          <div className={loginStyles.leftSectionImg}>
            <Image
              src="/assets/images/HD_Logo/HD_Logo.png"
              alt="HD Logo"
              width={190}
              height={190}
              priority
              className="object-contain"
              style={{ height: "auto", width: "auto" }}
            />

            <h2 className={loginStyles.leftSectionHeading}>Halla Deals</h2>
          </div>
        </div>

        {/* Right Section */}
        <div className={`${loginStyles.rightSectionStyle} `}>
          <h2 className="text-2xl font-bold mb-6 text-gray-80">Login to your account</h2>

          <div className={loginStyles.loginChoice}>
            <Button
              className={`${loginStyles.LoginChoiceBtn} ${
                loginChoice === "email" ? "bg-green-10" : "bg-transparent"
              } transition-colors`}
              onClick={() => handleLoginChoiceChange("email")}
              type="button"
            >
              <FiMail size={18} />
              login with email
            </Button>
            <Button
              className={`${loginStyles.LoginChoiceBtn} ${
                loginChoice === "phone" ? "bg-green-10" : "bg-transparent"
              } transition-colors`}
              onClick={() => handleLoginChoiceChange("phone")}
              type="button"
            >
              <FiPhone size={18} />
              login with mobile
            </Button>
          </div>

          <form onSubmit={formik.handleSubmit} className={loginStyles.formStyle}>
            {/* Email/Phone Field */}
            <div className="w-full">
              {loginChoice === "email" ? (
                <TextInput
                  id="email"
                  label="Email"
                  name="email"
                  autocomplete="email"
                  type="email"
                  placeholder="e.g. hello@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email ? formik.errors.email : undefined}
                  touched={formik.touched.email}
                />
              ) : (
                <div className="w-full">
                  <label htmlFor="phone" className={loginStyles.labelStyle}>
                    Phone Number
                  </label>
                  <PhoneInput
                    inputProps={{
                      className: "px-2 w-full bg-transparent outline-none",
                      name: "phone",
                    }}
                    preferredCountries={["eg"]}
                    defaultCountry="eg"
                    placeholder="Enter your phone number"
                    value={formik.values.phone}
                    onChange={(phone) => formik.setFieldValue("phone", phone)}
                    onBlur={() => formik.setFieldTouched("phone", true)}
                    className={`${loginStyles.phoneInput} ${
                      formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-30"
                    }`}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
                  )}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full  ">
              <TextInput
                label="Password"
                id="password"
                name="password"
                type="password"
                autocomplete="password"
                placeholder="10+ characters"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password ? formik.errors.password : undefined}
                touched={formik.touched.password}
              />
            </div>
            {error && (
              <div className="w-full mb-4">
                <HandleError error={error} />
              </div>
            )}

            <div className="w-full">
              <Link href="/auth/forgot" className={loginStyles.forgetPassword}>
                Forgot Password?
              </Link>
            </div>

            <Button
              className={`w-full py-3 mb-3 rounded-lg ${loading === "loading" ? "opacity-75 cursor-not-allowed" : ""}`}
              type="submit"
              variant="btn-primary"
              disabled={!formik.isValid || loading == "loading"}
              submitStatus={loading}
            >
              <div className="flex items-center justify-center gap-2">
                <CiLock size={18} />
                Login
              </div>
            </Button>
          </form>
          <div className={loginStyles.socialLoginStyle}>
            <div className="relative flex justify-center">
              <span className="font-semibold text-gray-80 text-base">OR</span>
            </div>
            <SocialLoginButtons socialmediaLinks={socialButtons} />
          </div>
          <div className="text-sm text-gray-90  text-center my-2">
            <p className="font-semibold">
              Dont have an account?
              <Link href="/auth/signup/AccountType" className={loginStyles.signUpLink}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
