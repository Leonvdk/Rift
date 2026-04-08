"use client"

import Link from "next/link"
import { useState } from "react"

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-50 flex items-center justify-between px-6 py-3 md:px-12 md:py-4">
      <Link href="/" aria-label="Rift — Home">
        <svg
          viewBox="0 0 1500 1500"
          className="h-18 w-auto md:h-20 -my-2 md:-my-3"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M331.2,767.55v-79.42c-62.8,17.55-108.05,36.94-114.52,39.71v6.46l51.72,24.01v273.36l-55.41,38.79v5.54h191.17v-5.54l-72.96-37.86v-241.96c32.32-28.63,71.11-40.63,92.35-40.63,19.39,0,36.94,7.39,44.33,10.16l21.24-61.88c-8.31-2.77-29.55-9.23-48.02-9.23s-49.87,16.62-109.9,78.5Z"
          />
          <path
            fill="currentColor"
            d="M604.55,572.68c21.24,0,38.79-16.62,38.79-38.79s-17.55-38.79-38.79-38.79-38.79,16.62-38.79,38.79,17.55,38.79,38.79,38.79Z"
          />
          <path
            fill="currentColor"
            d="M640.57,688.12c-63.72,17.55-117.29,39.71-114.52,39.71v5.54l51.72,24.94v273.36l-55.41,38.79v5.54h174.55v-5.54l-56.33-38.79v-343.55Z"
          />
          <path
            fill="currentColor"
            d="M1262.08,741.69l24.94-37.87h-.62l.62-.92h-179.16v-55.41l-74.51,56.33h-179.45v-82.19c0-121.91,70.19-173.62,118.21-173.62,32.32,0,63.72,13.85,92.35,29.55l24.01-52.64c-15.7-4.62-44.33-9.23-78.5-9.23-125.6,0-218.87,105.28-218.87,242.89v44.33l-58.18,32.32v6.46h58.18v289.99l-56.34,38.79v5.54h194.87v-5.54l-75.73-43.41v-285.37h191.16v248.43c0,41.56,26.78,94.2,108.98,94.2,52.64,0,90.5-24.94,115.44-50.79l-3.7-6.47c-18.47,10.16-48.02,18.47-80.35,18.47-51.72,0-77.58-32.32-77.58-70.19v-233.65h154.23Z"
          />
        </svg>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden gap-6 pt-1 text-sm md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-opacity hover:opacity-60"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="pt-1 md:hidden"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <div className="flex w-6 flex-col gap-1.5">
          <span
            className={`block h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </div>
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-cream/98 backdrop-blur-sm md:hidden">
          <nav className="flex flex-col gap-8 px-6 pt-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-3xl font-light transition-opacity hover:opacity-60"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
