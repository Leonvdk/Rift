import type { Access } from "payload"

export const isAdminOrEditor: Access = ({ req: { user } }) =>
  user?.role === "admin" || user?.role === "editor"

export const isAdmin: Access = ({ req: { user } }) => user?.role === "admin"

export const publicReadOrLoggedIn: Access = ({ req: { user } }) => {
  if (user) return true
  return { status: { equals: "published" } }
}
