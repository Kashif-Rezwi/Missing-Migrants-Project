import { MdFamilyRestroom } from "react-icons/md";
import navStyle from "./navbar.module.css";

export const Navbar = () => {
  return (
    <nav>
      <div></div>
      <div className={navStyle.logo}>
        <img src="./Images/MM_logo.png" alt="MM_logo" />
        <div>
          <h1>Missing</h1>
          <h1>Migrants</h1>
        </div>
      </div>
    </nav>
  );
};
