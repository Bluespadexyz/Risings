import cx from "classnames";
import PageTitle from "../PageTitle";
import Description from "../Description";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";
import RoundButton from "../RoundButton";
import ScrollButton from "components/ScrollButton";

// ================================================

const HowToEarn = ({ earnRisingsTicketCardContents }) => {
  const isMobile = useMediaQuery("only screen and (max-width: 640px)");

  const onBuyBtn = () => {
    const dom = document.querySelector("#buy-tickets");
    if (dom) {
      dom.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className={cx("how-to-earn")}>
      <PageTitle classes="earn-loh-tickets-title">
        how to earn <span>loh tickets</span>?
      </PageTitle>
      <Description
        classes={cx(
          "text-center",
          isMobile ? "w-100" : "w-30",
          "mx-auto",
          "mb-3"
        )}
      >
        There are four ways to earn Risings tickets
      </Description>
      <div className={cx("cards-row")}>
        <div className={cx("earn-loh-tickets-card")}>
          <div className={cx("card-media", "mb-3")}>
            <img
              src={earnRisingsTicketCardContents[0].image}
              alt={`${earnRisingsTicketCardContents[0].title}.png`}
              width={80}
            />
          </div>
          <div className={cx("card-content")}>
            <h5 className={cx("title", "mb-2", "uppercase")}>
              {earnRisingsTicketCardContents[0].title}
            </h5>
            <p className={cx("content")}>{earnRisingsTicketCardContents[0].desc}</p>
          </div>
          <div className={cx("card-action")}>
            <Link to="/staking" className="round-btn primary">
              {earnRisingsTicketCardContents[0].actionText}
            </Link>
          </div>
        </div>
        <div className={cx("earn-loh-tickets-card")}>
          <div className={cx("card-media", "mb-3")}>
            <img
              src={earnRisingsTicketCardContents[1].image}
              alt={`${earnRisingsTicketCardContents[1].title}.png`}
              width={80}
            />
          </div>
          <div className={cx("card-content")}>
            <h5 className={cx("title", "mb-2", "uppercase")}>
              {earnRisingsTicketCardContents[1].title}
            </h5>
            <div
              className={cx("content")}
              dangerouslySetInnerHTML={{
                __html: earnRisingsTicketCardContents[1].desc,
              }}
            />
          </div>
          <div className={cx("card-action")}>
            <RoundButton
              text={earnRisingsTicketCardContents[1].actionText}
              variant="primary"
              onBtnClick={onBuyBtn}
            />
          </div>
        </div>
        <div className={cx("earn-loh-tickets-card")}>
          <div className={cx("card-media", "mb-3")}>
            <img
              src={earnRisingsTicketCardContents[2].image}
              alt={`${earnRisingsTicketCardContents[2].title}.png`}
              width={80}
            />
          </div>
          <div className={cx("card-content")}>
            <h5 className={cx("title", "mb-2", "uppercase")}>
              {earnRisingsTicketCardContents[2].title}
            </h5>
            <p className={cx("content")}>{earnRisingsTicketCardContents[2].desc}</p>
          </div>
          <div className={cx("card-action")}>
            <a
              className="round-btn primary"
              href="https://discord.com/invite/life-of-hel"
              target="_blank"
            >
              {earnRisingsTicketCardContents[2].actionText}
            </a>
          </div>
        </div>
        <div className={cx("earn-loh-tickets-card")}>
          <div className={cx("card-media", "mb-3")}>
            <img
              src={earnRisingsTicketCardContents[3].image}
              alt={`${earnRisingsTicketCardContents[3].title}.png`}
              width={80}
            />
          </div>
          <div className={cx("card-content")}>
            <h5 className={cx("title", "mb-2", "uppercase")}>
              {earnRisingsTicketCardContents[3].title}
            </h5>
            <p className={cx("content")}>{earnRisingsTicketCardContents[3].desc}</p>
          </div>
          <div className={cx("card-action")}>
            <a className="round-btn primary">
              {earnRisingsTicketCardContents[3].actionText}
            </a>
          </div>
        </div>
      </div>
      {
        isMobile ?
          null
          :
          <div className="scrollbtn-wrapper">
            <ScrollButton />
          </div>
      }
    </div>
  );
};

export default HowToEarn;
