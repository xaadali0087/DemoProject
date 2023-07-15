// ** Style File Import
import styles from "./orderInformation.module.scss";

// ** Custom  Component
import Accordion from "@/components/common/accordion";
const OrderInformation = () => {
  const accordionData = [
    {
      title: "Return Policy",
      content: `This is our example return policy which is everything you need to know about our returns.`,
    },
    {
      title: "Shipping Options",
      content: `This is our example return policy which is everything you need to know about our returns.`,
    },
    {
      title: "Shipping Options",
      content: `This is our example return policy which is everything you need to know about our returns.`,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <label>Order Information</label>
      <div className=" w-full my-2 border-gray-200 border"></div>
      {accordionData.map((item, index) => (
        <Accordion key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default OrderInformation;
