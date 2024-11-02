"use client";

import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isLoggedIn = !!localStorage.getItem("token");

  const onLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={bodyStyle}
      >
        <header style={headerStyle}>
          <div style={logoStyle}>
            <Link href="/" passHref>
              <Image
                src="/images/logo.webp"
                alt="Logo"
                width={50}
                height={50}
                style={logoImageStyle}
              />
              <span style={logoTextStyle}>ЛОГОТИП</span>
            </Link>
          </div>
          <nav style={menuStyle}>
            <Link href="/" style={menuItemStyle}>
              Home
            </Link>
            <Link href="/operations" style={menuItemStyle}>
              Operations
            </Link>
            <Link href="/transports" style={menuItemStyle}>
              Transports
            </Link>
            {isLoggedIn ? (
              <a style={{ cursor: "pointer" }} onClick={onLogout}>
                Logout
              </a>
            ) : (
              <Link href="/login" style={menuItemStyle}>
                Login
              </Link>
            )}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

// Додано стилі для фону
const bodyStyle = {
  backgroundColor: "#1A1A1D",
  color: "#F0F0F0",
  margin: 0,
  minHeight: "100vh",
  fontFamily: "'Roboto', sans-serif",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "20px",
  borderBottom: "2px solid #333",
  padding: "20px 50px",
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
};

const logoImageStyle = {
  width: "50px",
  height: "auto",
  marginRight: "10px",
};

const logoTextStyle = {
  color: "#FFA500",
  fontSize: "24px",
  fontWeight: "bold",
};

const menuStyle = {
  display: "flex",
  gap: "20px",
};

const menuItemStyle = {
  color: "#FFFFFF",
  fontSize: "18px",
  textDecoration: "none",
  fontWeight: "500",
  transition: "color 0.3s, transform 0.3s",
  ":hover": {
    color: "#AAAAAA",
    transform: "translateY(-2px)",
  },
};
