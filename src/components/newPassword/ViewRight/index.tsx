// ** Style File Imports
import styles from "./ViewRight.module.scss";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThreeDots } from "react-loader-spinner";

// ** Next Imports
import { useRouter } from "next/router";

// ** Custom Error Handle
import modifyError from "@/helper";

// ** Service
import { resetPassword } from "@/services/user.service";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { saveForgotEmail, saveVerifyCode } from "@/store/reducers/userSlice";

// ** React Toast
import { toast } from "react-hot-toast";

// ** React Import
import { useState } from "react";

const NewPasswordViewRight = () => {
  // ** State
  const [submitBtnDisableFlag, setSubmitBtnDiableFlag] =
    useState<boolean>(false);

  // ** Hook
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  // ** Store
  const { forgotEmail, verifyCode } = useSelector(
    (state: RootState) => state.user
  );
  // ** Form default values
  const defaultValues = {
    confirmPassword: "",
    password: "",
  };
  // Schema
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Password must match"),
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

  const onSubmit = async (fieldData: any) => {
    const { password } = fieldData;
    setSubmitBtnDiableFlag(true);
    try {
      let data = {
        email: forgotEmail,
        newPassword: password,
        secret: verifyCode,
      };

      const res = await resetPassword(data);
      toast.success(res?.data?.message);
      dispatch(saveForgotEmail(null));
      dispatch(saveVerifyCode(null));
      router.push("/login");
      setSubmitBtnDiableFlag(false);
    } catch (error) {
      modifyError(error);
      setSubmitBtnDiableFlag(false);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label>Set new password</label>
        <p>Your new password must be different from previous used password.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.password && (
            <span className=" text-[#F04520] px-2">
              {errors.password.message}
            </span>
          )}
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                type="password"
                value={value}
                onChange={onChange}
                placeholder="Confirm Password"
              />
            )}
          />
          {errors.confirmPassword && (
            <span className=" text-[#F04520] px-2">
              {errors.confirmPassword.message}
            </span>
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
      </div>
    </div>
  );
};

export default NewPasswordViewRight;
