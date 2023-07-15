// ** Style File Imports
import styles from "./ViewRight.module.scss";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThreeDots } from "react-loader-spinner";

// ** Next Imports
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// ** React Import
import { useState } from "react";

// ** Custom Error Handle
import modifyError from "@/helper";

// ** Service
import { forgotPassword } from "@/services/user.service";
import { saveForgotEmail } from "@/store/reducers/userSlice";

// ** React Toast
import { toast } from "react-hot-toast";

// ** Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

const ForgotPasswordViewRight = () => {
  // ** State
  const [submitBtnDisableFlag, setSubmitBtnDiableFlag] =
    useState<boolean>(false);
  // Hook
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  // ** Form default values
  const defaultValues = {
    email: "",
  };
  // Schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
  });
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      setSubmitBtnDiableFlag(true);
      const res = await forgotPassword(data);
      dispatch(saveForgotEmail(data?.email));
      toast.success(res?.data?.message);
      setSubmitBtnDiableFlag(false);
      setTimeout(() => {
        router.push("/code-verify");
      }, 1000);
    } catch (error) {
      modifyError(error);
      setSubmitBtnDiableFlag(false);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label>Forgot password?</label>
        <p>No Worries, we’ll send you reset instructions. </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                type="email"
                value={value}
                onChange={onChange}
                placeholder="Email"
              />
            )}
          />
          {errors.email && (
            <span className=" text-[#F04520] px-2">{errors.email.message}</span>
          )}
          <button type="submit" disabled={submitBtnDisableFlag}>
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
            Reset password
          </button>
        </form>
        <Link href="/login">
          <div className={styles.text}>
            <Image
              src={"images/icons/arrow-left.svg"}
              width={25}
              height={25}
              alt="arrow"
            />
            <label>Back to login</label>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordViewRight;
