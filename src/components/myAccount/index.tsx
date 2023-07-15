// ** Style File Import

import styles from "./myAccount.module.scss";

// ** Icons Import
import { HiPencil } from "react-icons/hi";

// ** Custom Component
import ProfileUpdate from "./profileUpdate";
import ChangePassword from "./changePassword";

// ** React Import
import { useEffect, useState } from "react";

// ** Third Party Import
import { TailSpin } from "react-loader-spinner";

// ** Types
import { UserType } from "@/types/user";

// ** Service
import { getSingleUserDetail } from "@/services/user.service";

const MyAccount = () => {
  // ** State
  const [loading, setloading] = useState(true);
  const [Data, setData] = useState<UserType>();
  // ** Hook
  useEffect(() => {
    getSingleUserDetail()
      .then((data) => {
        setData(data);
        setloading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className=" w-full min-h-screen h-screen">
      {loading ? (
        <div className="w-full h-[70vh]  flex justify-center items-center">
          <TailSpin
            height="80"
            width="80"
            color="#173F35"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.headerWrapper}>
            <label className={styles.headerTitle}>Profile</label>
            <div className={styles.editWrapper}>
              <HiPencil className={styles.editIcon} />
              Edit Profile
            </div>
          </div>
          <div className="w-full">
            <ProfileUpdate data={Data as never} />
            <div className="mt-8">
              <label className={styles.headerTitle}>Change Password</label>
              <ChangePassword />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
