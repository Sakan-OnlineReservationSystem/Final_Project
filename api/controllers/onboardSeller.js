const User = require("../models/User");
const fetch = require("node-fetch");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Hotel = require("../models/Hotel");

const base = "https://api-m.sandbox.paypal.com";

const {
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  BN_CODE,
  PORT = 8888,
} = process.env;

const getAuthAssertionValue = (merchantIDOrEmail) => {
  let auth1 = Buffer.from('{"alg":"none"}').toString("base64");
  let auth2 = Buffer.from(
    `{"iss":${PAYPAL_CLIENT_ID},"payer_id":${merchantIDOrEmail}}`
  ).toString("base64");
  auth1 = auth1.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  auth2 = auth2.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  return `${auth1}.${auth2}.`;
};

exports.getOrder = async (req, res, next) => {
  const accessToken = await generateAccessToken();
  console.log(accessToken);
  const url = `https://api.sandbox.paypal.com/v1/payments/sale/${req.params.orderId}`;

  const merchantId = "LNBSZ3Z88FCFL";
  const authAssertion = getAuthAssertionValue(merchantId);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // "PayPal-Auth-Assertion": `${authAssertion}`,
      // "PayPal-Partner-Attribution-Id": `${BN_CODE}`,
    },
  });
  console.log(response);
  const data = await response.json();
  res.status(201).json({
    status: "success",
    data,
  });
};

exports.callReferralsApi = catchAsync(async (req, res, next) => {
  const token = await generateAccessToken();
  const sellerId = req.params.tracking_id;
  // check if user exists

  const user = await User.findById(sellerId);
  if (!user) {
    return next(new AppError("there is no user with this id", 401));
  }

  const response = await fetch(
    "https://api-m.sandbox.paypal.com/v2/customer/partner-referrals",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        preferred_language_code: "en-US",
        tracking_id: `${sellerId}`,
        partner_config_override: {
          partner_logo_url:
            "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
          return_url: "https://final-project-sigma-ochre.vercel.app/",
          return_url_description:
            "the url to return the merchant after the paypal onboarding process.",
          action_renewal_url: "https://testenterprises.com/renew-exprired-url",
          show_add_credit_card: true,
        },
        operations: [
          {
            operation: "API_INTEGRATION",
            api_integration_preference: {
              rest_api_integration: {
                integration_method: "PAYPAL",
                integration_type: "THIRD_PARTY",
                third_party_details: {
                  features: ["PAYMENT", "REFUND"],
                },
              },
            },
          },
        ],
        legal_consents: [{ type: "SHARE_DATA_CONSENT", granted: true }],
        products: ["PPCP"],
      }),
    }
  );
  if (response.status != 201) {
    res.status(response.status).json({
      status: "fail",
      message: "please try again",
    });
    return;
  }
  const data = await response.json();
  const action_url = data["links"][1]["href"];
  res.status(201).json({
    status: "success",
    action_url,
  });
});

exports.getMerchantId = catchAsync(async (req, res, next) => {
  const tracking_id = req.params.tracking_id;
  const data = await TrackSellerStatus(tracking_id);
  res.status(200).json({
    data,
  });
});

exports.checkMerchantState = async (req, res, next) => {
  const hotel = await Hotel.findById(req.body.hotel).select("ownerId");
  const data = await TrackSellerStatus(hotel.ownerId);
  if (!data || !data.payments_receivable || !data.primary_email_confirmed) {
    return next(
      new AppError(
        "Error while check merchant vertification, please try again",
        404
      )
    );
  } else {
    next();
  }
};

// exports.isMerchantVertified = async (tracking_id) => {
//   try {
//     if (!tracking_id)
//       return next(new AppError("Please provide seller id", 401));
//     const data = await TrackSellerStatus(tracking_id);
//     if (!data || !data.payments_receivable || !data.primary_email_confirmed) {
//       return false;
//     }
//     return true;
//   } catch {
//     return next(
//       new AppError(
//         "Error while check merchant vertification, please try again",
//         404
//       )
//     );
//   }
// };

const generateAccessToken = async () => {
  try {
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
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

const TrackSellerStatus = async (tracking_id) => {
  try {
    const { PARTNER_MERCHANT_ID } = process.env;
    const token = await generateAccessToken();
    if (!token) {
      return "Failed to generate access token";
    }
    const merchant_id = await getMerchantId(tracking_id);
    const response = await fetch(
      `https://api-m.sandbox.paypal.com/v1/customer/partners/${PARTNER_MERCHANT_ID}/merchant-integrations/${merchant_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Track seller onboarding status", error);
  }
};
