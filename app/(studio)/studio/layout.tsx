import type { Metadata } from "next";

/**
 * Server Component — safe to export metadata here even though the Studio
 * page itself must stay a Client Component ('use client'). This is what
 * keeps the Studio out of search results and gives it its own <title>,
 * without needing metadata inside the client page file.
 */
export const metadata: Metadata = {
  title: "Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}