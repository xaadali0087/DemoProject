"use-client";
/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./header.module.scss";

// ** Icons Imports

import { FiMenu } from "react-icons/fi";

// ** Custom Component
import MobileMenu from "./mobileMenu";
import Notification from "../Notification/Notification";

// ** Next Imports
import Image from "next/image";
// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Next Import
import Link from "next/link";
import MyAccountMenu from "../myaccountMenu";

// ** Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Header = () => {
  // ** State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showMenu, setshowMenu] = useState<boolean>(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userData, setuserData] = useState<any>({});
  const dropRef: any = useRef(null);

  // ** Store
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);
  // ** Hook
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

  // ** Handle
  const mobileMenuHandler = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setCartItemCount(cartItems?.length);
  }, [cartItems?.length]);
  useEffect(() => {
    setuserData(user);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.col1}>
        <ul>
          <Link href={"/products"}>
            <li>Products</li>
          </Link>
          <Link href={"/about-us"}>
            <li>About Us</li>
          </Link>

          <Link href={"/contact-us"}>
            <li>Contact Us</li>
          </Link>
        </ul>
      </div>
      <div className={styles.col2}>
        <Link href={"/"}>
          Demo Project
          {/* <span className=" cursor-pointer">WEB SHOP</span> */}
          {/* <img src="/images/icons/Logo.svg" alt="logo" width={130} /> */}
        </Link>
      </div>
      <div className={styles.col3}>
        <div className={styles.search}>
          <div className={styles.searchIcon}>
            <Image
              src={"/images/icons/Searchicon.svg"}
              height={20}
              width={20}
              alt="search"
            />
          </div>
          <input type="text" placeholder="Search " />
        </div>
        <div className="flex items-center">
          <Link href={"/cart"}>
            <img
              src={"/images/icons/Vector.svg"}
              alt="logo"
              className={styles.carticon}
            />
          </Link>
          <sup>{cartItemCount > 0 && cartItemCount}</sup>
        </div>

        {userData?.id !== null && userData?.id > 0 ? (
          <>
            <div className="ml-7">
              <div className=" cursor-pointer ">
                <Notification />
              </div>
            </div>
            <div className="relative ml-3" ref={dropRef}>
              <div
                className="flex cursor-pointer items-center"
                onClick={() => setshowMenu(!showMenu)}>
                <img
                  src="/images/icons/profile.svg"
                  alt="profile"
                  className="mr-2 h-[30px]"
                />
                <span className=" hidden xl:flex text-[16px] text-[#173F35]">
                  {userData?.fullName}
                </span>
              </div>
              {showMenu ? (
                <div className={styles.myaccountMenu}>
                  <MyAccountMenu
                    setshowMenu={setshowMenu}
                    setuserData={setuserData}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <Link href={"/login"}>
            <p className={styles.loginbutton}>Login</p>
          </Link>
        )}
      </div>

      {!isMobileMenuOpen && (
        <FiMenu onClick={mobileMenuHandler} className={styles.menuIcon} />
      )}
      {isMobileMenuOpen && (
        <MobileMenu
          mobileMenuHandler={mobileMenuHandler}
          cartItemCount={cartItemCount}
          userData={userData}
        />
      )}
    </div>
  );
};

export default Header;
