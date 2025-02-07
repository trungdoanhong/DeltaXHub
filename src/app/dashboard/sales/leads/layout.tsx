import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leads | DeltaX Hub",
  description: "Manage and track your sales leads",
};

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 