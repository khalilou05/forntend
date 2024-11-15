"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const MyComponent = () => {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isNavigationConfirmed, setIsNavigationConfirmed] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Current route path

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      if (isFormDirty && !isNavigationConfirmed) {
        const userConfirmed = window.confirm(
          "You have unsaved changes. Do you really want to leave?"
        );
        if (!userConfirmed) {
          // If the user cancels, prevent navigation
          router.push(pathname); // Stay on the current page
          return false;
        } else {
          // If the user confirms, allow navigation
          setIsNavigationConfirmed(true); // Set navigation as confirmed
          return true;
        }
      }
      return true; // Allow navigation if the form is not dirty or user confirms
    };

    // Listen to pathname changes
    handleRouteChange(pathname); // Check on initial render

    const onBeforeUnload = () => {
      if (isFormDirty) {
        return "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    // Add beforeunload event listener for browser navigation
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload); // Cleanup on unmount
    };
  }, [isFormDirty, isNavigationConfirmed, pathname, router]);

  const handleFormChange = () => {
    setIsFormDirty(true); // Set form as dirty when changes are made
    setIsNavigationConfirmed(false); // Reset navigation confirmation state
  };

  return (
    <form onChange={handleFormChange}>
      <input type="text" placeholder="Type something..." />
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log(window.history.state);
        }}>
        khalil
      </button>
      <Link href={"/login"}>go</Link>
    </form>
  );
};

export default MyComponent;
