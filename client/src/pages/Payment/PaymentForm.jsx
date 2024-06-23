import { useState, useRef } from "react";
import "./PaymentForm.css";

import {
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  PayPalButtons,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";

const bookingId = "663932e41a996e6ece20ed48"; //Change this according to reservation data

async function createOrderCallback() {
  try {
    const response = await fetch(
      `http://localhost:8800/api/payment/order/${bookingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        // body: JSON.stringify({
        //   cart: [
        //     {
        //       roomId: "YOUR_PRODUCT_ID",
        //       trackingId: "65bea8893e200fba6078f5d8", // room owner Id
        //     },
        //   ],
        // }),
      }
    );

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

async function onApproveCallback(data, actions) {
  try {
    const response = await fetch(
      `http://localhost:8800/api/payment/order/${data.orderID}/${bookingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const orderData = await response.json();
    // Three cases to handle:
    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
    //   (2) Other non-recoverable errors -> Show a failure message
    //   (3) Successful transaction -> Show confirmation or thank you message

    const transaction =
      orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
      orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
    const errorDetail = orderData?.details?.[0];

    // this actions.restart() behavior only applies to the Buttons component
    if (errorDetail?.issue === "INSTRUMENT_DECLINED" && !data.card && actions) {
      // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
      return actions.restart();
    } else if (
      errorDetail ||
      !transaction ||
      transaction.status === "DECLINED"
    ) {
      // (2) Other non-recoverable errors -> Show a failure message
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
      // (3) Successful transaction -> Show confirmation or thank you message
      // Or go to another URL:  actions.redirect('thank_you.html');
      console.log(
        "Capture result",
        orderData,
        JSON.stringify(orderData, null, 2)
      );
      return `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`;
    }
  } catch (error) {
    return `Sorry, your transaction could not be processed...${error}`;
  }
}

const SubmitPayment = ({ onHandleMessage }) => {
  // Here declare the variable containing the hostedField instance
  const { cardFields } = usePayPalHostedFields();
  const cardHolderName = useRef(null);

  const submitHandler = () => {
    if (typeof cardFields.submit !== "function") return; // validate that \`submit()\` exists before using it
    //if (errorMsg) showErrorMsg(false);
    cardFields
      .submit({
        // The full name as shown in the card and billing addresss
        // These fields are optional for Sandbox but mandatory for production integration
        cardholderName: cardHolderName?.current?.value,
      })
      .then(async (data) => {
        data.trackingId = "65bea8893e200fba6078f5d8";
        onHandleMessage(await onApproveCallback(data));
      })
      .catch((orderData) => {
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

const Message = ({ content }) => {
  return <p>{content}</p>;
};

export const PaymentForm = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="form">
      <div>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical", //default value. Can be changed to horizontal
          }}
          createOrder={createOrderCallback}
          onApprove={async (data) => {
            setMessage(await onApproveCallback(data));
          }}
        />
      </div>

      <PayPalHostedFieldsProvider createOrder={createOrderCallback}>
        <div className="FormContainer">
          <PayPalHostedField
            id="card-number"
            hostedFieldType="number"
            options={{
              selector: "#card-number",
              placeholder: "Card Number",
            }}
            className="CardNumberInput"
          />
          <div className="container">
            <PayPalHostedField
              id="expiration-date"
              hostedFieldType="expirationDate"
              options={{
                selector: "#expiration-date",
                placeholder: "Expiration Date",
              }}
              className="input"
            />
            <PayPalHostedField
              id="cvv"
              hostedFieldType="cvv"
              options={{
                selector: "#cvv",
                placeholder: "CVV",
              }}
              className="input"
            />
          </div>
          <div className="container">
            <input
              id="card-holder"
              type="text"
              placeholder="Name on Card"
              className="input"
            />

            <input
              id="card-billing-address-country"
              type="text"
              placeholder="Country Code"
              className="input"
            />
          </div>
          <SubmitPayment onHandleMessage={setMessage} />
        </div>
      </PayPalHostedFieldsProvider>
      <Message content={message} />
    </div>
  );
};
