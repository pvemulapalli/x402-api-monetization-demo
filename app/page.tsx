const endpoints = [
  {
    name: "FX Rates API",
    path: "/api/paid/fx",
    price: "$0.001",
    description:
      "USD to EUR, GBP, and INR rates for cross-border commerce demos."
  },
  {
    name: "Weather API",
    path: "/api/paid/weather",
    price: "$0.001",
    description:
      "Current weather data for Frisco, TX, used to show any Web2 API can become pay-per-call."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <section className="mx-auto max-w-4xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">
            x402 API Monetization Demo
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Turning free Web2 APIs into machine-payable endpoints
          </h1>
          <p className="mt-4 text-slate-300">
            This project demonstrates how APIs can use HTTP 402 Payment Required
            and USDC testnet payments to move from API-key access to pay-per-call
            access.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {endpoints.map((endpoint) => (
            <div
              key={endpoint.path}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-xl font-semibold">{endpoint.name}</h2>
              <p className="mt-2 text-slate-300">{endpoint.description}</p>
              <p className="mt-4 text-sm text-slate-400">
                Price: {endpoint.price} on Base Sepolia
              </p>
              <code className="mt-3 block rounded bg-slate-800 p-3 text-sm">
                GET {endpoint.path}
              </code>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Test commands</h2>
          <pre className="mt-4 overflow-x-auto rounded bg-slate-800 p-4 text-sm">
{`curl -i http://localhost:3000/api/paid/fx

curl -i http://localhost:3000/api/paid/weather`}
          </pre>
        </div>
      </section>
    </main>
  );
}