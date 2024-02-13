import cx from "classnames";

const DashboardContainer = ({ children }) => {
  return (
    <div className={cx("dashboard-container", "d-flex", "gap-2")}>
      {children}
    </div>
  );
};

export default DashboardContainer;
