import Link from "next/link"
import { CopyEmail } from "./copy-email"

export function Footer() {
  return (
    <footer className="mt-auto pt-24 pb-8 md:pt-32 md:pb-10">
      <div className="rift-container flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-end gap-4">
          {/* Rift starburst mark */}
          <svg
            viewBox="0 0 1500 1500"
            className="h-9 w-9 shrink-0 text-aubergine"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M756.32,814.76l-3.43.34h0s-2.39-.01-2.39-.01l-3.43-.37-7.95,74.01-1.83,370.01c4.36.11,8.73.17,13.11.17,3.78,0,7.55-.06,11.32-.14l1.81-370.27-7.21-73.73Z"
            />
            <path
              fill="currentColor"
              d="M730.52,811.32l-3.31-1-2.2-.92h0s-3.03-1.65-3.03-1.65l-35.66,65.34-143.51,341.68c7.42,3.32,14.93,6.47,22.53,9.43l143.62-342,21.55-70.88Z"
            />
            <path
              fill="currentColor"
              d="M707.99,798.29l-2.67-2.19h0s-1.68-1.7-1.68-1.7h0s-2.16-2.68-2.16-2.68l-57.95,46.71-263.03,260.45-.33.33c5.59,5.92,11.32,11.71,17.19,17.36l263.6-261.03,47.04-57.24Z"
            />
            <path
              fill="currentColor"
              d="M692.17,777.62l-1.63-3.06-.9-2.19-.98-3.32-71.41,20.98-343.04,140.11c2.89,7.63,5.96,15.18,9.2,22.63l343.39-140.27,65.36-34.88Z"
            />
            <path
              fill="currentColor"
              d="M685.45,752.47l-.33-3.43v-2.39s.38-3.43.38-3.43l-74.01-7.95-369.89-1.83c-.17,5.44-.29,10.89-.29,16.36,0,2.7.06,5.38.1,8.07l370.31,1.81,73.73-7.21Z"
            />
            <path
              fill="currentColor"
              d="M688.88,726.67l1-3.3.93-2.2,1.65-3.03-65.33-35.66-340.46-143c-3.36,7.4-6.55,14.9-9.56,22.49l340.9,143.16,70.88,21.55Z"
            />
            <path
              fill="currentColor"
              d="M701.92,704.14l2.2-2.67,1.68-1.67,2.69-2.17-46.72-57.95-259.1-261.67c-5.95,5.56-11.76,11.27-17.44,17.11l259.44,261.99,57.23,47.04Z"
            />
            <path
              fill="currentColor"
              d="M722.59,688.32l3.05-1.63,2.2-.9,3.33-.98-20.98-71.42-138.96-340.22c-7.64,2.87-15.19,5.92-22.65,9.15l139.15,340.63,34.88,65.36Z"
            />
            <path
              fill="currentColor"
              d="M747.74,681.61l3.46-.34h2.36s3.43.38,3.43.38l7.95-74,1.81-366.64c-5.43-.17-10.87-.29-16.35-.29-2.7,0-5.39.06-8.08.1l-1.8,367.06,7.21,73.73Z"
            />
            <path
              fill="currentColor"
              d="M773.54,685.04l3.31,1,2.2.92h0s3.03,1.65,3.03,1.65l35.66-65.34,141.85-337.74c-7.41-3.34-14.91-6.52-22.5-9.51l-142,338.12-21.55,70.88Z"
            />
            <path
              fill="currentColor"
              d="M796.07,698.07l2.67,2.19,1.68,1.7h0s2.16,2.69,2.16,2.69l57.95-46.71,260.09-257.54c-5.59-5.92-11.32-11.71-17.19-17.36l-260.33,257.8-47.04,57.24Z"
            />
            <path
              fill="currentColor"
              d="M811.89,718.74l1.63,3.06.9,2.2.97,3.32,71.41-20.98,339.15-138.52c-2.92-7.62-6.01-15.15-9.28-22.6l-339.42,138.65-65.36,34.88Z"
            />
            <path
              fill="currentColor"
              d="M818.6,743.89l.34,3.43h0v2.39s-.38,3.43-.38,3.43l74.01,7.95,366.76,1.81c.11-4.35.17-8.72.17-13.1,0-3.79-.06-7.57-.14-11.33l-367.01-1.79-73.73,7.21Z"
            />
            <path
              fill="currentColor"
              d="M815.17,769.69l-1,3.3-.93,2.21h0l-1.65,3.03,65.33,35.66,338.94,142.36c3.3-7.43,6.43-14.95,9.38-22.56l-339.19-142.44-70.88-21.55Z"
            />
            <path
              fill="currentColor"
              d="M802.13,792.22l-2.2,2.67-1.68,1.67-2.69,2.17,46.72,57.95,259.21,261.79c5.9-5.62,11.66-11.37,17.28-17.27l-259.4-261.95-57.23-47.04Z"
            />
            <path
              fill="currentColor"
              d="M781.47,808.04l-3.04,1.62-2.2.9-3.33.98,20.98,71.42,139.67,341.96c7.61-2.94,15.14-6.05,22.57-9.34l-139.78-342.18-34.88-65.36Z"
            />
          </svg>
          <div className="text-sm font-light leading-snug">
            <p>Get in touch or make an appointment</p>
            <CopyEmail />
          </div>
        </div>

        <nav className="flex gap-6 text-sm font-light">
          <a
            href="https://www.instagram.com/rift.furniture/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-300 hover:opacity-50"
          >
            Instagram
          </a>
          <Link
            href="/contact"
            className="transition-opacity duration-300 hover:opacity-50"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
