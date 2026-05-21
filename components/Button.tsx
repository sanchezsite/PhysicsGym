"use client";

import React from "react";
import { motion } from "framer-motion";

export function Button({
  children,
  variant = "solid",
  className = "",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45";

  const styles =
    variant === "solid"
      ? "bg-yellow-400 text-red-950 shadow-lg shadow-yellow-950/20 hover:bg-yellow-300"
      : variant === "outline"
        ? "border border-yellow-300/50 bg-red-950/40 text-yellow-100 hover:border-yellow-300 hover:bg-red-900/50"
        : "text-yellow-100/80 hover:bg-yellow-400/10 hover:text-yellow-50";

  return (
    <motion.button
      whileHover={disabled ? undefined : { y: -3, scale: 1.025 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}