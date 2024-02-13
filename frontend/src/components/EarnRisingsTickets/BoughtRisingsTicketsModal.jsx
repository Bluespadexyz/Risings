import { NavLink } from "react-router-dom";
import RisingsModal from "../RisingsModal";
import RisingsTicketImage from "assets/images/common/RisingsTicket.png";
import RoundButton from "../RoundButton";

// ================================================

const BoughtRisingsTicketsModal = ({
  openModal,
  setOpenModal,
  onCloseModal,
  buyNum,
}) => {
  return (
    <RisingsModal
      open={openModal}
      setOpen={setOpenModal}
      onCloseModal={onCloseModal}
      classes="bought-loh-tickets-modal"
    >
      <h4 className="title text-center uppercase mb-3">
        you bought <br />
        <span className="status">{buyNum} loh tickets</span>!
      </h4>
      <div className="text-center mb-4 loh-ticket-container">
        <img src={RisingsTicketImage} alt="RisingsTicket.png" width="160px" />
      </div>
      <p className="desc text-center uppercase italic font-yokomoji mb-6">
        CONGRATULATIONS, YOUR PURCHASE HAS BEEN SUCCESSFULLY COMPLETED. YOUR Risings TICKETS HAVE BEEN CREDITED TO YOUR WALLET!
      </p>
      <div className="text-center">
        <NavLink to="/raffles" className="round-btn primary">
          spend tickets
        </NavLink>
      </div>
    </RisingsModal>
  );
};

export default BoughtRisingsTicketsModal;
