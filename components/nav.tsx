"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <nav className="p-8">
      <ul className="flex gap-12">
        {links.map((link) => {
          return (
            <motion.li key={link.path}>
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
