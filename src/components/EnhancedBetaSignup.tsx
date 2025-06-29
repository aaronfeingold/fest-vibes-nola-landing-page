"use client";

import { useState } from "react";
import { EnhancedEmailInput } from "./ui/enhanced-email-input";
import DonationModal from "./ui/donation-modal";
import { Button } from "./ui/button";
import { emailSchema } from "../lib/validation";
import { z } from "zod";

interface EnhancedBetaSignupProps {
  onClose: () => void;
}

export default function EnhancedBetaSignup({
  onClose,
}: EnhancedBetaSignupProps) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateEmail = (emailValue: string) => {
    try {
      emailSchema.parse(emailValue);
      setEmailError("");
      setIsValidEmail(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0]?.message || "Invalid email");
      }
      setIsValidEmail(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setApiError("");
    if (value.trim()) {
      validateEmail(value);
    } else {
      setEmailError("");
      setIsValidEmail(false);
    }
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail || !email.trim()) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Show donation modal after email validation
    setShowDonationModal(true);
  };

  const handleDonationAccept = async () => {
    setShowDonationModal(false);
    await submitSignup(true, true);
  };

  const handleDonationDecline = async () => {
    setShowDonationModal(false);
    await submitSignup(false, true);
  };

  const submitSignup = async (
    wantsDonation: boolean,
    hasSeenDonationModal: boolean
  ) => {
    setIsSubmitting(true);
    setApiError("");

    try {
      const response = await fetch("/api/beta-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          wantsDonation,
          hasSeenDonationModal,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setApiError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setApiError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="text-4xl mb-4">🎉</div>
        <p className="text-white font-semibold">You're on the list!</p>
        <p className="text-gray-300 text-sm">
          We'll notify you when Fest Vibes launches.
        </p>
        {showDonationModal && (
          <p className="text-purple-300 text-sm mt-2">
            Thanks for supporting Fest Vibes! You'll get 2 free months. 🎵
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleInitialSubmit} className="space-y-4">
        <div>
          <EnhancedEmailInput
            value={email}
            onChange={handleEmailChange}
            onValidChange={setIsValidEmail}
            placeholder="Enter your email"
            disabled={isSubmitting}
            error={emailError}
          />
        </div>

        {apiError && <p className="text-red-300 text-sm">{apiError}</p>}

        <Button
          type="submit"
          disabled={!isValidEmail || isSubmitting}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
        >
          {isSubmitting ? "Processing..." : "Join Beta List"}
        </Button>
      </form>

      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        onAccept={handleDonationAccept}
        onDecline={handleDonationDecline}
        email={email}
      />
    </>
  );
}
