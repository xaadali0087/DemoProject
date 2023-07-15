/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import styles from "./mobileMenu.module.scss";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import Link from "next/link";
// ** Next Imports
import Image from "next/image";
import MyAccountMenu from "../../myaccountMenu";

const MobileMenu = (props: any) => {
  const { mobileMenuHandler, cartItemCount, userData } = props;
  const dropRef: any = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [showMenu, setshowMenu] = useState<boolean>(false);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showMenu &&
        dropRef.current &&
        !dropRef?.current?.contains(e.target)
      ) {
        setshowMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showMenu]);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.closeRow} onClick={mobileMenuHandler}>
          <CgClose className={styles.closeIcon} />
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.links}>
            <Link href={"/"} className=" mb-5">
              DEMO PROJECT
              {/* <img src="/images/icons/Logo.svg" alt="logo" width={160} /> */}
            </Link>
            {userData?.id !== null && userData?.id > 0 && (
              <div className=" w-full text-[#173F35] flex justify-center border-b-2 border-[#173F35] px-4 py-2">
                <div className="relative" ref={dropRef}>
                  <div
                    className="flex cursor-pointer items-center"
                    onClick={() => setshowMenu(!showMenu)}>
                    <img
                      src="/images/icons/profile.svg"
                      alt="profile"
                      className="mr-2 h-[35px]"
                    />
                    {/* <span className=" hidden md:flex  text-[18px] text-[#173F35]">
                    {user?.fullName} 
                  </span> */}
                  </div>
                  {showMenu ? (
                    <div className={styles.myaccountMenu}>
                      <MyAccountMenu setshowMenu={setshowMenu} />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}

            <Link
              onClick={mobileMenuHandler}
              className={styles.active}
              href="/cart">
              <div className={styles.carticon}>
                <Image
                  src={"/images/icons/Vector.svg"}
                  height={5}
                  width={30}
                  alt="logo"
                />
                <p>{cartItemCount > 0 && cartItemCount}</p>
              </div>
            </Link>

            <Link
              onClick={mobileMenuHandler}
              className={styles.active}
              href="/products">
              Products
            </Link>

            <Link
              onClick={mobileMenuHandler}
              className={styles.active}
              href="/about-us">
              Abouts Us
            </Link>
            <Link
              onClick={mobileMenuHandler}
              className={styles.active}
              href="/contact-us">
              Contact Us
            </Link>

            {userData?.id === null && (
              <>
                <Link
                  onClick={mobileMenuHandler}
                  className={styles.active}
                  href="/login">
                  Login
                </Link>
                <Link
                  onClick={mobileMenuHandler}
                  className={styles.active}
                  href="/signup">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileMenu;
