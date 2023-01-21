import React from "react";
import { PaymentCard } from "react-ui-cards";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import Park_Image_3 from "../../../../assets/fast.jpg";
import Park_Image_4 from "../../../../assets/receive.jpg";
import Park_Image_5 from "../../../../assets/map.jpg";
function PaymentCardView() {
  return (
    <>
      <PaymentCard
        backgroundPattern={"triangles"}
        issuerIcon={<FaCcMastercard color={"yellow"} size={35} />}
        background={"black"}
      />
      <PaymentCard
        issuerIcon={<FaCcVisa color="white" size={35} />}
        background={"	#1E90FF"}
        backgroundPattern={"triangles"}
      />
      <PaymentCard
        backgroundPattern={"triangles"}
        issuerIcon={<FaCcVisa color="white" size={35} />}
        background={"	#1E90FF"}
      />
      <PaymentCard
        backgroundPattern={"triangles"}
        issuerIcon={<FaCcMastercard color={"yellow"} size={35} />}
        background={"black"}
      />
    </>
  );
}

export default PaymentCardView;
