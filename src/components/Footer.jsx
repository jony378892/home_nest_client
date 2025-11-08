import { FaSquareXTwitter, FaYoutube } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="flex gap-3 items-center justify-self-end">
        <FaYoutube size={30} />
        <FaSquareXTwitter size={24} />
        <FaFacebookSquare size={24} />
      </nav>
    </footer>
  );
}
