import Layout from "components/Layout";
import AboutContainer from "components/About/AboutContainer";
import PageTitle from "components/PageTitle";
import RisingsAccordion from "components/RisingsAccordion";
import "./index.scss";

// ================================================

const faqs = [
  {
    id: 0,
    topic: "hel yard wtf?",
    desc: "The HEL Yard is a decentralized section of the Underworld managed by the all powerful grim reaper, HEL. It's a place where you can stake your Risings NFTs, earn Risings Tickets and try your luck at winning unique prizes.",
  },
  {
    id: 1,
    topic: "what is a loh ticket and what can I do with it?",
    desc: "Risings Tickets are passes to enter the HEL Yard’s raffles. If you stake your Risings NFTs, you will earn Risings Tickets, which you can then use to participate in exclusive raffles. Risings Tickets utilization is expected to evolve drastically with the release of Phase 2 of the HEL Yard. Risings Tickets are also purchasable in $CRO <a href='https://helyard.lifeofhel.xyz/earn-loh-tickets' target='_self'>here</a>",
  },
  {
    id: 2,
    topic: "how do I earn loh tickets?",
    desc: "There are four ways to earn Risings Tickets: 1. STAKING Risings NFTS, 2. BUYING WITH $CRO, 3. JOINING EVENTS, 4.	[REDACTED 👀]<br /><br />STAKING Risings NFTS<br/> Staking Risings NFTs is the easiest way to earn Risings Tickets. Once staked, every Volume and Avatar will generate Risings Tickets. Amount of Risings Tickets gained will change based on the staking period length and type of Risings NFT staked. For further details on staking, read <a href='https://helyard.lifeofhel.xyz/staking' target='_self'>here</a>. <br /> <br/> BUYING WITH $CRO<br/>You are able to buy directly Risings Tickets with $CRO. 1 Risings Ticket = $0.35 (in $CRO equivalent). You can buy your Risings Ticket from <a href='https://helyard.lifeofhel.xyz/earn-loh-tickets' target='_self'>here</a>.<br/><br/>JOINING EVENTS<br/>Being active on Discord and Twitter is another way for you to earn Risings Tickets! We host recurring events and contests where you can earn Risings Tickets.",
  },
  {
    id: 3,
    topic: "what is a hel yard's raffle?",
    desc: "Periodically, we will host in the HEL Yard multiple raffles. Each raffle contains exclusive prizes. You can participate in your favorite raffle by utilizing your Risings Tickets. The more Risings Tickets spent on a raffle, the higher the chance of winning! You can found active raffles in <a href='https://helyard.lifeofhel.xyz/raffles' target='_self'>here</a>.",
  },
  {
    id: 4,
    topic: "how do I stake my loh NFTs?",
    desc: "Go to <a href='https://helyard.lifeofhel.xyz/staking' target='_self'>https://helyard.lifeofhel.xyz/staking</a>, connect your wallet, choose the Risings NFT(s) you want to stake and the length of the staking period. Amount of Risings Tickets gained will change based on the staking period length and the type of Risings NFT staked.",
  },
  {
    id: 5,
    topic: "when staking rewards are paid?",
    desc: "Risings Tickets are awarded at the end of each staking period. Awarded Risings Tickets can be claimed at anytime by: 1) Pressing the “CLAIM REWARDS” button or 2) Pressing the “UNSTAKE” button - this allows you to claim your awarded Risings Tickets + unstake your Risings NFTs. Unstaking can be done at any moment; however, any pending reward will be automatically forfeit if the staking period has not been completed.",
  },
  {
    id: 6,
    topic: "hel yard - phase 2?",
    desc: "Due to technical complexities, the HEL Yard protocol is being developed in two separate phases. What to expect for Phase 2? Phase 2 will primarily revolve around upgrading the Risings Tickets’ utilization system. SACRIFICE and RESCUE mechanisms will be implemented and fully integrated within the Risings Tickets’ ecosystem. To avoid copy-cats, we will be releasing more information on SACRIFICE and RESCUE mechanisms closer to Phase 2’s release.",
  },
  {
    id: 7,
    topic: "will I lose my loh tickets post phase 2 migration?",
    desc: "No, Risings Tickets’ holdings will be passed to Phase 2. If you are not interested in any ongoing raffles, you can keep accumulating your Risings Tickets and utilize them once Phase 2 is deployed.",
  },
  {
    id: 8,
    topic: "“1X TICKET WINNING RATE” AND “YOUR WINNING RATE” EXPLAINED",
    desc: "Every raffle showcases two winning rates: “1X TICKET WINNING RATE” AND “YOUR WINNING RATE”.<br/><br/>“1X TICKET WINNING RATE” = winning probability of a new Risings Ticket invested in a specific raffle<br/>“YOUR WINNING RATE” = user's current winning probability based on the total number of Risings Tickets currently invested in a specific raffle",
  },
];

// ================================================

const About = () => {
  return (
    <Layout>
      <AboutContainer>
        <PageTitle classes="about-title">
          what the hel is the <span>hel yard</span>?
        </PageTitle>
        <RisingsAccordion contents={faqs} />
      </AboutContainer>
    </Layout>
  );
};

export default About;
