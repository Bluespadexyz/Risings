import cx from "classnames";
import PageTitle from "../PageTitle";
import Description from "../Description";
import RoundButton from "../RoundButton";
import SetNumComp from "../SetNumComp";
import DangerKeepOutImg from "assets/images/earn/DangerKeepOut.png";
import RisingsTicketImgY from "assets/images/common/RisingsTicketY.png";
import RisingsTicketImg from "assets/images/common/RisingsTicket.png";
import RisingsTicketContainerTopBorderImg from "assets/images/earn/loh-ticket-up-border.png";
import RisingsTicketContainerBottomBorderImg from "assets/images/earn/loh-ticket-down-border.png";
import OwnedRisingsTicketsComp from "../OwnedRisingsTicketsComp";
import { useMediaQuery } from "@uidotdev/usehooks";
import metamask from "assets/images/MetaMask_Fox.svg"

// ================================================

const BuyRisingsTickets = ({
  connectWallet,
  onPayBtn,
  isWalletConnected,
  onDecreaseBuyNumBtn,
  onIncreaseBuyNumBtn,
  buyNum,
  ticketPrice,
  cros,
  lohTicketBalance,
  setOpenBuyModal,
}) => {
  const isMobile = useMediaQuery("only screen and (max-width: 640px)");

  const addRisingsTicket = async () => {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: "0xf1A5A831ca54AE6AD36a012F5FB2768e6f5d954A",
          symbol: "RisingsT",
          decimals: "18",
          image: "",
        },
      },
    });
  }

  return (
    <div className={cx("buy-loh")} id="buy-tickets">
      <PageTitle classes="buy-loh-title">
        buy your <br />
        <span>loh tickets</span>
      </PageTitle>

      <div className={cx("loh-ticket-container-sm")}>
        <div className={cx("loh-ticket-wrapper")}>
          <img src={RisingsTicketImg} id="RisingsTicketImg" alt="loh-ticket.png" />
          <span className={cx("loh-ticket-img-container-price")}>=</span>
          <span className={cx("loh-ticket-img-container-price")}>
            {ticketPrice}
          </span>
          <span className={cx("loh-ticket-img-container-price")}>$CRO</span>
        </div>
      </div>
      {isWalletConnected ? (
        <>
          <Description
            classes={cx(
              "text-center",
              isMobile ? "w-100" : "w-30",
              "mx-auto",
              "mb-3"
            )}
          >
            Ready to win prizes in the HEL Yard? Choose the amount of Risings
            Tickets you would like to purchase below
          </Description>
          <SetNumComp
            onDecreaseBtn={onDecreaseBuyNumBtn}
            onIncreaseBtn={onIncreaseBuyNumBtn}
            num={buyNum}
          />
          <div className={cx("cros-for-purchase")}>{cros} $cro</div>
          <div className={cx("text-center", "mb-5")}>
            <RoundButton variant="danger" text="pay" onBtnClick={onPayBtn} />
          </div>
          <div className={cx("d-flex", "justify-center")}>
            <OwnedRisingsTicketsComp
              lohTicketBalance={lohTicketBalance}
              variant={isMobile ? "primary" : "light"}
            />
          </div>
          <div className={cx("d-flex", "justify-center")}>
            <div className={cx("add-btn")} onClick={() => addRisingsTicket()}>
              <img className="add-image" src={metamask} alt="MetaMask" width={60}></img>
              <div className="add-text">
                Add Risings TICKET
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Description
            classes={cx(
              "text-center",
              isMobile ? "w-100" : "w-30",
              "mx-auto",
              "mb-3"
            )}
          >
            Connect your wallet to buy Risings Tickets
          </Description>
          <div className={cx("text-center", "mb-6")}>
            <img src={DangerKeepOutImg} alt="danger-keepout.png" width={60} />
          </div>
          <div className={cx("text-center")}>
            <RoundButton
              variant="danger"
              text="connect wallet"
              onBtnClick={connectWallet}
            />
          </div>
        </>
      )}
      <div className={cx("loh-ticket-container")}>
        <div className={cx("loh-ticket-wrapper")}>
          <img
            src={RisingsTicketContainerTopBorderImg}
            id="RisingsTicketContainerTopBorderImg"
          />
          <img src={RisingsTicketImgY} id="RisingsTicketImgY" alt="loh-ticket.png" />
          <span className={cx("loh-ticket-img-container-price")}>=</span>
          <span className={cx("loh-ticket-img-container-price")}>
            {ticketPrice}
          </span>
          <span className={cx("loh-ticket-img-container-price")}>$CRO</span>
          <img
            src={RisingsTicketContainerBottomBorderImg}
            id="RisingsTicketContainerBottomBorderImg"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyRisingsTickets;
