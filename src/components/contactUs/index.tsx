// ** Style File Import
import styles from "./contactUs.module.scss";

// ** Custom Component
import ContactUsViewLeft from "./ViewLeft";
import ContactUsViewRight from "./ViewRight";

const ContactUs = () => {
  return (
    <div className={styles.wrapper}>
    <div className={styles.viewLeft}>
      <ContactUsViewLeft />
    </div>
    <div className={styles.viewRight}>
      <ContactUsViewRight />
    </div>
  </div>
  )
}

export default ContactUs