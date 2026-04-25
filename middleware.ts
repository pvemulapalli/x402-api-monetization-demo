import { paymentProxy, x402ResourceServer } from "@x402/next";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { HTTPFacilitatorClient } from "@x402/core/server";

const payTo = process.env.X402_PAY_TO as `0x${string}`;

if (!payTo) {
  throw new Error("Missing X402_PAY_TO environment variable");
}

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://x402.org/facilitator"
});

const server = new x402ResourceServer(facilitatorClient).register(
  "eip155:84532",
  new ExactEvmScheme()
);

export const middleware = paymentProxy(
  {
    "/api/paid/fx": {
      accepts: [
        {
          scheme: "exact",
          price: "$0.001",
          network: "eip155:84532",
          payTo
        }
      ],
      description:
        "Paid FX rates API returning USD exchange rates for EUR, GBP, and INR.",
      mimeType: "application/json"
    },
    "/api/paid/weather": {
      accepts: [
        {
          scheme: "exact",
          price: "$0.001",
          network: "eip155:84532",
          payTo
        }
      ],
      description:
        "Paid weather API returning current temperature and wind data for Frisco, Texas.",
      mimeType: "application/json"
    }
  },
  server
);

export const config = {
  matcher: ["/api/paid/:path*"]
};