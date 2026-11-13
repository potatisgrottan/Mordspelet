"use client";
import { useEffect } from "react";

/** Best-effort back-button guard. Server redirects remain the real access control. */
export default function RoleLock() {
  useEffect(() => {
    const marker = { graddnosLocked: true };
    window.history.pushState(marker, "", window.location.href);
    function onBack() {
      window.history.pushState(marker, "", window.location.href);
    }
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, []);
  return null;
}
