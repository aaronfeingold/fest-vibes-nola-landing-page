"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./button";

interface VenmoDonationLinkProps {
  username: string;
  amount: number;
  note: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const VenmoDonationLink: React.FC<VenmoDonationLinkProps> = ({
  username,
  amount,
  note,
  className,
  children,
  onClick,
}) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return false;
      const userAgent = navigator.userAgent || navigator.vendor;
      return /android|iphone|ipad|ipod/i.test(userAgent.toLowerCase());
    };

    setIsMobile(checkMobile());
  }, []);

  const handleClick = () => {
    // Construct the Venmo URL with payment parameters
    const encodedNote = encodeURIComponent(note);
    const venmoUrl = `https://venmo.com/u/${username}?txn=pay&amount=${amount}&note=${encodedNote}`;

    if (isMobile) {
      // Try deep link first, fallback to web
      const deepLinkUrl = `venmo://paycharge?txn=pay&recipients=${username}&amount=${amount}&note=${encodedNote}`;

      // Attempt to open the app
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = deepLinkUrl;
      document.body.appendChild(iframe);

      // Fallback to web after short delay
      setTimeout(() => {
        document.body.removeChild(iframe);
        window.open(venmoUrl, "_blank");
      }, 1000);
    } else {
      // Desktop: open web version
      window.open(venmoUrl, "_blank");
    }

    // Call the onClick callback if provided
    onClick?.();
  };

  return (
    <Button onClick={handleClick} className={className}>
      {children}
    </Button>
  );
};

export default VenmoDonationLink;
