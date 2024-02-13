import cx from "classnames";
import RaffleCROImg from "assets/images/raffle/RaffleCRO.png";
import "./index.scss";

// ================================================

const TOTPrizeWonComp = ({ wonTOTPrizesNum, variant, classes }) => {
  return (
    <div className={cx("tot-prizes-won-container", variant, classes)}>
      <h6 className={cx("mb-3")}>your Risings tickets</h6>
      <div className={cx("d-flex")}>
        <img src={RaffleCROImg} alt="RaffleCRO.png" />
        <div className={cx("won-tot-prizes-num")}>
          <span>{wonTOTPrizesNum}</span>
          <br /> $cro
        </div>
      </div>
    </div>
  );
};

export default TOTPrizeWonComp;
