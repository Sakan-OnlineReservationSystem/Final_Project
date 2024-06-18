import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PaymentForm } from "./PaymentForm";
import { useState, useEffect } from "react";

const Payment = () => {
  const [clientToken, setClientToken] = useState(null);

  const initialOptions = {
    "client-id":
      "AbP_S3OC9DpBLwDncRTfIzHFitAz7pgPODVIX0yi0x41dIYURt2YcOGLmIheIYppV9Ovdul9P8sTBH8S",
    "data-client-token": clientToken,
    components: "hosted-fields,buttons",
    "enable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_ac",
  };

  useEffect(() => {
    (async () => {
      const bookingId = "663a3ecd4498e69447e4a60f";
      const response = await fetch(`/api/payment/token/${bookingId}`, {
        method: "GET",
      });
      const { client_token } = await response.json();
      setClientToken(client_token);
    })();
  }, []);
  return (
    <>
      {clientToken ? (
        <PayPalScriptProvider options={initialOptions}>
          <PaymentForm />
        </PayPalScriptProvider>
      ) : (
        <h4>WAITING ON CLIENT TOKEN</h4>
      )}
    </>
  );
};

export default Payment;
