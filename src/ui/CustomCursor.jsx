"use client";

import { useState, useEffect, useCallback } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isYellowZone, setIsYellowZone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const updateDeviceType = (e) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", updateDeviceType);
    return () => mediaQuery.removeEventListener("change", updateDeviceType);
  }, []);

  const updatePosition = useCallback((e) => {
    const { clientX, clientY } = e;
    setPosition({ x: clientX, y: clientY });

    // Verificar si el cursor está dentro de los límites de la ventana
    const isWithinBounds =
      clientX >= 0 &&
      clientX <= window.innerWidth &&
      clientY >= 0 &&
      clientY <= window.innerHeight;

    setIsVisible(isWithinBounds);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
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

    const hasYellowCursor = target.closest(".yellow-cursor") !== null;

    setIsPointer(isInteractive);
    setIsYellowZone(hasYellowCursor);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseover", updateCursorType);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", updateCursorType);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDesktop, updatePosition, updateCursorType, handleMouseLeave]);

  if (!isDesktop || !isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: `2px solid ${isYellowZone ? "yellow" : "black"}`,
        backgroundColor: isPointer
          ? isYellowZone
            ? "yellow"
            : "black"
          : "transparent",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "background-color 0.3s ease, border-color 0.3s ease",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
