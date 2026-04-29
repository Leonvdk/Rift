"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function PrefetchRoutes({ routes }: { routes: string[] }) {
  const router = useRouter()

  useEffect(() => {
    const idle =
      typeof window.requestIdleCallback === "function"
        ? (cb: () => void) =>
            window.requestIdleCallback(cb, { timeout: 2000 })
        : (cb: () => void) => window.setTimeout(cb, 200)

    const cancel =
      typeof window.cancelIdleCallback === "function"
        ? (h: number) => window.cancelIdleCallback(h)
        : (h: number) => window.clearTimeout(h)

    const handle = idle(() => {
      for (const route of routes) router.prefetch(route)
    }) as number

    return () => cancel(handle)
  }, [routes, router])

  return null
}
