import cx from "classnames";
import "./index.scss";

const RisingsSelect = ({ options, handleChange }) => {
  return (
    <div className={cx("loh-select-container")}>
      <label>
        <select className={cx("loh-select")} onChange={handleChange}>
          {options &&
            options.length &&
            options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
        </select>
      </label>
    </div>
  );
};

export default RisingsSelect;
