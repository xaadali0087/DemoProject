// ** Style File Imports
import styles from "./ViewRight.module.scss";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThreeDots } from "react-loader-spinner";

// ** Next Imports
import Link from "next/link";

// ** React Import
import { useState } from "react";

// ** Custom Error Handle
import modifyError from "@/helper";

// ** Service
import { userLogin } from "@/services/user.service";

// ** Rect toast
import { toast } from "react-hot-toast";

// ** Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { saveAccessToken, saveUserData } from "@/store/reducers/userSlice";

// ** Next Import
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginViewRight = () => {
  const router = useRouter();
  const { callbackUrl } = router.query;
  // ** State
  const [submitBtnDisableFlag, setSubmitBtnDiableFlag] =
    useState<boolean>(false);
  // ** Hook
  const dispatch = useDispatch<AppDispatch>();

  // ** Form default values
  const defaultValues = {
    email: "",
    password: "",
  };
  // Schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
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
      data = {
        email: data?.email.trim().toLocaleLowerCase(),
        ...data,
      };

      setSubmitBtnDiableFlag(true);
      const res = await userLogin(data);
      dispatch(saveAccessToken(res?.data?.accessToken));
      dispatch(saveUserData(res?.data?.user));
      toast.success(res?.data?.message);
      setSubmitBtnDiableFlag(false);

      await signIn("credentials", {
        token: res?.data?.accessToken,

        redirect: false,
      });

      if (callbackUrl) {
        window.location.href = `${callbackUrl}`;
      } else {
        window.location.href = `/`;
      }
    } catch (error) {
      modifyError(error);
      setSubmitBtnDiableFlag(false);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label>Welcome back!</label>
        <p>Please enter your email and password</p>
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
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                type="password"
                value={value}
                onChange={onChange}
                placeholder="Password"
              />
            )}
          />
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
            Login
          </button>
        </form>
        <div className={styles.text}>
          <Link href="/forgot-password">
            <label>Forgot password</label>
          </Link>

          <p>
            Don’t have account ?
            <Link href="/signup">
              <span> Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginViewRight;
