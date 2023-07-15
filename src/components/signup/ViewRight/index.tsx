// ** React IMport
import { useState } from "react";

// ** Style File Imports
import styles from "./ViewRight.module.scss";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";

// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// ** Service
import { userRegister } from "@/services/user.service";

// ** Rect toast
import { toast } from "react-hot-toast";

// ** Custom Error Handle
import modifyError from "@/helper";

const SignUpViewRight = () => {
  // ** State
  const [humanValidation, setHumanValidation] = useState<boolean>(false);
  const [error, seterror] = useState<boolean>(false);
  const [submitBtnDisableFlag, setSubmitBtnDiableFlag] =
    useState<boolean>(false);

  const router = useRouter();
  // ** Form default values
  const defaultValues = {
    fullName: "",
    email: "",
    phoneNo: "",
    location: "",
    password: "",
    confirmPassword: "",
  };

  // Schema
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 characters"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    phoneNo: yup
      .string()
      .required("Phone no is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      ),
    location: yup.string().required("Location is required"),
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
  // ** Handle
  const googlerecaptcha = (e: any) => {
    if (e) {
      setHumanValidation(true);
      seterror(false);
    } else {
    }
  };

  const onSubmit = async (data: any) => {
    // if (!humanValidation) {
    //   seterror(true);
    //   return;
    // }

    setSubmitBtnDiableFlag(true);
    const { confirmPassword, ...rest } = data;
    try {
      const res = await userRegister(rest);
      toast.success(res?.data?.message);
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
        <label>Get Started</label>
        <p>Create Your account now</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Full Name"
              />
            )}
          />

          {errors.fullName && (
            <span className=" text-[#F04520] px-2">
              {errors.fullName.message}
            </span>
          )}
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
            name="phoneNo"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Phone Number"
              />
            )}
          />
          {errors.phoneNo && (
            <span className=" text-[#F04520] px-2">
              {errors.phoneNo.message}
            </span>
          )}
          <Controller
            name="location"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Location"
              />
            )}
          />
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
                placeholder="Re enter Password"
              />
            )}
          />
          {errors.confirmPassword && (
            <span className=" text-[#F04520] px-2">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* {error && (
            <span className=" text-[#F04520] px-2">
              Please verify you are human
            </span>
          )} */}
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
            Sign Up
          </button>
        </form>
        <div className={styles.text}>
          <p>
            Have an account?
            <Link href="/login">
              <span> Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpViewRight;
