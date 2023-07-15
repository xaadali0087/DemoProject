/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./myOrders.module.scss";

// ** Custom Error
import modifyError from "@/helper";

// ** Service
import { getOrderList } from "@/services/order.service";

// ** React Import
import { useEffect, useState } from "react";

// ** Type
import { OrderListType } from "@/types/order";
import { TailSpin } from "react-loader-spinner";

// ** Third Party Import
import moment from "moment";
import { SlRefresh } from "react-icons/sl";

const MyOrders = () => {
  // ** State
  const [orderList, setOrderList] = useState<OrderListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitBtnDisableFlag, setSubmitBtnDiableFlag] =
    useState<boolean>(false);
  // ** Handle
  const GetOrderList = async () => {
    try {
      const res: any = await getOrderList();
      setOrderList(res?.data);
      setLoading(false);
    } catch (error) {
      modifyError(error);
    }
  };
  useEffect(() => {
    GetOrderList();
  }, []);

  useEffect(() => {
    if (submitBtnDisableFlag) {
      setTimeout(() => {
        setSubmitBtnDiableFlag(false);
      }, 5000);
    }
  }, [submitBtnDisableFlag]);

  return (
    <div className=" w-full min-h-screen h-screen">
      {loading ? (
        <div className="w-full h-[80vh]  flex justify-center items-center">
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
      ) : orderList?.length > 0 ? (
        <div className={styles.wrapper}>
          <div className={styles.mainTitleWrapper}>
            <label>My Orders</label>
            {/* <select name="filter">
              <option value="">Last 7 Days</option>
              <option value="">Last 10 Days</option>
            </select> */}
            <button
              onClick={() => {
                setSubmitBtnDiableFlag(true);
                GetOrderList();
              }}
              disabled={submitBtnDisableFlag}>
              <SlRefresh className=" text-[25px]" />
            </button>
          </div>
          <div className={styles.tableWrapper}>
            <table>
              <tbody>
                <tr>
                  <th>ORDER NO.</th>
                  <th>CUSTOMER NAME</th>
                  <th>PAYMENT STATUS</th>
                  <th>AMOUNT</th>
                  <th>ADDRESS</th>
                  <th>ORDER DATE</th>
                  <th>STATUS</th>
                </tr>
                {orderList?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.orderNo}</td>
                    <td>{item?.user?.fullName}</td>
                    <td>{item?.paymentStatus}</td>
                    <td>
                      $
                      {item?.items
                        ?.reduce((acc, product) => {
                          return acc + Number(product?.productPrice);
                        }, 0)
                        .toFixed(5)}
                    </td>
                    <td>{item?.shippingDetails?.address}</td>
                    <td>{moment(item?.createdAt).format("DD-MMM-YYYY")}</td>
                    <td>{item?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[80vh]">
          <img src="images/icons/nodatafound.svg" alt="nodatafound" />
        </div>
      )}
    </div>
  );
};

export default MyOrders;
