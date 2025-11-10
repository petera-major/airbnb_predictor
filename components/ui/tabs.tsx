"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Main Tabs wrapper
export function Tabs({
  defaultValue,
  children,
  className,
}: {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = React.useState(defaultValue);

  const tabs = React.Children.toArray(children).filter(
    (child: any) => child.type.displayName === "TabsTrigger"
  );
  const contents = React.Children.toArray(children).filter(
    (child: any) => child.type.displayName === "TabsContent"
  );

  return (
    <div className={cn("w-full", className)}>
      {/* TabsList (optional) */}
      <div className="flex flex-col gap-2">{tabs}</div>

      {/* Active content */}
      <div className="mt-4">
        {contents.map((child: any) =>
          child.props.value === active
            ? React.cloneElement(child, { active })
            : null
        )}
      </div>
    </div>
  );
}

// Optional grouping element for better readability
export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex gap-2", className)}>{children}</div>;
}

// Tab Button
export function TabsTrigger({
  value,
  children,
  active,
  onClick,
  className,
}: {
  value: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <button
      onClick={() => {
        setIsActive(true);
        if (onClick) onClick();
      }}
      className={cn(
        "flex-1 rounded-lg px-4 py-2 text-sm font-medium border transition-all",
        active || isActive
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow"
          : "bg-white text-gray-700 border-gray-300 hover:border-purple-400",
        className
      )}
    >
      {children}
    </button>
  );
}
TabsTrigger.displayName = "TabsTrigger";

// Content for each tab
export function TabsContent({
  value,
  children,
  active,
  className,
}: {
  value: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        active ? "block" : "hidden",
        "transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
TabsContent.displayName = "TabsContent";
