import React, { useState } from "react";
import EarnRisingsTicketsContainer from "components/EarnRisingsTickets/EarnRisingsTicketsContainer";
import Layout from "components/Layout";
import HowToEarn from "components/EarnRisingsTickets/HowToEarn";
import BuyRisingsTickets from "components/EarnRisingsTickets/BuyRisingsTickets";
import BuyRisingsTicketsModal from "components/EarnRisingsTickets/BuyRisingsTicketsModal";
import "./index.scss";

import Method1Img from "assets/images/earn/method1.png";
import Method2Img from "assets/images/earn/method2.png";
import Method3Img from "assets/images/earn/method3.png";
import Method4Img from "assets/images/earn/method4.png";
import BoughtRisingsTicketsModal from "components/EarnRisingsTickets/BoughtRisingsTicketsModal";

import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useChainId } from "lib/chains";
import RisingsTicketRouter from "abis/RisingsTicketRouter.json";
import RisingsTicket from "abis/RisingsTicket.json";
import { getContract } from "config/contracts";
import { callContract, contractFetcher } from "lib/contracts";
import {
  bigNumberify,
  expandDecimals,
  formatAmount,
  formatAmountFree,
  formatKeyAmount,
  parseValue,
} from "lib/numbers";

// ================================================

const earnRisingsTicketCardContents = [
  {
    id: "staking",
    image: Method1Img,
    title: "staking",
    desc: "Staking Risings NFTs is the easiest way to earn Risings Tickets. Once staked, each Risings NFT will award you with Risings Tickets.",
    actionText: "stake",
  },
  {
    id: "buy",
    image: Method2Img,
    title: "buy with $CRO",
    desc: "Buy Risings Tickets directly with $CRO <br/><br/> 1 Risings Ticket = $0.35 \n (paid in $CRO equivalent)",
    actionText: "buy",
  },
  {
    id: "join",
    image: Method3Img,
    title: "join events",
    desc: "Be active on the Risings Discord and Twitter is another way for you to earn Risings Tickets! We host recurring events and contests where you can earn Risings Tickets",
    actionText: "join discord",
  },
  {
    id: "redacted",
    image: Method4Img,
    title: "[redacted]",
    desc: "[TO BE RELEASED IN PHASE 2]",
    actionText: "coming soon",
  },
];

// ================================================

const EarnRisingsTickets = (props) => {
  const { connectWallet, setPendingTxns } = props;

  const { active, library, account } = useWeb3React();
  const { chainId } = useChainId();

  const [buyNum, setBuyNum] = useState(1);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openBoughtModal, setOpenBoughtModal] = useState(false);

  const ticketAddress = getContract(chainId, "RisingsTicket");
  const routerAddress = getContract(chainId, "RisingsTicketRouter");

  const { data: croPrice } = useSWR(
    true &&
      routerAddress && [true, chainId, routerAddress, "getLatestCROPrice"],
    { fetcher: contractFetcher(library, RisingsTicketRouter) }
  );

  const { data: ticketPriceUSD } = useSWR(
    true &&
      routerAddress && [true, chainId, routerAddress, "lohTicketPrice_USD"],
    { fetcher: contractFetcher(library, RisingsTicketRouter) }
  );

  const { data: ticketBalance } = useSWR(
    active &&
      ticketAddress && [active, chainId, ticketAddress, "balanceOf", account],
    { fetcher: contractFetcher(library, RisingsTicket) }
  );

  let ticketPirceByCro = 0;
  let croAmount = 0;
  if (croPrice !== undefined && ticketPriceUSD !== undefined) {
    ticketPirceByCro = (
      formatAmount(ticketPriceUSD, 8, 8) / formatAmount(croPrice, 8, 8)
    ).toFixed(2);
    croAmount = (ticketPirceByCro * buyNum).toFixed(2);
  }

  const onPay = () => {
    const contract = new ethers.Contract(
      routerAddress,
      RisingsTicketRouter,
      library.getSigner()
    );
    callContract(chainId, contract, "buyRisingsTicketsByCRO", [], {
      value: parseValue(croAmount, 18),
      setOpenActModal: setOpenBuyModal,
      setOpenActedModal: setOpenBoughtModal,
      setPendingTxns,
    })
      .then(async (res) => {})
      .finally(() => {});
  };

  const onIncreaseBuyNumBtn = () => {
    if (buyNum === 1000) return;
    setBuyNum((prevBuyNum) => prevBuyNum + 1);
  };

  const onDecreaseBuyNumBtn = () => {
    if (buyNum === 1) return;
    setBuyNum((prevBuyNum) => prevBuyNum - 1);
  };

  // ------------------------------------------------

  return (
    <Layout>
      <EarnRisingsTicketsContainer>
        <HowToEarn earnRisingsTicketCardContents={earnRisingsTicketCardContents} />
        <BuyRisingsTickets
          connectWallet={connectWallet}
          onPayBtn={onPay}
          isWalletConnected={active}
          onIncreaseBuyNumBtn={onIncreaseBuyNumBtn}
          onDecreaseBuyNumBtn={onDecreaseBuyNumBtn}
          buyNum={buyNum}
          ticketPrice={ticketPirceByCro}
          cros={croAmount}
          lohTicketBalance={formatAmount(ticketBalance, 18, 0)}
          setOpenBuyModal={setOpenBuyModal}
        />
        <BuyRisingsTicketsModal
          openModal={openBuyModal}
          setOpenModal={setOpenBuyModal}
          onCloseModal={() => setOpenBuyModal(false)}
        />
        <BoughtRisingsTicketsModal
          openModal={openBoughtModal}
          setOpenModal={setOpenBoughtModal}
          onCloseModal={() => setOpenBoughtModal(false)}
          buyNum={buyNum}
        />
      </EarnRisingsTicketsContainer>
    </Layout>
  );
};

export default EarnRisingsTickets;
