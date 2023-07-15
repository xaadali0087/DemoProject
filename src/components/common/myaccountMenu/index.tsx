// ** Style File Import
import styles from "./myaccountMenu.module.scss";

// ** Next Import
import Link from "next/link";
import { useRouter } from "next/router";

// ** NextAuthjs Import
import { signOut } from "next-auth/react";

// ** Custom Error
import modifyError from "@/helper";

// ** React Toast
import { toast } from "react-hot-toast";

// ** Service
import { userLogout } from "@/services/user.service";

// ** Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  saveAccessToken,
  saveUserData,
  DEFAULT_USER_PARAMS,
} from "@/store/reducers/userSlice";
import { resetCartItemsAndShippingInfo } from "@/store/reducers/cartSlice";

const MyAccountMenu = ({ setshowMenu, setuserData }: any) => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const UserLogout = async () => {
    try {
      const res = await userLogout();
      toast.success(res?.data?.message);
      setshowMenu(false);
      dispatch(saveAccessToken(null));
      dispatch(saveUserData(DEFAULT_USER_PARAMS));
      dispatch(resetCartItemsAndShippingInfo());
      await signOut({
        redirect: false,
      });
      setuserData({});
      router.push("/login");
    } catch (error: any) {
      if (error?.response?.data?.statusCode === 401) {
        dispatch(saveAccessToken(null));
        dispatch(saveUserData(DEFAULT_USER_PARAMS));
        await signOut({
          redirect: false,
        });
        router.push("/login");
      }
      modifyError(error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <ul>
        <Link href={"/my-account"}>
          <li className={styles.listItem} onClick={() => setshowMenu(false)}>
            My Account
          </li>
        </Link>
        <Link href={"/favourites"}>
          <li className={styles.listItem} onClick={() => setshowMenu(false)}>
            Favorites
          </li>
        </Link>
        <Link href={"/my-orders"} onClick={() => setshowMenu(false)}>
          <li className={styles.listItem}>My Orders</li>
        </Link>

        <li className={styles.logoutItem} onClick={UserLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default MyAccountMenu;
