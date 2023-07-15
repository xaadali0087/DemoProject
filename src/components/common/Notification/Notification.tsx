/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "./notification.module.scss";
import OutsideClickHandler from "react-outside-click-handler";

const Notification = (props: any) => {
  const dropRef: any = useRef(null);

  const [notification, setnotification] = useState(false);
  const [notificationNumber, setNotificationNumber] = useState();
  const [notificationData, setNotificationData] = useState([
    {
      id: 1,
      img: "/images/icons/Avatar.svg",
      message: "csdcascbsdcoclbslcbdclbasckabla",
    },
    {
      id: 2,
      img: "/images/icons/Avatar.svg",
      message: "csdcascbsdcoclbslcbdclbasckabla",
    },
  ]);

  // HOOKS //

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        notification &&
        dropRef.current &&
        !dropRef?.current?.contains(e.target)
      ) {
        setnotification(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [notification]);

  return (
    <>
      <div className={styles.container} ref={dropRef}>
        <div className={styles.wrapper}>
          <div
            className={styles.notification}
            onClick={() => {
              setnotification(!notification);
            }}>
            <img src="/images/icons/bellicon.svg" alt="" />
            {notificationNumber ? (
              <div className={styles.notificationbadge}>
                <span>6</span>
              </div>
            ) : (
              ""
            )}
          </div>
          {notification && (
            <div className={styles.bellmessage}>
              <div className={styles.heading}>
                <span>Notifications</span>
              </div>
              {notificationData.map((items, index) => {
                return (
                  <div className={styles.card} key={index}>
                    <div className={styles.left}>
                      <img src={items.img} alt="Notification" />
                    </div>
                    <div className={styles.right} key={index}>
                      <label className={styles.notificationMessage}>
                        {items.message}
                      </label>
                      {/* <h6>Yogle Ishmada</h6> */}
                      <label className={styles.notificationTime}>
                        {/* {moment(items.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )} */}
                        Today at 9:42 AM
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
