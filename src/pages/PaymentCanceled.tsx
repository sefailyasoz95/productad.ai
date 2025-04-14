import React from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const PaymentCanceled = (props: Props) => {
  const { search } = useLocation();
  return <div>search: {search}</div>;
};

export default PaymentCanceled;
