import { useWeb3React } from "@web3-react/core";
import cx from "classnames";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import SectionTitle from "../SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TableDecoImg from "assets/images/staking/tableDeco.png";
import CircularArrowImg from "assets/images/common/Arrow.png";
import XImage from "assets/images/common/XLight.png";
import RoundButton from "../RoundButton";
import { getContract } from "config/contracts";
import { RISINGS_NFTS, REWARD_AMOUNTS, VOLUME1_METADATA, COLLECTION_OPTIONS } from "config/staking";
import { callContract, contractFetcher } from "lib/contracts";
import { useChainId } from "lib/chains";
import { approveNFT } from "lib/approveNFT";
import StakingRisings from "abis/StakingRisings.json";
import Risings from "abis/Risings.json";
import RisingsStakingCard from "./RisingsStakingCard";
import RisingsStakedCard from "./RisingsStakedCard";
import Combobox from '../Combobox/Combobox';
import {
  formatAmount,
} from "lib/numbers";

const timeTypeInfo = [
  {
    label: "7-day",
    id: "seven",
    period: 7,
  },
  {
    label: "30-day",
    id: "thirty",
    period: 30,
  },
  {
    label: "60-day",
    id: "sixty",
    period: 60,
  },
  {
    label: "90-day",
    id: "ninety",
    period: 90,
  },
];

const loadWalletNFTs = (dataWallet, timeType) => {
  if (dataWallet === undefined) return [];

  if (dataWallet.length === 0) return [];

  const ret = dataWallet.map((item) => {
    let index = -1;

    for (let i = 0; i < RISINGS_NFTS.length; i++) {
      if (
        RISINGS_NFTS[i].address.toLowerCase() === item.token_address.toLowerCase()
      ) {
        index = i;
        break;
      }
    }

    if (index === -1) return null;

    const nftInfo = RISINGS_NFTS[index];
    let imageURL = "";
    if (nftInfo.name === "LIFE OF HEL - Volume 1")
      imageURL = `${nftInfo.imageHash}${VOLUME1_METADATA[Number(item.token_id.toString()) - 1]
        }.${nftInfo.imageType}`;
    else
      imageURL = `${nftInfo.imageHash}${Number(item.token_id.toString())}.${nftInfo.imageType
        }`;

    const rewards = REWARD_AMOUNTS[timeType];
    return {
      id: item.token_id.toString(),
      name: item.name,
      address: nftInfo.address,
      image: imageURL,
      rewards: rewards,
    };
  });

  const finalArray = ret.filter((item) => item !== null);
  return finalArray;
};

const loadStakedNFTs = (dataContract) => {
  if (dataContract === undefined) return [];

  if (dataContract.length === 0) return [];

  const ret = dataContract.map((item) => {
    let index = -1;

    for (let i = 0; i < RISINGS_NFTS.length; i++) {
      if (RISINGS_NFTS[i].address.toLowerCase() === item[0].toLowerCase()) {
        index = i;
        break;
      }
    }

    if (index === -1) return null;

    const nftInfo = RISINGS_NFTS[index];
    const tokenId = parseInt(item[1].toString());
    const timeType = parseInt(item[2].toString());
    const startTime = parseInt(item[3].toString());
    const autoRestake = item[4];
    const isClaimed = item[5];
    const pendingTicket = parseInt(formatAmount(item[6], 18, 0));

    const endTime = startTime + timeTypeInfo[timeType].period * 24 * 3600;
    const currentTime = new Date().getTime() / 1000;
    let leftTime = 0;
    let nextTicket = 0;

    if (!autoRestake) {
      if (isClaimed || currentTime > endTime) {
        leftTime = 0;
        nextTicket = 0;
      } else {
        leftTime = endTime - currentTime;
        nextTicket = REWARD_AMOUNTS[timeType];
      }
    } else {
      leftTime =
        (timeTypeInfo[timeType].period * 24 * 3600) - ((currentTime - startTime) % (timeTypeInfo[timeType].period * 24 * 3600));
      nextTicket = REWARD_AMOUNTS[timeType];
    }

    let imageURL = "";
    if (nftInfo.name === "LIFE OF HEL - Volume 1")
      imageURL = `${nftInfo.imageHash}${VOLUME1_METADATA[Number(item[1].toString()) - 1]
        }.${nftInfo.imageType}`;
    else
      imageURL = `${nftInfo.imageHash}${Number(item[1].toString())}.${nftInfo.imageType
        }`;

    return {
      name: nftInfo.name,
      image: imageURL,
      address: nftInfo.address,
      id: tokenId,
      timeType: timeType,
      leftTime: parseInt(leftTime / (24 * 3600)) + 1,
      autoRestake: autoRestake,
      nextTicket: nextTicket,
      claimableTicket: pendingTicket,
    };
  });

  const finalArray = ret.filter((item) => item !== null);
  return finalArray;
};

let walletNFTSelection = [];
let stakedNFTSelection = [];

const RisingsStaking = ({ isMobile }) => {
  const { active, library, account } = useWeb3React();

  const [currentTimeType, setCurrentTimeType] = useState(0);
  const [disabledClaimBtn, setDisabledClaimBtn] = useState(true);
  const [disabledUnStakeBtn, setDisabledUnStakeBtn] = useState(true);
  const [disabledAddRestakeBtn, setDisabledAddRestakeBtn] = useState(true);
  const [disabledCancelRestakeBtn, setDisabledCancelRestakeBtn] =
    useState(true);
  const [selectStatusInWallet, setSelectStatusInWallet] = useState([]);
  const [selectStatusStaked, setSelectStatusStaked] = useState([]);
  const [isApproving, setIsApproving] = useState(false);
  const [isWaitingForApproval, setIsWaitingForApproval] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(COLLECTION_OPTIONS[0]);

  const regInputForCollectionId = React.useRef();

  const { chainId } = useChainId();
  const stakingRisingsAddress = getContract(chainId, "StakingRisings");

  // const { data: dataMoralis } = useSWR(
  //   [account],
  //   { fetcher: moralisFetcher(account), }
  // );
  const nftAddresses = RISINGS_NFTS.map((item) => item.address);
  //////////Reading Wallet///////////////////////////////////////////////////////////////////////////////////////////////////
  const { data: dataWallet } = useSWR(
    active &&
    stakingRisingsAddress && [
      active,
      chainId,
      stakingRisingsAddress,
      "getTokensInWallet",
      nftAddresses,
    ],
    { fetcher: contractFetcher(library, StakingRisings) }
  );
  const filteredDataWallet = dataWallet ? dataWallet.filter((item) => item.token_address.toLowerCase() === selectedCollection.address.toLowerCase()) : [];
  let nftsInWallet = loadWalletNFTs(filteredDataWallet, currentTimeType);
  //////////Reading Staking Contract////////////////////////////////////////////////////////////////////////////////////////////////////
  const { data: dataContract } = useSWR(
    active &&
    stakingRisingsAddress && [
      active,
      chainId,
      stakingRisingsAddress,
      "getStakingInfo",
      nftAddresses,
      account,
    ],
    { fetcher: contractFetcher(library, StakingRisings) }
  );
  const filteredDataContract = dataContract ? dataContract.filter((item) => item._address.toLowerCase() === selectedCollection.address.toLowerCase()) : [];
  const nftsStaked = loadStakedNFTs(filteredDataContract);

  /////////Approval Status/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const { data: collectionApprovals } = useSWR(
    active &&
    stakingRisingsAddress && [
      active,
      chainId,
      stakingRisingsAddress,
      "getApprovalStatus",
      nftAddresses,
      account,
    ],
    { fetcher: contractFetcher(library, StakingRisings) }
  );

  let needApproval = true;
  if (collectionApprovals) {
    const filteredCollectionApprovals = collectionApprovals ? collectionApprovals.filter((item) => item.token_address.toLowerCase() === selectedCollection.address.toLowerCase()) : [];
    needApproval = true;//!filteredCollectionApprovals[0].isApproval;
  }

  const [disabledStakeBtn, setDisabledStakeBtn] = useState(!needApproval);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSelectNFTInWallet = (index) => {
    const itemInfo = nftsInWallet[index];

    const selectedItem = walletNFTSelection.find(
      (item) =>
        item.id === itemInfo.id &&
        item.address === itemInfo.address.toLowerCase()
    );
    if (selectedItem === undefined)
      walletNFTSelection.push({
        id: itemInfo.id,
        address: itemInfo.address.toLowerCase(),
      });
    else
      walletNFTSelection = walletNFTSelection.filter(
        (item) => item !== selectedItem
      );

    let items = [];
    for (let i = 0; i < nftsInWallet.length; i++) {
      const itemInfo = nftsInWallet[i];
      const currentItem = walletNFTSelection.find(
        (item) =>
          item.id === itemInfo.id &&
          item.address === itemInfo.address.toLowerCase()
      );
      if (currentItem === undefined) items.push(false);
      else items.push(true);
    }
    setSelectStatusInWallet(items);

    if (walletNFTSelection.length === 0 && !needApproval)
      setDisabledStakeBtn(true);
    else setDisabledStakeBtn(false);
  };

  const handleSelectNFTStaked = (index) => {
    const itemInfo = nftsStaked[index];

    const selectedItem = stakedNFTSelection.find(
      (item) =>
        item.id === itemInfo.id &&
        item.address === itemInfo.address.toLowerCase()
    );
    if (selectedItem === undefined)
      stakedNFTSelection.push({
        id: itemInfo.id,
        address: itemInfo.address.toLowerCase(),
      });
    else
      stakedNFTSelection = stakedNFTSelection.filter(
        (item) => item !== selectedItem
      );

    let items = [];
    for (let i = 0; i < nftsStaked.length; i++) {
      const itemInfo = nftsStaked[i];
      const currentItem = stakedNFTSelection.find(
        (item) =>
          item.id === itemInfo.id &&
          item.address === itemInfo.address.toLowerCase()
      );
      if (currentItem === undefined) items.push(false);
      else items.push(true);
    }
    setSelectStatusStaked(items);

    if (stakedNFTSelection.length === 0) {
      setDisabledClaimBtn(true);
      setDisabledUnStakeBtn(true);
      setDisabledAddRestakeBtn(true);
      setDisabledCancelRestakeBtn(true);
    } else {
      setDisabledClaimBtn(false);
      setDisabledUnStakeBtn(false);
      setDisabledAddRestakeBtn(false);
      setDisabledCancelRestakeBtn(false);
    }
  };

  const handleSelectAllInWallet = () => {
    let items = [];
    walletNFTSelection = [];
    for (let i = 0; i < nftsInWallet.length; i++) {
      const itemInfo = nftsInWallet[i];
      walletNFTSelection.push({
        id: itemInfo.id,
        address: itemInfo.address.toLowerCase(),
      });
      items.push(true);
    }
    setSelectStatusInWallet(items);

    setDisabledStakeBtn(false);
  };

  const handleUnselectAllInWallet = () => {
    let items = [];
    walletNFTSelection = [];
    setSelectStatusInWallet(items);
    setDisabledStakeBtn(true);
  };

  const handleSelectAllStaked = () => {
    let items = [];
    stakedNFTSelection = [];
    for (let i = 0; i < nftsStaked.length; i++) {
      const itemInfo = nftsStaked[i];
      stakedNFTSelection.push({
        id: itemInfo.id,
        address: itemInfo.address.toLowerCase(),
      });
      items.push(true);
    }
    setSelectStatusStaked(items);

    setDisabledClaimBtn(false);
    setDisabledUnStakeBtn(false);
    setDisabledAddRestakeBtn(false);
    setDisabledCancelRestakeBtn(false);
  };

  const handleUnselectAllStaked = () => {
    let items = [];
    stakedNFTSelection = [];
    setSelectStatusStaked(items);

    setDisabledClaimBtn(true);
    setDisabledUnStakeBtn(true);
    setDisabledAddRestakeBtn(true);
    setDisabledCancelRestakeBtn(true);
  };

  const handleTimeType = (index) => {
    setCurrentTimeType(index);
  };

  const approveFromNFT = () => {
    if (needApproval) {
      approveNFT({
        setIsApproving,
        library,
        tokenAddress: selectedCollection.address,
        spender: stakingRisingsAddress,
        chainId: chainId,
        onApproveSubmitted: () => {
          setIsWaitingForApproval(true);
        },
      });

      return;
    }
  };

  const handleStake = () => {
    if (needApproval) {
      approveFromNFT();
      return;
    }

    setIsSubmitting(true);

    const nftToStake = walletNFTSelection.map((item) => {
      return item.address;
    });

    const tokenId = walletNFTSelection.map((item) => {
      return item.id;
    });

    const timeType = tokenId.map((item) => {
      return currentTimeType;
    });

    const contract = new ethers.Contract(
      stakingRisingsAddress,
      StakingRisings,
      library.getSigner()
    );
    callContract(chainId, contract, "stake", [nftToStake, tokenId, timeType], {
      sentMsg: "Staking Risings NFT submitted!",
      failMsg: "Staking Risings NFT failed.",
      // setPendingTxns,
    })
      .then(async (res) => {
        // setIsVisible(false);
        // setOpenBuyModal(true);
        // setOpenBoughtModal(false);
      })
      .finally(() => {
        // setIsStaking(false);
        // setOpenBuyModal(false);
        // setOpenBoughtModal(true);
        setIsSubmitting(false);
      });

    handleUnselectAllInWallet();
  };

  const getTextStake = () => {
    if (needApproval && isWaitingForApproval) {
      return "Waiting for Approval...";
    }
    if (isApproving) {
      return "Approving";
    }
    if (needApproval) {
      return "Approve";
    }

    if (isSubmitting) {
      return "Staking...";
    }

    return "Stake";
  };

  const handleClaim = () => {
    const nftToClaim = stakedNFTSelection.map((item) => {
      return item.address;
    });

    const tokenId = stakedNFTSelection.map((item) => {
      return item.id;
    });

    const contract = new ethers.Contract(
      stakingRisingsAddress,
      StakingRisings,
      library.getSigner()
    );
    callContract(chainId, contract, "claimRewards", [nftToClaim, tokenId], {
      sentMsg: "Claim Risings Ticket submitted!",
      failMsg: "Claim Risings Ticket failed.",
      // setPendingTxns,
    })
      .then(async (res) => {
        // setIsVisible(false);
        // setOpenBuyModal(true);
        // setOpenBoughtModal(false);
      })
      .finally(() => {
        // setIsStaking(false);
        // setOpenBuyModal(false);
        // setOpenBoughtModal(true);
      });

    handleUnselectAllStaked();
  };

  const handleUnStake = () => {
    const nftToUnStake = stakedNFTSelection.map((item) => {
      return item.address;
    });

    const tokenId = stakedNFTSelection.map((item) => {
      return item.id;
    });

    const contract = new ethers.Contract(
      stakingRisingsAddress,
      StakingRisings,
      library.getSigner()
    );
    callContract(chainId, contract, "unStake", [nftToUnStake, tokenId], {
      sentMsg: "Unstake Risings NFT submitted!",
      failMsg: "Unstake Risings NFT failed.",
      // setPendingTxns,
    })
      .then(async (res) => {
        // setIsVisible(false);
        // setOpenBuyModal(true);
        // setOpenBoughtModal(false);
      })
      .finally(() => {
        // setIsStaking(false);
        // setOpenBuyModal(false);
        // setOpenBoughtModal(true);
      });

    handleUnselectAllStaked();
  };

  const handleAddRestake = () => {
    const nftToAddRestake = stakedNFTSelection.map((item) => {
      return item.address;
    });

    const tokenId = stakedNFTSelection.map((item) => {
      return item.id;
    });

    const contract = new ethers.Contract(
      stakingRisingsAddress,
      StakingRisings,
      library.getSigner()
    );
    callContract(
      chainId,
      contract,
      "addAutoRestake",
      [nftToAddRestake, tokenId],
      {
        sentMsg: "Add AutoRestake Risings NFT submitted!",
        failMsg: "Add AutoRestake Risings NFT failed.",
        // setPendingTxns,
      }
    )
      .then(async (res) => {
        // setIsVisible(false);
        // setOpenBuyModal(true);
        // setOpenBoughtModal(false);
      })
      .finally(() => {
        // setIsStaking(false);
        // setOpenBuyModal(false);
        // setOpenBoughtModal(true);
      });

    handleUnselectAllStaked();
  };

  const handleCancelRestake = () => {
    const nftToCancelRestake = stakedNFTSelection.map((item) => {
      return item.address;
    });

    const tokenId = stakedNFTSelection.map((item) => {
      return item.id;
    });

    const contract = new ethers.Contract(
      stakingRisingsAddress,
      StakingRisings,
      library.getSigner()
    );
    callContract(
      chainId,
      contract,
      "removeAutoRestake",
      [nftToCancelRestake, tokenId],
      {
        sentMsg: "Cancel AutoRestake Risings NFT submitted!",
        failMsg: "Cancel AutoRestake Risings NFT failed.",
        // setPendingTxns,
      }
    )
      .then(async (res) => {
        // setIsVisible(false);
        // setOpenBuyModal(true);
        // setOpenBoughtModal(false);
      })
      .finally(() => {
        // setIsStaking(false);
        // setOpenBuyModal(false);
        // setOpenBoughtModal(true);
      });

    handleUnselectAllStaked();
  };

  useEffect(() => {
    if (needApproval) setIsWaitingForApproval(false);
  }, [needApproval, active]);

  useEffect(() => {
    handleUnselectAllInWallet();
    handleUnselectAllStaked();
  }, [selectedCollection]);

  return (
    <div className={cx("loh-staking")}>
      <SectionTitle classes="mb-3">
        Risings <span>staking</span>
      </SectionTitle>
      <Combobox ref={regInputForCollectionId} options={COLLECTION_OPTIONS} value={selectedCollection} onChange={(selectedOption) => setSelectedCollection(selectedOption)} />
      <Tabs className={cx("loh-staking-tabs")}>
        <TabList>
          <Tab>
            {/* <h6>Volumes</h6> */}
            <p>
              <span>{nftsInWallet ? nftsInWallet.length : 0}</span> in wallet
            </p>
          </Tab>
          <Tab>
            {/* <h6>Avatars</h6> */}
            <p>
              <span>{nftsStaked ? nftsStaked.length : 0}</span> staked
            </p>
          </Tab>
        </TabList>

        <TabPanel>
          {isMobile ? (
            <div className={cx("cards-wrapper", "mb-5")}>
              {nftsInWallet && nftsInWallet.length ? (
                nftsInWallet.map((item, index) => {
                  return (
                    <RisingsStakingCard
                      nft={item}
                      key={index}
                      timeTypeInfo={timeTypeInfo}
                      currentTimeType={currentTimeType}
                      index={index}
                      selectStatusInWallet={selectStatusInWallet}
                      handleSelectNFTInWallet={handleSelectNFTInWallet}
                    />
                  );
                })
              ) : (
                <div className={cx("p-1", "text-center", "text-danger")}>
                  No NFTs in wallet
                </div>
              )}
            </div>
          ) : (
            <div className={cx("table-wrapper", "mb-5")}>
              <table>
                <thead>
                  <tr rowSpan={nftsInWallet ? nftsInWallet.length + 1 : 0}>
                    <th>nft visual</th>
                    <th>nft #</th>
                    <th>selected</th>
                    {/* <th>boost</th> */}
                    <th>staking period</th>
                    <th>estimated reward</th>
                  </tr>
                </thead>
                <tbody>
                  {nftsInWallet && nftsInWallet.length ? (
                    nftsInWallet.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td className="nft-visual">
                            <img src={item.image} alt={`${item.image}`} />
                          </td>
                          <td className="w-20">
                            {item.name} #{item.id}
                          </td>
                          <td>
                            <div className="loh-checkbox">
                              <input
                                type="checkbox"
                                id={`lohCheckbox-${index}`}
                                checked={selectStatusInWallet[index] === true}
                                onChange={() => handleSelectNFTInWallet(index)}
                                value={selectStatusInWallet[index]}
                              />
                              <label htmlFor={`lohCheckbox-${index}`}></label>
                            </div>
                          </td>
                          {/* <td className="percent text-success">
                        15%
                        <br />
                        <span className="text-danger">
                          ({item.days} days unlisted)
                        </span>
                      </td> */}
                          <td className="days">
                            <span className="text-primary">
                              {timeTypeInfo[currentTimeType].period}
                            </span>{" "}
                            day
                          </td>
                          <td>
                            <span className="text-primary">{item.rewards}</span>{" "}
                            loh tickets
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className={cx("text-danger", "text-center", "p-1")}
                      >
                        No NFTs in wallet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className="btn-group">
            <button
              className={cx("select-all-btn")}
              onClick={handleSelectAllInWallet}
            >
              select all
            </button>
            <RoundButton
              key="stake"
              text={getTextStake()}
              variant="primary"
              disabled={disabledStakeBtn}
              onBtnClick={handleStake}
            />
            {timeTypeInfo.map((btn, index) => (
              <RoundButton
                key={btn.id}
                text={btn.label}
                variant={currentTimeType === index ? "danger" : "transparent"}
                onBtnClick={() => handleTimeType(index)}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          {isMobile ? (
            <div className={cx("cards-wrapper", "mb-5")}>
              {nftsStaked && nftsStaked.length ? (
                nftsStaked.map((item, index) => {
                  return (
                    <RisingsStakedCard
                      nft={item}
                      index={index}
                      selectStatusStaked={selectStatusStaked}
                      handleSelectNFTStaked={handleSelectNFTStaked}
                      timeTypeInfo={timeTypeInfo}
                    />
                  );
                })
              ) : (
                <div className={cx("p-1", "text-center", "text-danger")}>
                  No NFTs in wallet
                </div>
              )}
            </div>
          ) : (
            <div className={cx("table-wrapper", "mb-5")}>
              <table>
                <thead>
                  <tr rowSpan={nftsStaked ? nftsStaked.length + 1 : 0}>
                    <th>nft visual</th>
                    <th>nft #</th>
                    <th>selected</th>
                    <th>auto-restake</th>
                    <th>remaining period</th>
                    <th>rewards</th>
                  </tr>
                </thead>
                <tbody>
                  {nftsStaked && nftsStaked.length ? (
                    nftsStaked.map((nft, index) => {
                      return (
                        <tr key={nft.id}>
                          <td className="nft-visual">
                            <img src={nft.image} alt={`${nft.image}`} />
                          </td>
                          <td className="w-20">
                            {nft.name} #{nft.id}
                          </td>
                          <td>
                            <div className="loh-checkbox">
                              <input
                                type="checkbox"
                                id={`lohCheckbox-${index}`}
                                checked={selectStatusStaked[index] === true}
                                onClick={() => handleSelectNFTStaked(index)}
                                value={selectStatusStaked[index]}
                              />
                              <label htmlFor={`lohCheckbox-${index}`}></label>
                            </div>
                          </td>
                          <td>
                            <button className={cx("auto-restake-btn")}>
                              <img
                                src={
                                  nft.autoRestake === true
                                    ? CircularArrowImg
                                    : XImage
                                }
                                alt="arrow.png"
                                width="100%"
                              />
                            </button>
                          </td>
                          <td className="days">
                            <span className="text-primary">{nft.leftTime}</span>{" "}
                            days left
                            <br />
                            <span className="text-danger">
                              ({timeTypeInfo[nft.timeType].period} days
                              programme)
                            </span>
                          </td>
                          <td>
                            <div className="mb-2">
                              <span className="text-primary">next reward:</span>
                              <br />
                              <span className="text-danger">
                                {nft.nextTicket}
                              </span>
                              {" loh tickets"}
                            </div>
                            <div>
                              <span className="text-primary">
                                claimable reward:
                              </span>
                              <br />
                              <span className="text-danger">
                                {nft.claimableTicket}
                              </span>
                              {" loh tickets"}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className={cx("text-danger", "text-center", "p-1")}
                      >
                        No staked NFTs
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className="btn-group">
            <button
              className={cx("select-all-btn")}
              onClick={handleSelectAllStaked}
            >
              select all
            </button>
            <RoundButton
              key="claim"
              text="claim rewards"
              variant="transparent"
              disabled={disabledClaimBtn}
              onBtnClick={handleClaim}
            />
            <RoundButton
              key="unstake"
              text="unstake"
              variant="transparent"
              disabled={disabledUnStakeBtn}
              onBtnClick={handleUnStake}
            />
            {/* <RoundButton
              key="add_auto_restake"
              text="add auto restake"
              variant="transparent"
              disabled={disabledAddRestakeBtn}
              onBtnClick={handleAddRestake}
            />
            <RoundButton
              key="cancel_auto_restake"
              text="cancel auto restake"
              variant="transparent"
              disabled={disabledCancelRestakeBtn}
              onBtnClick={handleCancelRestake}
            /> */}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default RisingsStaking;
