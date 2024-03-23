const User = require("../models/User");
const fetch = require("node-fetch");
const catchAsync = require("../utils/catchAsync");

//const { , PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

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

exports.callReferralsApi = catchAsync(async (req, res, next) => {
  const token = await generateAccessToken();
  const sellerId = req.params.userId;
  // check if user exists

  const user = await User.findById(sellerId);
  if (!user) {
    return next(new AppError("there is no user with this is", 401));
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
        products: ["EXPRESS_CHECKOUT"],
      }),
    }
  );
  const data = await response.json();
  const action_url = data["links"][1]["href"];
  res.status(201).json({
    status: "success",
    action_url,
    token,
    data,
  });
});

exports.getMerchantId = async (req, res, next) => {
  const tracking_id = req.params.tracking_id;
  console.log(tracking_id);
  const data = await TrackSellerStatus(tracking_id);
  res.status(201).json({
    status: "success",
    data,
  });
};

const getMerchantId = async (tracking_id) => {
  console.log(tracking_id);
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
