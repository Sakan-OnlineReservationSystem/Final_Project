import { useState, useRef, useEffect } from "react";
import "./PaymentForm.css";
import {
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  PayPalButtons,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;
async function createOrderCallback(bookingId) {
  try {
    const response = await fetch(`${apiUrl}/api/payment/order/${bookingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const orderData = await response.json();

    if (orderData.id) {
      return orderData.id;
    } else {
      const errorDetail = orderData?.details?.[0];
      const errorMessage = errorDetail
        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
        : JSON.stringify(orderData);

      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
    return `Could not initiate PayPal Checkout...${error}`;
  }
}

async function onApproveCallback(data, actions, bookingId) {
  try {
    const response = await fetch(
      `${apiUrl}/api/payment/order/${data.orderID}/${bookingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const orderData = await response.json();
    const transaction =
      orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
      orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
    const errorDetail = orderData?.details?.[0];

    if (errorDetail?.issue === "INSTRUMENT_DECLINED" && !data.card && actions) {
      return actions.restart();
    } else if (
      errorDetail ||
      !transaction ||
      transaction.status === "DECLINED"
    ) {
      let errorMessage;
      if (transaction) {
        errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
      } else if (errorDetail) {
        errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
      } else {
        errorMessage = JSON.stringify(orderData);
      }

      throw new Error(errorMessage);
    } else {
      console.log(
        "Capture result",
        orderData,
        JSON.stringify(orderData, null, 2)
      );
      return `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`;
    }
  } catch (error) {
    toast.error("Sorry, your transaction could not be processed...");

    return `Sorry, your transaction could not be processed...${error}`;
  }
}

const SubmitPayment = ({ onHandleMessage, bookingId }) => {
  const { cardFields } = usePayPalHostedFields();
  const cardHolderName = useRef(null);

  const submitHandler = () => {
    if (typeof cardFields.submit !== "function") return;
    cardFields
      .submit({
        cardholderName: cardHolderName?.current?.value,
      })
      .then(async (data) => {
        data.trackingId = "65bea8893e200fba6078f5d8";
        onHandleMessage(await onApproveCallback(data, null, bookingId));
      })
      .catch((orderData) => {
        toast.error("Sorry, your transaction could not be processed...");
        onHandleMessage(
          `Sorry, your transaction could not be processed...${JSON.stringify(
            orderData
          )}`
        );
      });
  };

  return (
    <button onClick={submitHandler} className="ActionBtn">
      Pay
    </button>
  );
};

export const PaymentForm = ({ bookingId }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    toast.error(message);
  }, [message]);

  return (
    <div className="form">
      <PayPalHostedFieldsProvider
        createOrder={() => createOrderCallback(bookingId)}
      >
        <div className="FormContainer">
          <div className="w-full text-center font-bold text-2xl text-[var(--main-color)] mb-3">
            Paypal wallet
          </div>
          <label htmlFor="card-number">Card number</label>
          <PayPalHostedField
            id="card-number"
            hostedFieldType="number"
            options={{
              selector: "#card-number",
              placeholder: "Card Number",
            }}
            className="CardNumberInput"
          />
          <label htmlFor="expiration-date">Expiration date</label>
          <PayPalHostedField
            id="expiration-date"
            hostedFieldType="expirationDate"
            options={{
              selector: "#expiration-date",
              placeholder: "Expiration Date",
            }}
            className="input"
          />
          <label htmlFor="cvv">CVV</label>

          <PayPalHostedField
            id="cvv"
            hostedFieldType="cvv"
            options={{
              selector: "#cvv",
              placeholder: "CVV",
            }}
            className="input"
          />
          <label htmlFor="card-holder">User name on card</label>

          <input
            id="card-holder"
            type="text"
            placeholder="Name on Card"
            className="input"
          />
          <label htmlFor="card-billing-address-country">Country Code</label>

          <input
            id="card-billing-address-country"
            type="text"
            placeholder="Country Code"
            className="input"
          />

          <SubmitPayment onHandleMessage={setMessage} bookingId={bookingId} />
        </div>
      </PayPalHostedFieldsProvider>

      <div className="flex items-center gap-3">
        <div className="bg-slate-500 h-0.5 w-full"></div> OR
        <div className="bg-slate-500 h-0.5 w-full"></div>
      </div>
      <div>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
          }}
          createOrder={() => createOrderCallback(bookingId)}
          onApprove={async (data, actions) => {
            setMessage(await onApproveCallback(data, actions, bookingId));
          }}
        />
      </div>
    </div>
  );
};
