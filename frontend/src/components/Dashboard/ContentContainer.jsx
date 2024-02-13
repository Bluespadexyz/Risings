import cx from "classnames";
import PageTitle from "components/PageTitle";

// ================================================

const ContentContainer = ({ children }) => {
  return (
    <div
      className={cx(
        "title-container",
        "d-flex",
        "justify-center",
        "flex-column"
      )}
    >
      <PageTitle classes="mb-3">
        your loh <span>dashboard</span>
      </PageTitle>
      {children}
    </div>
  );
};

export default ContentContainer;
