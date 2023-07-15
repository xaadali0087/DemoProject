// Style File Import
import styles from "./shipping.module.scss";

// ** Custom Component
import CheckoutBar from "../checkoutBar";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Country, City, ICountry } from "country-state-city";

// ** React Import
import { useEffect, useState } from "react";

// ** Redux Import
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setShippingInfo } from "@/store/reducers/cartSlice";

const Shipping = (props: any) => {
  // ** State
  const [cityList, setCityList] = useState([]);
  const countryList: ICountry[] = Country.getAllCountries();
  const { shippingInfo } = useSelector((state: RootState) => state.cart);
  // ** Props
  const { value, setvalue, data } = props;
  // ** Form default values
  const defaultValues = {
    firstName: "",
    lastName: "",
    address: "",
    landMark: "",
    city: "",
    country: "",
    zipCode: "",
    note: "",
  };
  // Schema
  const schema = yup.object().shape({
    firstName: yup.string().required("firstName is required"),
    lastName: yup.string().required(),
    address: yup.string().required("Location is required"),
    landMark: yup.string().optional(),
    country: yup.string().required(),
    city: yup.string().required(),
    zipCode: yup.string().required(),
    note: yup.string().optional(),
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

  const getCitiesSelectedCountry = () => {
    const CitiesArr = City.getCitiesOfCountry(watch().country);
    const citiesSet = new Set();

    CitiesArr?.map((city) => {
      citiesSet.add(city.name);
    });
    const distinctUSACities: any = Array.from(citiesSet);
    setCityList(distinctUSACities);
  };
  // ** Hook
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (watch().country != "") {
      getCitiesSelectedCountry();
    }
  }, [watch().country]);
  const onSubmit = async (data: any) => {
    dispatch(setShippingInfo(data));
    setvalue(1);
  };
  useEffect(() => {
    if (shippingInfo) {
      setValue("firstName", shippingInfo?.firstName);
      setValue("lastName", shippingInfo?.lastName);
      setValue("address", shippingInfo?.address);
      setValue("landMark", shippingInfo?.landMark);
      setValue("country", shippingInfo?.country);
      setValue("city", shippingInfo?.city);
      setValue("zipCode", shippingInfo?.zipCode);
      setValue("note", shippingInfo?.note);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <label className={styles.checkoutTitle}>Checkout</label>
      <div className="w-full my-7">
        <CheckoutBar value={value} />
      </div>

      <label className={styles.title}>Shipping Information</label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.box}>
          <div className=" w-full sm:w-[50%]">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <input
                  type="text"
                  value={value}
                  className={styles.inputField}
                  onChange={onChange}
                  placeholder="First Name"
                />
              )}
            />
            {errors.firstName && (
              <span className=" text-[#F04520] px-2 text-[12px]">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className=" w-full sm:w-[50%]">
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <input
                  type="text"
                  value={value}
                  className={styles.inputField}
                  onChange={onChange}
                  placeholder="Last Name"
                />
              )}
            />
            {errors.lastName && (
              <span className=" text-[#F04520] px-2 text-[12px]">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                type="text"
                value={value}
                className={styles.inputField}
                onChange={onChange}
                placeholder="Address"
              />
            )}
          />
          {errors.address && (
            <span className=" text-[#F04520] px-2 text-[12px]">
              {errors.address.message}
            </span>
          )}
        </div>
        <Controller
          name="landMark"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <input
              type="text"
              value={value}
              className={styles.inputField}
              onChange={onChange}
              placeholder="Apartment, suite, etc (optional)"
            />
          )}
        />
        <div>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <select name="country" value={value} onChange={onChange}>
                <option value={""}>Country</option>
                {countryList.map((country, index) => (
                  <option key={index} value={country?.isoCode}>
                    {country?.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.country && (
            <span className=" text-[#F04520] px-2 text-[12px]">
              Please select country
            </span>
          )}
        </div>
        <div className={styles.box}>
          <div className="w-full sm:w-[50%]">
            <Controller
              name="city"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <select name="city" value={value} onChange={onChange}>
                  <option value={""}>City</option>
                  {cityList?.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.city && (
              <span className=" text-[#F04520] px-2 text-[12px]">
                Please select city
              </span>
            )}
          </div>
          <div className="w-full sm:w-[50%]">
            <Controller
              name="zipCode"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <input
                  type="number"
                  value={value}
                  className={styles.inputField}
                  onChange={onChange}
                  placeholder="Zipcode"
                />
              )}
            />
            {errors.zipCode && (
              <span className=" text-[#F04520] px-2 text-[12px]">
                {errors.zipCode.message}
              </span>
            )}
          </div>
        </div>
        <Controller
          name="note"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <input
              type="text"
              value={value}
              className={styles.inputField}
              onChange={onChange}
              placeholder="Optional"
            />
          )}
        />
        <div className={styles.checkBoxWrapper}>
          <input className={styles.checkBox} type="checkbox" value="1" />
          <label>Save contact information</label>
        </div>
        <button type="submit" disabled={data?.length === 0}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default Shipping;
