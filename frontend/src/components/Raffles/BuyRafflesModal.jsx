import cx from "classnames";
import RisingsModal from "../RisingsModal";
import RoundButton from "../RoundButton";
import SetNumComp from "../SetNumComp";
import OwnedRisingsTicketsComp from "../OwnedRisingsTicketsComp";
import { Risings_RAFFLES } from "config/raffles"

// ================================================

const BuyRafflesModal = ({
  openModal,
  setOpenModal,
  onDecreaseBuyNumBtn,
  onIncreaseBuyNumBtn,
  onCloseModal,
  lohTicketsNum,
  raffleIndex,
  lohTicketBalance,
  getTextForBtn,
  onUseRisingsTicketsBtn,
  isMobile,
}) => {
  return (
    <RisingsModal
      open={openModal}
      setOpen={setOpenModal}
      onCloseModal={onCloseModal}
      classes="buy-raffles-modal"
    >
      <div className={cx("d-flex", "justify-center", "mb-3")}>
        <img
          src={Risings_RAFFLES[raffleIndex].image}
          alt="RaffleLion.png"
          width={isMobile ? 200 : 300}
        />
      </div>
      <p className={cx("text-center", " uppercase", "mb-3", "desc", "font-yokomoji", "italic")}>
        choose the number of Risings tickets you want to use
      </p>
      <SetNumComp
        onDecreaseBtn={onDecreaseBuyNumBtn}
        onIncreaseBtn={onIncreaseBuyNumBtn}
        num={lohTicketsNum}
        classes="mb-2"
      />
      <div className="text-center mb-6">
        <RoundButton
          variant="danger"
          text={getTextForBtn()}
          onBtnClick={onUseRisingsTicketsBtn}
        />
      </div>
      <div className={cx("d-flex", "justify-center")}>
        <OwnedRisingsTicketsComp
          variant="light"
          lohTicketBalance={lohTicketBalance}
          classes="border-none"
        />
      </div>
    </RisingsModal>
  );
};

export default BuyRafflesModal;
