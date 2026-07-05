import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin — Ihsan Asfari",
  description: "Portfolio admin panel",
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return <AdminShell />;
}
