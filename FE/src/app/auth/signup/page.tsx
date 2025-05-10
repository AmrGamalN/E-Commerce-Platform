"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
// Import reusable components
import TextInput from "@/components/UI/TextInput";
import Button from "@/components/UI/Button";
// Import icons
import { signupStyles } from "./classNames";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";
import { HandleRegisterFacebook, HandleRegisterWithGoogle, signUp } from "@/services/authService";
import { useRouter } from "next/navigation";
import { HandleError } from "@/utils/HandleError";
import Header from "@/components/Header";
import { SignUpMsg } from "@/constants/content";
import { FaCheck, FaTimes } from "react-icons/fa";
import { getDefaultSocialButtons } from "@/components/SocialLoginButtons/socialLoginData";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// handle social Auth
const handleGoogle = async () => {
  try {
    await HandleRegisterWithGoogle();
  } catch (error) {
    console.log("error happen while register", error);
  }
};

const handleFacebook = async () => {
  try {
    await HandleRegisterFacebook();
  } catch (error) {
    console.log("error happen while register", error);
  }
}; // social Login
const socialButtons = getDefaultSocialButtons({
  facebook: handleFacebook,
  google: handleGoogle,
});
// get account type from url
const getQueryParam = (param: string): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const query = new URLSearchParams(window.location.search);
  const value = query.get(param);
  return value;
};
const Signup = () => {
  const router = useRouter();
  const accountType = getQueryParam("accountType");
  // State for loading and error
  const [loading, setLoading] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);
  const passwordRules = [
    {
      id: 1,
      text: "At least 10 characters",
      validator: (password: string) => password.length >= 10,
    },
    {
      id: 2,
      text: "At least one uppercase letter",
      validator: (password: string) => /[A-Z]/.test(password),
    },
    {
      id: 3,
      text: "At least one lowercase letter",
      validator: (password: string) => /[a-z]/.test(password),
    },
    {
      id: 4,
      text: "At least one number",
      validator: (password: string) => /\d/.test(password),
    },
    {
      id: 5,
      text: "At least one special character",
      validator: (password: string) => /[@$!%*?&]/.test(password),
    },
  ];
  // Formik setup with validation schema
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      terms: false,
      accountType: accountType,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .test("valid-password", "Password does not meet the requirements", (password) => {
          if (!password) return false;
          return passwordRules.every((rule) => rule.validator(password));
        }),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      phoneNumber: Yup.string()
        .nullable() // Allows null and empty string values
        .notRequired() // Phone number is optional
        .test("is-valid-phone", "Invalid Phone number", (value) => {
          if (!value) return true;
          const countryCode = /^\+\d{1,4}$/;
          console.log("value", value, countryCode.test(value));
          if (countryCode.test(value)) {
            return true;
          }

          const phoneRegex = /^\+?[0-9\s-]{6,}$/;

          // Return true if phone number matches the regex
          return phoneRegex.test(value);
        }),
      terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    }),
    onSubmit: async (values) => {
      setLoading("loading");
      setError(null);
      try {
        const result = await signUp(values);
        if (result) {
          router.push("/auth/login");
        }
        // Redirect or show success message here
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error during signup:", err);
        } else {
          setError("An unknown error occurred");
          console.error("Error during signup:", err);
        }
      } finally {
        setLoading("idle");
      }
    },
  });

  // console.log("formik", formik, formik.values);

  return (
    <div className={signupStyles.container}>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className={signupStyles.signupMainContentStyle}>
        {/* Left Section */}
        <div className={`${signupStyles.leftSectionStyle} `}>
          <div className="flex flex-col items-start justify-start">
            <h1 className={`${signupStyles.WelcomeMessage} `}>Join us Now 😊</h1>
            <p className="text-lg font-medium text-gray-60">{SignUpMsg}</p>
          </div>
          <div className={signupStyles.leftSectionImg}>
            <Image
              src="/assets/images/HD_Logo/HD_Logo.png"
              alt="HD Logo"
              width={190}
              height={190}
              priority
              className="object-contain"
            />
            <h2 className={signupStyles.leftSectionHeading}>Halla Deals</h2>
          </div>
        </div>
        {/* Right Section */}
        <div className={signupStyles.formSection}>
          <h2 className="text-2xl font-bold  text-gray-80 text-left capitalize mb-4">Sign Up</h2>
          {/* Social Signup Options */}
          <form onSubmit={formik.handleSubmit} className="w-full grid grid-cols-1 gap-4">
            {/* Name and Username in the same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <TextInput
                  label="First Name"
                  name="firstName"
                  id="firstName"
                  type="text"
                  autocomplete="given-name"
                  placeholder="e.g user"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.firstName}
                  touched={formik.touched.firstName}
                  mandatory={true}
                />
              </div>
              <div>
                <TextInput
                  label="Last Name"
                  name="lastName"
                  id="lastName"
                  type="text"
                  autocomplete="family-name"
                  placeholder="e.g user"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.lastName}
                  touched={formik.touched.lastName}
                  mandatory={true}
                />
              </div>
            </div>

            {/* Gender and Phone in the same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="w-full">
                  <label htmlFor="phone" className={signupStyles.labelStyle}>
                    Phone Number
                  </label>
                  <PhoneInput
                    inputProps={
                      {
                        className: "px-2 w-full bg-transparent outline-none border-none",
                        name: "phoneNumber",
                      } as React.HTMLProps<HTMLInputElement>
                    }
                    preferredCountries={["eg"]}
                    defaultCountry="eg"
                    placeholder="Enter your phone number"
                    value={formik.values.phoneNumber}
                    onChange={(phoneNumber) => {
                      formik.setFieldValue("phoneNumber", phoneNumber);
                    }}
                    onBlur={() => formik.setFieldTouched("phoneNumber", true)}
                    className={`${signupStyles.phoneInput} ${
                      formik.touched.phoneNumber && formik.errors.phoneNumber ? "border-red-500" : "border-gray-30"
                    }`}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.phoneNumber}</p>
                  )}
                </div>
              </div>
              <div>
                <TextInput
                  label="Email"
                  name="email"
                  autocomplete="email"
                  id="email"
                  type="email"
                  placeholder="e.g user@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                  mandatory={true}
                />
              </div>
            </div>

            {/* Password and Confirm Password in the same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <TextInput
                  label="Password"
                  name="password"
                  id="password"
                  type="password"
                  autocomplete="new-password"
                  placeholder="10+ characters"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.password}
                  mandatory={true}
                />
              </div>
              <div>
                <TextInput
                  label="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autocomplete="new-password"
                  type="password"
                  placeholder="10+ characters"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.confirmPassword}
                  touched={formik.touched.confirmPassword}
                  mandatory={true}
                />
              </div>
              {/* display password rules */}
              <div>
                {formik.values.password && (
                  <div className="space-y-1">
                    {passwordRules.map((rule) => {
                      const isValid = rule.validator(formik.values.password);
                      return (
                        <div key={rule.id} className="flex items-center">
                          {isValid ? (
                            <FaCheck size={12} className="text-green-500 mr-2" />
                          ) : (
                            <FaTimes size={12} className="text-red-500 mr-2" />
                          )}
                          <span className={`text-sm ${isValid ? "text-green-500" : "text-red-500"}`}>{rule.text}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="w-full">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="mr-2"
                  checked={formik.values.terms}
                  onChange={(e) => formik.setFieldValue("terms", e.target.checked)}
                  onBlur={formik.handleBlur}
                />

                <span className="text-sm text-gray-70 font-medium">
                  I agree to the &nbsp;
                  <Link href="/terms" className="text-gray-80 hover:underline">
                    Terms and Conditions
                  </Link>
                  <span className="text-red-500"> *</span>
                </span>
              </label>
              {formik.errors.terms && formik.touched.terms && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.terms}</div>
              )}
            </div>
            {/* Submit Button */}
            <div className="w-full flex justify-start">
              <Button
                className=" font-medium px-4"
                type="submit"
                variant="btn-primary"
                disabled={!formik.isValid || formik.isSubmitting || loading == "loading"}
                submitStatus={loading}
              >
                Sign up
              </Button>
            </div>
            {/* Error Message */}

            <div className="flex items-center justify-start w-full">{error && <HandleError error={error} />}</div>
          </form>
          <div className="relative flex justify-center">
            <span className="font-semibold text-gray-80 text-base">OR</span>
          </div>
          <div className={signupStyles.socialLoginStyle}>
            <SocialLoginButtons socialmediaLinks={socialButtons} />
          </div>
          {/* Already have an account? */}
          <div className="text-sm text-gray-70   text-center font-medium">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="hover:text-gray-80 underline hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
