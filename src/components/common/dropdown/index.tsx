/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "./dropdown.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
interface prop {
  selected?: {} | any;
  setSelected?: {} | any;
  options?: any[] | any;
  showRightIcon?: any;
  rightIcon?: any;
  disable?: Boolean;
  border?: Boolean;
  loading?: Boolean;
}
const FiltersDropDown = (Props: prop) => {
  const {
    selected,
    setSelected,
    options,
    showRightIcon,
    rightIcon,
    border,
    loading,
  } = Props;
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={
        Props.disable ? styles.disableDropdown : styles.filterDropDown
      }>
      <div
        className={styles.dropdownbtn}
        style={border ? { border: "1px solid #DCDFE3" } : undefined}
        onClick={(e) => {
          Props.disable ? null : setIsActive(!isActive);
        }}>
        {/* {showRightIcon === false ? null : (
          <div className={styles.imgContainer}>
            <div className={styles.leftIcon}>
              <img src="/icons/filterblack.svg" />
            </div>
          </div>
        )} */}
        <span> {loading ? "Loading..." : selected}</span>
        <div className={styles.withRightIcon}>
          <FiChevronDown />
        </div>
      </div>

      {isActive && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsActive(false);
          }}>
          <div className={styles.dropdowncontent}>
            {options?.map((option: any, index: any) => (
              <div
                key={index}
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                }}
                className={styles.dropdownitems}>
                <input type="radio" className="border border-[#173F35]" />
                {option?.title}
              </div>
            ))}
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default FiltersDropDown;
