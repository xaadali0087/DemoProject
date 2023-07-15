import { SingleProductType } from "@/types/product";

const REPEAT_DEFAULT_VALUE = 1;

type PrimitiveType = string | number | boolean | SingleProductType;

export const repeatArr = (
  A: PrimitiveType[],
  repeat = REPEAT_DEFAULT_VALUE
): PrimitiveType[] => {
  if (!Array.isArray(A) || A.length === 0 || repeat < REPEAT_DEFAULT_VALUE) {
    throw new Error("Invalid input to the function");
  }

  let resultantArr: PrimitiveType[] = [];
  for (let i = 0; i < repeat; i++) {
    resultantArr = [...resultantArr, ...A];
  }

  return resultantArr;
};
