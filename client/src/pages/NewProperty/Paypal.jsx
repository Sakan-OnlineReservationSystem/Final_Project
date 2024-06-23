import React, { useEffect } from "react";

const Paypal = (ActionURL) => {
  useEffect(() => {
    // Load external script dynamically
    const script = document.createElement("script");
    script.src = "replaceActionURL.js";
    script.async = true;
    document.head.appendChild(script);

    // Load PayPal script
    (function (d, s, id) {
      var js,
        ref = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.async = true;
        js.src =
          "https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js";
        ref.parentNode.insertBefore(js, ref);
      }
    })(document, "script", "paypal-js");
  }, []);

  return (
    <div dir="ltr" style={{ textAlign: "left" }} trbidi="on">
      <a
        data-paypal-button="true"
        href={`${ActionURL}&displayMode=minibrowser`}
        target="PPFrame"
      >
        Sign up for PayPal
      </a>
    </div>
  );
};

export default Paypal;
