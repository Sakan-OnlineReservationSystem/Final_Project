const fetch = require("node-fetch");
const catchAsync = require("../utils/catchAsync");
const Room = require("../models/Room.js");
const User = require("../models/User.js");
const Booking = require("../models/Booking.js");
const { bookingCheckout } = require("./booking.js");

const {
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  BN_CODE,
  PORT = 8888,
} = process.env;

const base = "https://api-m.sandbox.paypal.com";

const getAuthAssertionValue = (merchantIDOrEmail) => {
  let auth1 = Buffer.from('{"alg":"none"}').toString("base64");
  let auth2 = Buffer.from(
    `{"iss":${PAYPAL_CLIENT_ID},"payer_id":${merchantIDOrEmail}}`
  ).toString("base64");
  auth1 = auth1.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  auth2 = auth2.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  return `${auth1}.${auth2}.`;
};

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

const getMerchantId = async (tracking_id) => {
  const { PARTNER_MERCHANT_ID } = process.env;
  const token = await generateAccessToken();
  const response = await fetch(
    `https://api-m.sandbox.paypal.com/v1/customer/partners/${PARTNER_MERCHANT_ID}/merchant-integrations?tracking_id=${tracking_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data.merchant_id;
};

const generateClientToken = async (tracking_id) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v1/identity/generate-token`;
  const merchantId = await getMerchantId(tracking_id);
  const authAssertion = getAuthAssertionValue(merchantId);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": "en_US",
      "Content-Type": "application/json",
      "PayPal-Auth-Assertion": `${authAssertion}`,
      "PayPal-Partner-Attribution-Id": `${BN_CODE}`,
    },
  });
  return await handleResponse(response);
};

const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  const trackingId = cart.hotel.ownerId;
  const merchantId = await getMerchantId(trackingId);
  if (merchantId) {
    await User.findByIdAndUpdate(
      trackingId,
      { merchantId: merchantId },
      {
        runValidators: true,
      }
    );
  }
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart
  );
  const authAssertion = getAuthAssertionValue(merchantId);

  const purchaseAmount = cart.room.price;

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: cart._id,
        description: "from:24:1:2024,to:2:5:11",
        payee: {
          email_address: "sb-vpypx30369162@business.example.com",
          merchant_id: merchantId,
        },
        amount: {
          currency_code: "USD",
          value: purchaseAmount,
        },
        payment_instruction: {
          disbursement_mode: "DELAYED",
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "PayPal-Auth-Assertion": `${authAssertion}`,
      "PayPal-Partner-Attribution-Id": `${BN_CODE}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

const captureOrder = async (orderID, trackingId) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  const user = await User.findById(trackingId);
  const merchantId = user.merchantId;

  const authAssertion = getAuthAssertionValue(merchantId);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "PayPal-Auth-Assertion": `${authAssertion}`,
      "PayPal-Partner-Attribution-Id": `${BN_CODE}`,

      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });
  return handleResponse(response);
};

const getReferenceId = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}`;

  const merchantId = "HUTS5T7V458KS";
  const authAssertion = getAuthAssertionValue(merchantId);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "PayPal-Auth-Assertion": `${authAssertion}`,
      "PayPal-Partner-Attribution-Id": `${BN_CODE}`,

      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });
  const data = await response.json();
  return data.purchase_units.reference_id;
};

// send funds to seller

const DisburseFunds = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v1/payments/referenced-payouts`;
  const referenceId = getReferenceId(orderID);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Content-Encoding": "gzip",
      "PayPal-Partner-Attribution-Id": `${BN_CODE}`,
      Authorization: `Bearer ${accessToken}`,
      Prefer: "respond-async",
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    body: JSON.stringify({
      referenced_payouts: [
        { reference_id: `${referenceId}`, reference_type: "TRANSACTION_ID" },
      ],
    }),
  });
  console.log(await handleResponse(response));
  return handleResponse(response);
};

// refund money

const refundMoney = async (captureId) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/payments/captures/${captureId}/refund`;
  const merchantId = "HUTS5T7V458KS";
  const authAssertion = getAuthAssertionValue(merchantId);

  console.log(accessToken);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "PayPal-Auth-Assertion": `${authAssertion}`,
    },
    body: JSON.stringify({ amount: { value: "10.00", currency_code: "USD" } }),
  });
  console.log(await response);
  //console.log(await handleResponse(response));
  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

exports.generateClientToken = async (req, res, next) => {
  try {
    const { jsonResponse, httpStatusCode } = await generateClientToken(
      req.params.trackingId
    );
    console.log("clientToken", httpStatusCode);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    res.status(500).send({ error: "Failed to generate client token." });
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const booking = await Booking.findById(req.params.bookingId);
    console.log(booking);
    const { jsonResponse, httpStatusCode } = await createOrder(booking);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};

exports.captureOrder = async (req, res, next) => {
  try {
    const { orderID, bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    const { jsonResponse, httpStatusCode } = await captureOrder(
      orderID,
      booking.hotel.ownerId
    );
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};

exports.sayHello = async (req, res, next) => {
  console.log("Hello everyOne");
  res.status(200).json("Hello Every One");
};

exports.webhookCheckout = async (req, res, next) => {
  if (data.event_type == "CHECKOUT.ORDER.COMPLETED") bookingCheckout(req.body);
  res.status(200).json({ received: true });
};
