import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap CSS
import "./globals.css";
import MainHeader from "@/components/common/MainHeader";

const inter = Inter({ subsets: ["latin"] });

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export const metadata = {
  title: "Kennedy Chatbot",
  description: "Chat Bot Help",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
