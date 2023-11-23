import { useLocation } from "react-router-dom";
import HeroSLider from "../Sections/HeroSLider";
import Navbar from "../Sections/Navbar";

function Header() {
  const { pathname } = useLocation();
  return (
    <header>
      <Navbar />
      {pathname === "/" && <HeroSLider />}
    </header>
  );
}

export default Header;
