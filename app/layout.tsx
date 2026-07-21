import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Masterpiece Home Services | Canada",
  description: "Professional window, gutter, and home cleaning services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}