"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, MotionValue, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

export function Nav() {
  const links = [
    {
      path: "/",
      name: "home",
    },
    {
      path: "/projects",
      name: "projects",
    },
    {
      path: "/contact",
      name: "contact",
    },
  ];

  const pathname = usePathname();
  const MotionLink = motion(Link);

  const mapRange = (
    inputLower: number,
    inputUpper: number,
    outputLower: number,
    outputUpper: number
  ) => {
    const INPUT_RANGE = inputUpper - inputLower;
    const OUTPUT_RANGE = outputUpper - outputLower;

    return (value: number) =>
      outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
  };

  const setTransform = (
    item: HTMLElement & EventTarget,
    event: React.PointerEvent,
    x: MotionValue,
    y: MotionValue
  ) => {
    const bounds = item.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;

    const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
    const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);

    x.set(xRange * 10);
    y.set(yRange * 10);
    console.log(xRange);
  };

  return (
    <nav className="p-8">
      <ul className="flex gap-12">
        {links.map((link) => {
          const x = useMotionValue(0);
          const y = useMotionValue(0);

          return (
            <motion.li
              key={link.path}
              onPointerMove={(event) => {
                const item = event.currentTarget;
                setTransform(item, event, x, y);
              }}
              style={{ x, y }}
            >
              <MotionLink
                href={link.path}
                className={cn(
                  "font-medium rounded-md text-sm py-2 px-4 transition-all duration-500 ease-out hover:bg-slate-200",
                  pathname === link.path ? "bg-slate-300" : ""
                )}
              >
                <span>{link.name}</span>
              </MotionLink>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}
