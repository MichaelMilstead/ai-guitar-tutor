import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Guitar Tutor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_USE_ACKEE && (
          <script
            async
            src={`${process.env.NEXT_PUBLIC_ACKEE_URL}/tracker.js`}
            data-ackee-server={process.env.NEXT_PUBLIC_ACKEE_URL}
            data-ackee-domain-id={process.env.NEXT_PUBLIC_ACKEE_DOMAIN_ID}
          ></script>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
