// ** Style File Import
import styles from "./MoreAndLessText.module.scss";

// ** React Import
import { useState } from "react";

interface Props {
  description: string;
}

const MoreAndLessText = ({ description }: Props) => {
  // ** State
  const [readMore, setReadMore] = useState<boolean>(false);
  return (
    <>
      {readMore ? (
        <p className={styles.text}>
          {description}&nbsp;
          <span onClick={() => setReadMore(false)}>Show less</span>
        </p>
      ) : description?.length > 300 ? (
        <p className={styles.text}>
          {description.slice(0, 200)}...&nbsp;
          <span onClick={() => setReadMore(true)}>Read more</span>
        </p>
      ) : (
        <p className={styles.text}>{description}</p>
      )}
    </>
  );
};

export default MoreAndLessText;
