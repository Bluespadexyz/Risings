import cx from "classnames";
import RisingsTicketImg from "assets/images/common/RisingsTicket.png";
import "./index.scss";

// ================================================

const OwnedRisingsTicketsComp = ({ lohTicketBalance, variant, classes }) => {
  return (
    <div className={cx("owned-loh-tickets-container", variant, classes)}>
      <h6 className={cx("mb-3")}>your Risings tickets</h6>
      <div className={cx("d-flex", "align-center")}>
        <img src={RisingsTicketImg} alt="RisingsTicket.png" />
        <div className={cx("owned-loh-tickets-num")}>
          <span>{lohTicketBalance}</span>
          <br /> owned
        </div>
      </div>
    </div>
  );
};

export default OwnedRisingsTicketsComp;
