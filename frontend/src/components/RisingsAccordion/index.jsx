import { Accordion, AccordionItem } from "react-light-accordion";
import cx from "classnames";
import "react-light-accordion/demo/css/index.css";
import "./index.scss";

// ================================================

const RisingsAccordion = ({ contents }) => {
  return (
    <div className={cx("loh-accordion")}>
      <Accordion atomic={true}>
        {contents.map((content) => (
          <AccordionItem key={content.id} title={content.topic}>
            <div
              dangerouslySetInnerHTML={{ __html: content.desc }}
              className={cx("content")}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RisingsAccordion;
