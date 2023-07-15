// ** Style File Imports
import styles from "./ViewRight.module.scss";

// ** Third Party Imports
import OtpInput from "react-otp-input";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Custom Error Handle
import modifyError from "@/helper";

// ** Next Import
import { useRouter } from "next/router";

// ** Service
import { forgotPassword } from "@/services/user.service";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "react-hot-toast";
import { saveVerifyCode } from "@/store/reducers/userSlice";

const CodeVerifyViewRight = () => {
  const router = useRouter();
  // Store
  const dispatch = useDispatch();

  const { forgotEmail } = useSelector((state: RootState) => state.user);
  // ** Form default values
  const defaultValues = {
    otp: "",
  };
  // Schema
  const schema = yup.object().shape({
    otp: yup
      .string()
      .matches(/^[0-9]+$/, "OPT must be number")
      .length(6, "OTP must be 6 digits")
      .required(),
  });
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // ** Handle
  const sendAgainCode = async () => {
    try {
      const res = await forgotPassword(forgotEmail);
      toast.success(res?.data?.message);
    } catch (error) {
      modifyError(error);
    }
  };
  const onSubmit = (data: any) => {
    dispatch(saveVerifyCode(data?.otp));
    router.push("/new-password");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label>Enter verification code</label>
        <p>We have just sent a verification code to abc@mail.com</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="otp"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <OtpInput
                value={value}
                inputType="text"
                placeholder="123456"
                onChange={onChange}
                numInputs={6}
                inputStyle={styles.otp}
                renderInput={(props) => <input {...props} />}
              />
            )}
          />
          {errors.otp && (
            <span className="text-red-700 px-5">{errors.otp.message}</span>
          )}
          <div className={styles.text}>
            <p>
              Didn’t receive code?
              <span onClick={sendAgainCode}> Send again</span>
            </p>
          </div>
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default CodeVerifyViewRight;
