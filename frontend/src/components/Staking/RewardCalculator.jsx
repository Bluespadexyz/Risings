import cx from "classnames";
import React, { useState } from "react";
import Description from "../Description";
import RisingsSelect from "../RisingsSelect";
import RoundButton from "../RoundButton";
import SectionTitle from "../SectionTitle";
import Arrow1Img from "assets/images/common/Arrow1.png";
import RisingsTicketImg from "assets/images/common/RisingsTicket.png";
import { REWARD_AMOUNTS } from "config/staking";

const calculatorOptions = [
  {
    key: "risings nft type",
    options: [
      {
        value: 0,
        text: "risings",
      },
    ],
  },
  {
    key: "staking duration",
    options: [
      {
        value: 0,
        text: "7-day",
      },
      {
        value: 1,
        text: "30-day",
      },
      {
        value: 2,
        text: "60-day",
      },
      {
        value: 3,
        text: "90-day",
      },
    ],
  },
  // {
  //   key: "reward boost",
  //   options: [
  //     {
  //       value: "yes",
  //       text: "yes",
  //     },
  //     {
  //       value: "no",
  //       text: "no",
  //     },
  //   ],
  // },
];

const RewardCalculator = ({ isMobile }) => {
  const [calculatorValue, setCalculatorValue] = useState(0);
  const [timeType, setTimeType] = useState(0);

  const handleCalculate = () => {
    setCalculatorValue(REWARD_AMOUNTS[timeType]);
  };

  const handleTimeType = (timeType) => {
    setTimeType(timeType);
  };

  return (
    <div className={cx("reward-calculator", "mb-7")}>
      <SectionTitle classes="mb-3">
        staking reward <span>calculator</span>
      </SectionTitle>
      <Description classes={cx("text-center", "mb-5")}>
        Please use the below tool to estimate the amount of Risings Tickets awarded
        based on your staking criteria
      </Description>
      <div
        className={cx(
          "d-flex",
          "justify-between",
          "gap-1",
          "mb-5",
          isMobile ? "flex-column" : "flex-row"
        )}
      >
        {calculatorOptions.map((options, index) => (
          <RisingsSelect
            key={options.key}
            options={options.options}
            handleChange={
              (e) => handleTimeType(e.target.value)
            }
          />
        ))}
      </div>
      <div className={cx("text-center", "mb-6")}>
        <RoundButton
          variant="primary"
          text="calculate rewards"
          onBtnClick={handleCalculate}
        />
      </div>
      <div className={cx("result-container", "mb-3")}>
        <img src={Arrow1Img} alt="arrow.png" />
        <div className={cx("result")}>{calculatorValue}</div>
        <img src={Arrow1Img} alt="arrow.png" />
      </div>
      <div className="loh-tickets-container">
        <h5 className="title">loh tickets</h5>
        <img src={RisingsTicketImg} alt="loh-ticket.png" />
      </div>
    </div>
  );
};

export default RewardCalculator;
