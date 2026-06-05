import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import ScrollTopButton from "./ScrollTopButton.jsx";

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      {children}
      <Footer />
      <ScrollTopButton />
    </div>
  );
}
