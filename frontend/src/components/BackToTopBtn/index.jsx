import cx from "classnames";
import { IoMdArrowUp } from "react-icons/io";
import "./index.scss";

// ================================================

const BackToTopBtn = () => {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ------------------------------------------------

  return (
    <button className={cx("back-to-top-btn")} onClick={backToTop}>
      <IoMdArrowUp /> back to top
    </button>
  );
};

export default BackToTopBtn;
