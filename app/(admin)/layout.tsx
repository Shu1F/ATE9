import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "ATE9 Admin Dashboard",
  description:
    "Manage ATE9 projects, users, and analytics through a streamlined admin dashboard.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background-light text-text-body">
      {children}
    </div>
  );
}

