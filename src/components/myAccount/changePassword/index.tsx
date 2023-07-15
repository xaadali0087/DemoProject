/* eslint-disable @next/next/no-img-element */
// ** Style File Import
import styles from "./changePassword.module.scss";

// ** React Import
import { useState } from "react";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThreeDots } from "react-loader-spinner";

// ** Service
import { changePassword } from "@/services/user.service";

// ** Custom Error Handle
import modifyError from "@/helper";

// ** React Toast
import { toast } from "react-hot-toast";

const ChangePassword = () => {
  // ** State
  const [submitBtnDisableFlag, setSubmitBtnDiableFlag] =
    useState<boolean>(false);
  const [showPassword, setshowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    repeatPassword: false,
  });
  // ** Form default values
  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  };
  // Schema
  const schema = yup.object().shape({
    currentPassword: yup.string().required("Old password is required"),
    newPassword: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .notOneOf(
        [yup.ref("currentPassword")],
        "New password must be different from the old password"
      ),
    repeatPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("newPassword")], "Password must match"),
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
    setSubmitBtnDiableFlag(true);
    try {
      const { repeatPassword, ...rest } = fieldData;
      const res = await changePassword({ ...rest });
      toast.success(res?.data?.message);
      setSubmitBtnDiableFlag(false);
      reset();
    } catch (error) {
      modifyError(error);
      setSubmitBtnDiableFlag(false);
    }
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className={styles.inputLabel}>Old Password</label>
          <div className={styles.passwordFieldWrapper}>
            <img src="/images/icons/Key.svg" alt="keyicon" className="m-2" />
            <Controller
              name="currentPassword"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <input
                  type={showPassword.currentPassword ? "text" : "password"}
                  className={styles.passwordField}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <img
              src="/images/icons/eyeicon.svg"
              alt="keyicon"
              className="m-2 cursor-pointer"
              onClick={() =>
                setshowPassword({
                  ...showPassword,
                  currentPassword: !showPassword.currentPassword,
                })
              }
            />
          </div>
          {errors.currentPassword && (
            <span className=" text-[#F04520] px-2">
              {errors.currentPassword.message}
            </span>
          )}
        </div>
        <div className="mb-5">
          <label className={styles.inputLabel}>New Password</label>
          <div className={styles.passwordFieldWrapper}>
            <img src="/images/icons/Key.svg" alt="keyicon" className="m-2" />
            <Controller
              name="newPassword"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  className={styles.passwordField}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <img
              src="/images/icons/eyeicon.svg"
              alt="keyicon"
              className="m-2 cursor-pointer"
              onClick={() =>
                setshowPassword({
                  ...showPassword,
                  newPassword: !showPassword.newPassword,
                })
              }
            />
          </div>
          {errors.newPassword && (
            <span className=" text-[#F04520] px-2">
              {errors.newPassword.message}
            </span>
          )}
        </div>
        <div className="mb-5">
          <label className={styles.inputLabel}>Repeat Password</label>
          <div className={styles.passwordFieldWrapper}>
            <img src="/images/icons/Key.svg" alt="keyicon" className="m-2" />
            <Controller
              name="repeatPassword"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <input
                  type={showPassword.repeatPassword ? "text" : "password"}
                  className={styles.passwordField}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <img
              src="/images/icons/eyeicon.svg"
              alt="keyicon"
              className="m-2 cursor-pointer"
              onClick={() =>
                setshowPassword({
                  ...showPassword,
                  repeatPassword: !showPassword.repeatPassword,
                })
              }
            />
          </div>
          {errors.repeatPassword && (
            <span className=" text-[#F04520] px-2">
              {errors.repeatPassword.message}
            </span>
          )}
        </div>
        <button type="submit" className="w-full bg-slate-600">
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
          Save
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
