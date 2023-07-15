// ** Style File Imports
import styles from "./ViewRight.module.scss";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Next Imports
import Link from "next/link";

const ContactUsViewRight = () => {
  // ** Form default values
  const defaultValues = {
    email: "",
    name: "",
    message: "",
  };
  // Schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    name: yup.string().required(),
    message: yup.string().required(),
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <label>Contact Us</label>
        <p>
          Feel free to contact us any time. We will get back to you as soon as
          we can.
        </p>
        <form>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Name"
              />
            )}
          />
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
          <Controller
            name="message"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <textarea
                rows={5} 
                value={value}
                onChange={onChange}
                placeholder="Message"
              ></textarea>
            )}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsViewRight;
