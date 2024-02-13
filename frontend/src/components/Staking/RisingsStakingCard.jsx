import cx from "classnames";

const RisingsStakingCard = ({
  nft,
  timeTypeInfo,
  currentTimeType,
  index,
  selectStatusInWallet,
  handleSelectNFTInWallet,
}) => {
  return (
    <div className={cx("loh-staking-card")}>
      <div className={cx("img-container")}>
        <img src={nft.image} alt={`${nft.image}`} width="100%" />
      </div>
      <div>
        <p className={cx("text-secondary", "uppercase", "mb-1")}>
          NFT #: <br />
          <span className={cx("text-primary", "italic")}>
            {nft.name} #{nft.id}
          </span>
        </p>
        <p className={cx("text-secondary", "uppercase", "mb-1")}>
          staking period:{" "}
          <span className={cx("text-primary", "italic")}>
            {timeTypeInfo[currentTimeType].period} day
          </span>{" "}
        </p>
        <p className={cx("text-secondary", "uppercase", "mb-1")}>
          estimated reward:
          <br />{" "}
          <span className={cx("text-primary", "italic")}>
            {nft.rewards} loh tickets
          </span>
        </p>
      </div>
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
    </div>
  );
};

export default RisingsStakingCard;
