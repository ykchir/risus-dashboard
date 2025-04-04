"use client";

import { useState, useEffect } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if screen size is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkIsMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return isMobile;
}
