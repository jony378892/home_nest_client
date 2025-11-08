import { Outlet } from "react-router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
}
