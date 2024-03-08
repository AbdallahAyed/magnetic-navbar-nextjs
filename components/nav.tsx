"use client";

import { usePathname } from "next/navigation";
import {
  motion,
  MotionValue,
  useMotionValue,
  AnimatePresence,
  useTransform,
  color,
} from "framer-motion";

import { cn } from "@/lib/utils";

export function Nav() {
  const links = [
    {
      path: "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app",
      name: "Docs",
    },
    {
      path: "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
      name: "Learn",
    },
    {
      path: "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app",
      name: "Templates",
    },
    {
      path: "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app",
      name: "Deploy",
    },
  ];

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
    console.log(xRange, yRange);
  };

  return (
    <nav className="p-8">
      <ul className="flex gap-32 justify-center">
        <AnimatePresence>
          {links.map((link) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            const textX = useTransform(x, (latest) => latest * 0.6);
            const textY = useTransform(y, (latest) => latest * 0.5);
            return (
              <motion.li
                onPointerMove={(event) => {
                  const item = event.currentTarget;
                  setTransform(item, event, x, y);
                }}
                key={link.path}
                onPointerLeave={(event) => {
                  x.set(0);
                  y.set(0);
                }}
                style={{ x, y }}
              >
                <motion.a
                  className={cn(
                    "font-medium relative rounded-md text-lg py-2 px-4 transition-all duration-500 ease-out hover:bg-slate-200"
                  )}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span
                    style={{ x: textX, y: textY }}
                    className="z-10 absolute text-neutral-900"
                  >
                    {link.name}
                  </motion.span>
                  {/* {pathname === link.path ? (
                    <motion.div
                      transition={{ type: "spring" }}
                      layoutId="underline"
                      className="absolute w-[250%] h-full rounded-md left-0 bottom-0 bg-blue-300"
                    ></motion.div>
                  ) : null} */}
                </motion.a>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </nav>
  );
}
