"use client";
import React, { useState } from "react";
import Image from "next/image";
import Paragraph from "@/components/UI/Paragraph";
import Button from "@/components/UI/Button";
import { IoIosSend } from "react-icons/io";
import { MdMailLock } from "react-icons/md";
import { toast } from "sonner";
import { confirmEmailStyls } from "./classNames";
import Head from "next/head";
import { formatTime } from "@/utils/FormatTime";
import { useCountdownTimer } from "@/Hooks/useCountdownTimer";

const ConfirmEmail = () => {
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  // count down
  useCountdownTimer({ timeLeft, setTimeLeft, setIsResendDisabled });

  // open mail app
  const openEmailApp = () => {
    window.location.href = "mailto:";
  };

  // resend new Link
  const resendLink = () => {
    toast.success("Verification link resent!");
    setTimeLeft(10 * 60);
    setIsResendDisabled(true);
  };
  return (
    <>
      <Head>
        <title>Verify Your Phone Number | Halla Deals</title>
        <meta name="description" content="Verify your phone number to continue" />
      </Head>
      <div className={confirmEmailStyls.container}>
        <div className="flex items-center justify-center gap-1">
          <Image
            src="/assets/images/HD_Logo/HD_Logo.png"
            alt="HD Logo"
            width={20}
            height={20}
            sizes="20"
            style={{ height: "auto", width: "auto" }}
          />
          <h1 className="text-4xl tracking-tight font-bold text-gray-90 mt-1"> Halla Deals</h1>
        </div>
        <div className={confirmEmailStyls.emailSentContainer}>
          <div className={confirmEmailStyls.content}>
            <div className="rounded-full overflow-hidden  ">
              <Image
                src="/assets/images/confirmEmail/mail.png"
                alt="email img"
                width={40}
                height={40}
                sizes="40"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <h1 className={confirmEmailStyls.checkEmailHeading}>Check your email</h1>
          </div>
          <div className={confirmEmailStyls.emailSent}>
            <Paragraph
              size="sm"
              align="center"
              color="darkGray"
              className="font-semibold w-full text-left leading-relaxed"
            >
              Your application will be submitted once you verify your email address.
              <br />
              We have sent the verification link to your email. It expires in :
            </Paragraph>
          </div>

          <div className="flex flex-row items-center justify-center">
            <span className={confirmEmailStyls.timeLeftCounter}>{formatTime(timeLeft)}</span>
          </div>
          <div className="mt-6 flex flex-col md:flex-row gap-2 items-center justify-center">
            <Button
              type="button"
              variant="btn-cancel"
              disabled={isResendDisabled}
              className="font-semibold"
              onClick={() => resendLink()}
            >
              <IoIosSend size={16} />
              Resend verification link
            </Button>
            <Button type="button" variant="btn-primary" className="font-semibold" onClick={openEmailApp}>
              <MdMailLock size={16} />
              Access Your Inbox
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmEmail;
