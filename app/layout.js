import { cookies } from "next/headers";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "FreshMartin - E-Commerce Platform",
  description:
    "FreshMartin - Your trusted e-commerce grocery solution by abid azam khan",
};

export default async function RootLayout({ children }) {
  const data = await cookies();
  const cookie = data.get("token")?.value;

  let userData = null;

  // Only fetch user data if token exists
  if (cookie) {
    try {
      const response = await fetch(
        "https://fdr-food-api.onrender.com/api/profile",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${cookie}`,
          },
          // Add timeout and error handling
          next: { revalidate: 0 },
        },
      );

      if (response.ok) {
        const res = await response.json();
        // Validate response structure
        if (res && res.user) {
          userData = res.user;
        }
      }
      // Silently fail if token is invalid - don't expose error to client
    } catch (error) {
      // Log error server-side only, don't expose to client
      if (process.env.NODE_ENV === "development") {
        console.error("Profile fetch error:", error);
      }
    }
  }

  return (
    <html lang="en">
      <body
        data-new-gr-c-s-check-loaded="14.1250.0"
        data-gr-ext-installed={true}
      >
        <Navbar userData={userData} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
