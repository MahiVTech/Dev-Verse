import { type HTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  glow?: "cyan" | "violet" | "none";
  as?: "div";
  padding?: "none" | "sm" | "md" | "lg";
}

const PADDING: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export default function Card({
  children,
  hover = false,
  glow = "none",
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={
        hover ? { y: -4, transition: { duration: 0.2 } } : undefined
      }
      className={clsx(
        "glass rounded-2xl relative overflow-hidden",
        hover && "cursor-pointer transition-shadow duration-300 hover:shadow-[0_8px_32px_-8px_rgba(0,229,255,0.25)]",
        glow === "cyan" && "shadow-[0_0_0_1px_rgba(0,229,255,0.15)]",
        glow === "violet" && "shadow-[0_0_0_1px_rgba(108,99,255,0.15)]",
        PADDING[padding],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
