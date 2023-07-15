// ** Style File Import
import styles from "./profileUpdate.module.scss";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThreeDots } from "react-loader-spinner";

// React Import
import { useEffect, useState } from "react";

// ** Service
import { updateUserProfile } from "@/services/user.service";
import { toast } from "react-hot-toast";

// ** Custom Error Handle
import modifyError from "@/helper";

// ** Types
import { UserType } from "@/types/user";

interface Props {
  data: UserType;
}

const ProfileUpdate = ({ data }: Props) => {
  // ** State
  const [submitBtnDisableFlag, setSubmitBtnDiableFlag] =
    useState<boolean>(false);
  // ** Form default values
  const defaultValues = {
    fullName: "",
    email: "",
    phoneNo: "",
    location: "",
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

  // ** Hook
  useEffect(() => {
    setValue("fullName", data?.fullName);
    setValue("email", data?.email);
    setValue("phoneNo", data?.phoneNo);
    setValue("location", data?.location);
  }, []);

  const onSubmit = async (FieldData: any) => {
    setSubmitBtnDiableFlag(true);
    try {
      const { email, ...rest } = FieldData;
      const res = await updateUserProfile({ ...rest });
      toast.success(res?.data?.message);
      setSubmitBtnDiableFlag(false);
    } catch (error) {
      modifyError(error);
      setSubmitBtnDiableFlag(false);
    }
  };
  return (
    <div className={styles.formWrapper}>
      <div>
        <label className={styles.inputLabel}>Name</label>
        <Controller
          name="fullName"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <input
              type="text"
              className={styles.inputField}
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errors.fullName && (
          <span className=" text-[#F04520] px-2">
            {errors.fullName.message}
          </span>
        )}
      </div>
      <div>
        <label className={styles.inputLabel}>Email</label>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <input
              type="email"
              disabled
              className={styles.inputField}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div>
        <label className={styles.inputLabel}>Mobile Number</label>
        <Controller
          name="phoneNo"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <input
              type="number"
              className={styles.inputField}
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errors.phoneNo && (
          <span className=" text-[#F04520] px-2">{errors.phoneNo.message}</span>
        )}
      </div>
      <div>
        <label className={styles.inputLabel}>Address</label>
        <Controller
          name="location"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <input
              type="text"
              className={styles.inputField}
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errors.location && (
          <span className=" text-[#F04520] px-2">
            {errors.location.message}
          </span>
        )}
      </div>
      <div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={submitBtnDisableFlag}>
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
          Update
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
