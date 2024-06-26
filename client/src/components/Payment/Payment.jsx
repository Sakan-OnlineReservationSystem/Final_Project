import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PaymentForm } from "./PaymentForm";
import { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
const Payment = ({ bookingId }) => {
  const [clientToken, setClientToken] = useState(null);
  const initialOptions = {
    "client-id":
      "AbP_S3OC9DpBLwDncRTfIzHFitAz7pgPODVIX0yi0x41dIYURt2YcOGLmIheIYppV9Ovdul9P8sTBH8S",
    "data-client-token": clientToken,
    components: "hosted-fields,buttons",
    "enable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_ac",
  };
  localStorage.setItem("Booking", bookingId);
  useEffect(() => {
    (async () => {
      const response = await fetch(`${apiUrl}/api/payment/token/${bookingId}`, {
        method: "GET",
      });
      const { client_token } = await response.json();
      setClientToken(client_token);
    })();
  }, [bookingId]);
  return (
    <>
      {clientToken ? (
        <PayPalScriptProvider options={initialOptions}>
          <PaymentForm bookingId={bookingId} />
        </PayPalScriptProvider>
      ) : (
        <h4>WAITING ON CLIENT TOKEN</h4>
      )}
    </>
  );
};

export default Payment;
