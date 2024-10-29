"use client";

import { useState, useEffect, useCallback } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isYellowZone, setIsYellowZone] = useState(false);

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

    // Verificar si el elemento o alguno de sus padres tiene la clase yellow-cursor
    const hasYellowCursor = target.closest(".yellow-cursor") !== null;

    setIsPointer(isInteractive);
    setIsYellowZone(hasYellowCursor);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseover", updateCursorType);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", updateCursorType);
    };
  }, [isDesktop, updatePosition, updateCursorType]);

  if (!isDesktop) return null;

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
