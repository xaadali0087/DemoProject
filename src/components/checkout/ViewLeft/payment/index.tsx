/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./payment.module.scss";

// ** Third Party Import
import copy from "copy-to-clipboard";

// ** Custom Component
import CheckoutBar from "../checkoutBar";

// ** React Import
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// ** Custom Error
import modifyError from "@/helper";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getWalletAddressAndQR, placeOrder } from "@/services/order.service";
import { RotatingLines, TailSpin, ThreeDots } from "react-loader-spinner";
import { resetCartItemsAndShippingInfo } from "@/store/reducers/cartSlice";

// ** Next Import
import { useRouter } from "next/router";

const Payment = (props: any) => {
  // ** props
  const { value, data } = props;
  const router = useRouter();
  // ** State
  const [text, setText] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const { cartItems, shippingInfo } = useSelector(
    (state: RootState) => state.cart
  );
  const [submitBtnDisableFlag, setSubmitBtnDiableFlag] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // ** Hook
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    GetWalletAddressAndQrCode();
    // PlaceOrder();
  }, []);

  // ** Handle
  const copyToClipboard = () => {
    copy(text);
    toast.success("Copied to clipboard");
  };
  const PlaceOrder = async () => {
    try {
      setSubmitBtnDiableFlag(true);
      let orderItemsDto = cartItems?.map((cartItem) => {
        return {
          productId: cartItem?.id,
          quantity: cartItem?.qty,
        };
      });
      const res: any = await placeOrder({
        orderItemsDto,
        shippingDetailsDto: shippingInfo,
      });
      setSubmitBtnDiableFlag(false);
      toast.success(res?.message);
      dispatch(resetCartItemsAndShippingInfo());
      router.push("/my-orders");
    } catch (error) {
      modifyError(error);
      setSubmitBtnDiableFlag(false);
    }
  };

  const GetWalletAddressAndQrCode = async () => {
    try {
      const res: any = await getWalletAddressAndQR();
      setQrCode(res?.qrCode);
      setText(res?.walletAddress);
      setLoading(false);
    } catch (error) {
      modifyError(error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <label className={styles.checkoutTitle}>Checkout</label>
      <div className="w-full my-7">
        <CheckoutBar value={value} />
      </div>

      {loading ? (
        <div className="w-full h-[50vh]  flex justify-center items-center">
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
        <div className={styles.box}>
          <img src={qrCode} alt="qrcode" />

          <div className={styles.qrcodeField}>
            <p>{text}</p>
            <img
              src="/images/icons/copyaddressicon.svg"
              alt="qricon"
              onClick={copyToClipboard}
            />
          </div>
          <p className={styles.qrdescription}>
            Send only Bitcoin to this address. Sending any other coin or token
            to this address may result in the loss of your receiving.
          </p>
          <p className="text-[14px] mt-5 text-[#F04520]">
            <span className=" font-bold">Disclaimer!</span> Please pay exact
            amount of the order total amount which is $
            {cartItems
              ?.reduce((acc, item) => {
                return acc + Number(item?.price) * item?.qty;
              }, 0)
              .toFixed(5)}
            . Otherwise your order will not get confirmed
          </p>
          <button
            disabled={data?.length === 0 || submitBtnDisableFlag}
            onClick={PlaceOrder}>
            {submitBtnDisableFlag && (
              <ThreeDots
                height="50"
                width="50"
                radius="9"
                color="#E6E8EC"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=" flex justify-center "
                visible={true}
              />
            )}
            Place Order
          </button>
          {/* <div className=" mt-12 flex flex-col items-center">
            <RotatingLines
              strokeColor="#173F35"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
            <p className="text-[14px] text-[#173F35] mt-5 font-medium">
              Waiting for Payment
            </p>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Payment;
