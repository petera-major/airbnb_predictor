"use client";
import * as React from "react";

export function Slider({
  value,
  onValueChange,
  min,
  max,
  step,
  className,
}: {
  value: number[];
  onValueChange: (v: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([parseFloat(e.target.value)]);
  };

  return (
    <input
      type="range"
      value={value[0]}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      className={`w-full accent-purple-500 ${className}`}
    />
  );
}
