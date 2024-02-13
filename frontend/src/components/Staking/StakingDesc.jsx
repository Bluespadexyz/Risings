import cx from "classnames";

import NiQuizImg from "assets/images/staking/NiQuiz.png";
import Arrow1Img from "assets/images/common/Arrow1.png";
import RisingsTicketImg from "assets/images/common/RisingsTicket.png";
import DangerKeepOutImg from "assets/images/earn/DangerKeepOut.png";
import Description from "../Description";

const StakingDesc = ({ isMobile }) => {
  return (
    <div className={cx("staking-desc")}>
      <div className={cx("staking-desc-img-container")}>
        <img src={NiQuizImg} alt="NiQuiz.png" width="100%" />
      </div>
      <div className={cx("staking-description-container")}>
        <Description classes="text-center mb-5">
          Once staked, each Risings NFTs will provide you with Risings Tickets. Amount
          of Risings Tickets earned will change based on the staking period length
          and type of Risings NFTs staked.
        </Description>
        <div
          className={cx(
            "d-flex",
            "justify-center",
            "align-center",
            "gap-2",
            "mb-5"
          )}
        >
          <h5 className={cx("text-center", "section-title")}>
            loh nfts <span className={cx("text-danger")}>staking</span>
          </h5>
          <img
            src={Arrow1Img}
            alt="arrow.png"
            width={isMobile ? "40px" : "80px"}
          />
          <img
            src={RisingsTicketImg}
            alt="loh-ticket.png"
            width={isMobile ? "100px" : "200px"}
          />
        </div>
        <div
          className={cx("d-flex", "justify-between", "align-center", "gap-2")}
        >
          <img
            src={DangerKeepOutImg}
            alt="danger-keep-out.png"
            width="40px"
            className={isMobile ? "d-none" : "d-block"}
          />
          <div>
            <p className={cx("reward-boost-desc", "text-primary")}>
              Risings Tickets will be awarded at the end of each staking period.
              Awarded Risings Tickets can be claimed at anytime by pressing either
              the “CLAIM REWARDS” or the “UNSTAKE” buttons – the latter will
              also unstake your Risings NFTs. Staking can be undone at any moment;
              however, pending Risings Tickets will be automatically forfeit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingDesc;
