import { useWeb3React } from "@web3-react/core";

import GeneralStats from "./GeneralStats";
import ContentContainer from "./ContentContainer";
import SubtitleContainer from "./SubtitleContainer";

// ================================================

const Content = (props) => {
  const { connectWallet, isWalletConnected, isMobile, lohTicketBalance, activeRaffles } = props;

  return (
    <ContentContainer>
      {isWalletConnected ? (
        <GeneralStats
          isMobile={isMobile}
          lohTicketBalance={lohTicketBalance}
          activeRaffles={activeRaffles}
        />
      ) : (
        <SubtitleContainer connectWallet={connectWallet} />
      )}
    </ContentContainer>
  );
};

export default Content;
