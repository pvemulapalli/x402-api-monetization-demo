import { headers } from "next/headers";
import EndpointCard from "@/components/EndpointCard";

export const metadata = {
  title: "x402 API Monetization Demo | Praveen Vemulapalli",
  description:
    "Demonstration of HTTP 402 Payment Required with USDC for pay-per-call APIs using x402 on Base Sepolia."
};

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host");

  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const endpoints = [
    {
      name: "FX Rates API",
      path: "/api/paid/fx",
      price: "$0.001",
      description:
        "USD to EUR, GBP, and INR rates. Useful for cross-border pricing, settlement comparisons, and commerce use cases."
    },
    {
      name: "Weather API",
      path: "/api/paid/weather",
      price: "$0.001",
      description:
        "Real-time weather data for Frisco, TX. Demonstrates how any Web2 API can become pay-per-call."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <section className="mx-auto max-w-5xl space-y-10">

        {/* HEADER */}
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">
            x402 API Monetization Demo
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Turning APIs into machine-payable products
          </h1>
          <p className="mt-4 text-slate-300 max-w-3xl">
            Traditional APIs require API keys, accounts, and billing systems.
            This demo shows a different model where APIs enforce payment
            directly using HTTP 402 and USDC.
          </p>
        </div>

        {/* FLOW */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">How it works</h2>
          <div className="mt-4 space-y-2 text-slate-300">
            <p>1. Client calls API endpoint</p>
            <p>
              2. API returns{" "}
              <span className="text-white font-semibold">
                HTTP 402 Payment Required
              </span>
            </p>
            <p>3. Response includes price, network, and wallet address</p>
            <p>4. Client completes payment</p>
            <p>5. Client retries request</p>
            <p>6. API returns data</p>
          </div>
        </div>

        {/* ENDPOINTS */}
        <div>
          <h2 className="text-2xl font-semibold">Available APIs</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {endpoints.map((endpoint) => (
              <EndpointCard
                key={endpoint.path}
                endpoint={endpoint}
                baseUrl={baseUrl}
              />
            ))}
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Why this matters</h2>
          <p className="mt-3 text-slate-300">
            This shifts API access from identity-based models (API keys and accounts)
            to payment-based access. Instead of signing up and managing credentials,
            clients can pay per request and immediately access resources.
          </p>

          <p className="mt-4 text-slate-300">
            This model is especially important for agentic systems, where software
            and AI agents need to discover, pay for, and consume APIs dynamically.
          </p>
        </div>

        {/* FOOTER */}
        <div className="text-sm text-slate-500 space-y-2">
          <p>
            Built with Next.js, x402, and USDC testnet on Base Sepolia.
          </p>

          <p>
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/praveenvemulapalli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Praveen Vemulapalli
            </a>
          </p>
        </div>

      </section>
    </main>
  );
}