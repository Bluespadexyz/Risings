import { Link } from "react-router-dom";
import cx from "classnames";
import BackToTopBtn from "../BackToTopBtn";

import NineTailsLogoImg from "assets/images/footer/NinetailsLogo.png";
import "./index.scss";

// ================================================

const Footer = () => {
  return (
    <div className={cx("footer")}>
      <p className={cx("slogan")}>
        we are <span>inevitable!</span>
      </p>
      <div className={cx("links")}>
        <div className={cx("copyright")}>
          &copy; 2023 by nine tails ink{" "}
          <img src={NineTailsLogoImg} alt="nine-tails-ink" />
        </div>
        <div className={cx("mail-container")}>
          <Link to="/">hello@lifeofhel.xyz</Link>
        </div>
        <div className={cx("back-to-top-container")}>
          <BackToTopBtn />
        </div>
      </div>
    </div>
  );
};

export default Footer;
