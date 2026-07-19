import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";

const inter = Inter({ subsets: ["latin"] });

// TODO: swap for the real Vercel/custom domain once this is deployed.
const siteUrl = "https://aidil-portfolio.vercel.app";
const title = "Aidil Rozaidi | Software Developer Portfolio";
const description =
  "Portfolio of Aidil Rozaidi, a software engineering graduate building web, mobile, cloud-backed, and AR-inspired projects.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Aidil Rozaidi Portfolio",
    images: [{ url: "/graduation-photo.jpg", width: 1200, height: 1800, alt: "Aidil Rozaidi" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/graduation-photo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
