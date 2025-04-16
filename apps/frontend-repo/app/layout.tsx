'use client'
import "./globals.css";
import { Providers } from "./providers";
import { BrowserRouter } from "react-router-dom";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BrowserRouter>
          <Providers>
            {children}
          </Providers>
        </BrowserRouter>
      </body>
    </html>
  );
}
