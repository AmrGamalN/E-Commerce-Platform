"use client";
import React, { useState } from "react";
import { OtpInputStyles } from "./classNames";
import Paragraph from "@/components/UI/Paragraph";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/Input-Otp/input-otp";
import Button from "@/components/UI/Button";
import Image from "next/image";
import { toast } from "sonner";
import Head from "next/head";
import { formatTime } from "@/utils/FormatTime";
import { useCountdownTimer } from "@/Hooks/useCountdownTimer";

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  // Countdown timer
  useCountdownTimer({ timeLeft, setTimeLeft, setIsResendDisabled });

  const resendOTP = () => {
    toast.success("New verification code sent!");
    setTimeLeft(10 * 60);
    setIsResendDisabled(true);
    setVerificationError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResendDisabled(false);
    setIsSubmitting(true);
    setIsWrong(true);
    setVerificationError("Wrong code , please try again");

    // Simulate verification process
    setTimeout(() => {
      if (otp.length === 6) {
        toast.success("Phone number verified successfully!");
      } else {
        setVerificationError("Please enter a valid 6-digit code");
      }
      setIsSubmitting(false);
    }, 1000);
  };
  return (
    <>
      <Head>
        <title>Verify Your Phone Number | Halla Deals</title>
        <meta name="description" content="Verify your phone number to continue" />
      </Head>

      <div className={OtpInputStyles.container}>
        <div className="flex flex-col items-center justify-center ">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/HD_Logo/HD_Logo.png"
              alt="Halla Deals Logo"
              width={40}
              height={40}
              priority
              className="h-auto w-auto"
            />
            <h1 className="text-3xl font-bold text-gray-900">Halla Deals</h1>
          </div>

          {/* Verification Form */}
          <div className={OtpInputStyles.content}>
            <div className="space-y-1 text-center">
              <h1 className={OtpInputStyles.verifyHeading}>Verify your phone number</h1>
              <Paragraph size="sm" color="darkGray" className="font-medium">
                We sent an SMS with an activation code <br />
                to <span className="font-semibold ml-1">+201069137667</span>
              </Paragraph>
            </div>

            <form onSubmit={handleSubmit} className="">
              {/* OTP Input */}
              <div className="flex flex-col items-center justify-center space-y-2 my-4">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} index={index} slotData={slot} codeStatus={isWrong} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
                {verificationError && (
                  <Paragraph size="sm" color="error" className="text-center mt-2">
                    {verificationError}
                  </Paragraph>
                )}
              </div>

              {/* Resend Code Section */}
              <div className="flex flex-col items-center justify-center">
                {isResendDisabled ? (
                  <div className="flex items-center gap-2">
                    <Paragraph size="sm" color="darkGray" className="font-semibold text-gray-80">
                      Send code again
                    </Paragraph>
                    <span className={OtpInputStyles.timeLeftCounter}>{formatTime(timeLeft)}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Paragraph size="sm" color="darkGray" className="font-sembold">
                      Didn&#39;t receive code?
                    </Paragraph>
                    <button
                      type="button"
                      onClick={resendOTP}
                      className={OtpInputStyles.ResendButton}
                      aria-label="change Phone number"
                    >
                      change Phone number
                    </button>
                    <Paragraph size="sm" color="darkGray" className="font-sembold">
                      or
                    </Paragraph>
                    <button
                      type="button"
                      onClick={resendOTP}
                      className={OtpInputStyles.ResendButton}
                      aria-label="Resend verification code"
                    >
                      Resend
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant={otp?.length !== 6 ? "btn-cancel" : "btn-primary"}
                disabled={otp?.length !== 6}
                className={`w-full my-2 font-medium ${otp?.length !== 6 ? "bg-gray-40 !text-gray-90" : ""}`}
              >
                {isSubmitting ? "Verifying..." : "Verify Phone Number"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerificationPage;
