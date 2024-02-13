import cx from "classnames";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./index.scss";

// ================================================

const SetBuyRisingsNumComp = ({
  onIncreaseBuyNumBtn,
  onDecreaseBuyNumBtn,
  buyNum,
}) => {
  return (
    <div className={cx("set-buy-num-container")}>
      <button onClick={onDecreaseBuyNumBtn} disabled={!buyNum}>
        <FaMinus />
      </button>
      <div className={cx("buy-num")}>{buyNum}</div>
      <button onClick={onIncreaseBuyNumBtn}>
        <FaPlus />
      </button>
    </div>
  );
};

export default SetBuyRisingsNumComp;
