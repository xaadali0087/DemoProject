/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./ViewLeft.module.scss";

// ** Icons Import
import { RiMapPin2Fill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const ContactUsViewLeft = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label className={styles.boxTitle}>Get in Touch</label>
        <p className={styles.boxParagraph}>
          Welcome to our Get in Touch page! We value your feedback, inquiries,
          and suggestions. Please use the contact information provided below or
          fill out the form to connect with us. We here to assist you and look
          forward to hearing from you soon.
        </p>
        <div className={styles.contactusWrapper}>
          <div className={styles.contactusTextWrapper}>
            <div className={styles.contactText}>
              <RiMapPin2Fill />
              <p className="mt-1 ml-5 ">14 GreenRoad St.</p>
            </div>
            <div className={styles.contactText}>
              <BsFillTelephoneFill />
              <p className="mt-1 ml-5 ">14 GreenRoad St.</p>
            </div>
            <div className={styles.contactText}>
              <IoMail />
              <p className="ml-5">avira@getinfo.com</p>
            </div>
            <div className={styles.contactClockText}>
              <MdAccessTimeFilled className="mt-1" />
              <div className="ml-5">
                <p>Mon-Fri: 9:00 AM - 8:00 PM</p>
                <p>Sat: 9:30 AM - 6:30 PM</p>
              </div>
            </div>
            <div className={styles.socialIcons}>
              <BsInstagram className="text-[30px] cursor-pointer" />
              <FaFacebookSquare className="text-[30px] cursor-pointer" />
              <BsTwitter className="text-[30px] cursor-pointer" />
            </div>
          </div>
          <div className={styles.contactusIcon}>
            <img src="/images/icons/cartbage.svg" width={150} alt="cartbag" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsViewLeft;
