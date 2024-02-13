import { useWeb3React } from "@web3-react/core";

import Layout from "components/Layout";
import EarnedTickets from "components/Staking/EarnedTickets";
import Hero from "components/Staking/Hero";
import RisingsStaking from "components/Staking/RisingsStaking";
import RewardCalculator from "components/Staking/RewardCalculator";
import StakingContainer from "components/Staking/StakingContainer";
import StakingDesc from "components/Staking/StakingDesc";
import { useMediaQuery } from "@uidotdev/usehooks";

import "./index.scss";

// ================================================

const Staking = (props) => {
  const { connectWallet } = props;

  const { active, library, account } = useWeb3React();
  const isMobile = useMediaQuery("only screen and (max-width: 640px)");

  return (
    <Layout>
      <StakingContainer>
        {!active ? (
          <>
            <Hero connectWallet={connectWallet} />
            <StakingDesc isMobile={isMobile} />
            <EarnedTickets isMobile={isMobile} />
            <RewardCalculator isMobile={isMobile} />
          </>
        ) : (
          <RisingsStaking isMobile={isMobile} />
        )}
      </StakingContainer>
    </Layout>
  );
};

export default Staking;
