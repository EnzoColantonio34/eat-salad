import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eat Salad",
  description: "Composez votre salade sur-mesure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white text-gray-900`}
      >
        <header className="bg-green-700 text-white py-4 shadow">
          <nav className="container mx-auto flex justify-between items-center px-4">
            <div className="font-bold text-2xl tracking-tight">Eat Salad</div>
            <ul className="flex gap-6 text-lg">
              <li>
                <Link href="/">HOME</Link>
              </li>
              <li>
                <Link href="/opening-hours">OPENING HOURS</Link>
              </li>
              <li>
                <Link href="/menu">MENU OFFER</Link>
              </li>
              <li>
                <Link href="/make-your-own-salad">PLACE YOUR ORDER</Link>
              </li>
              <li>
                <Link href="/our-recipes">OUR RECIPE</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 text-center py-4 text-gray-500 text-sm mt-8">
          &copy; {new Date().getFullYear()} Eat Salad. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
