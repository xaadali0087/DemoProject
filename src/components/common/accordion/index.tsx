// ** React Import
import { useState } from "react";

// ** Style File Import
import styles from "./accordion.module.scss";

const Accordion = (props: any) => {
  // ** Props
  const { title, content } = props;

  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <div
        className={styles.accordionWrapper}
        onClick={() => setIsActive(!isActive)}>
        <div className={styles.accordionTitle}>{title}</div>
        <div className={styles.accordionIcon}>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && <div className={styles.accordionContent}>{content}</div>}
      <div className=" w-full my-2 border-gray-200 border"></div>
    </div>
  );
};

export default Accordion;
