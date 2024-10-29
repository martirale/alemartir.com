"use client";

import { useState, useEffect, useCallback } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  const updatePosition = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const updateCursorType = useCallback((e) => {
    const target = e.target;
    const interactiveElements = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"];
    const isInteractive =
      interactiveElements.includes(target.tagName) ||
      target.onclick ||
      window.getComputedStyle(target).cursor === "pointer" ||
      target.closest(
        'a[href], button, [role="button"], [tabindex]:not([tabindex="-1"])'
      );

    setIsPointer(isInteractive);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseover", updateCursorType);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", updateCursorType);
    };
  }, [updatePosition, updateCursorType]);

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: "2px solid black",
        backgroundColor: isPointer ? "black" : "transparent",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "background-color 0.3s ease",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
