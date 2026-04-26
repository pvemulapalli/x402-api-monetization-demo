"use client";

import { useState } from "react";

export default function EndpointCard({ endpoint, baseUrl }: any) {
  const [result, setResult] = useState<any>(null);

  const curlCommand = `curl -i ${baseUrl}${endpoint.path}`;

  async function testEndpoint() {
    const res = await fetch(endpoint.path);

    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key] = value;
    });

    let decodedPayment: any = null;

    if (headers["payment-required"]) {
      try {
        const decoded = atob(headers["payment-required"]);
        decodedPayment = JSON.parse(decoded);
      } catch (e) {
        decodedPayment = { error: "Failed to decode payment header" };
      }
    }

    setResult({
      status: res.status,
      headers,
      decodedPayment
    });
  }

  function copyCurl() {
    navigator.clipboard.writeText(curlCommand);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold">{endpoint.name}</h3>
      <p className="mt-2 text-slate-300">{endpoint.description}</p>

      <p className="mt-4 text-sm text-slate-400">
        Price: {endpoint.price} (USDC on Base Sepolia)
      </p>

      <code className="mt-4 block rounded bg-slate-800 p-3 text-sm overflow-x-auto">
        {curlCommand}
      </code>

      <div className="mt-4 flex gap-3">
        <button
          onClick={copyCurl}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-sm"
        >
          Copy curl
        </button>

        <button
          onClick={testEndpoint}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 text-sm"
        >
          Test endpoint
        </button>
      </div>

      {/* RESULT PANEL */}
      {result && (
        <div className="mt-6 rounded bg-slate-800 p-4 text-sm space-y-3">
          <div>
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-yellow-400">{result.status}</span>
          </div>

          {result.decodedPayment && (
            <div>
              <div className="font-semibold mb-2">Payment Details:</div>
              <div className="text-slate-300 space-y-1">
                {(() => {
                  const payment = result.decodedPayment?.accepts?.[0];
                  if (!payment) return null;

                  const rawAmount = Number(payment.amount || 0);
                  const usdcAmount = rawAmount / 1_000_000;

                  const formattedAmount =
                    "$" + usdcAmount.toFixed(6).replace(/\.?0+$/, "") + " USDC";

                  const networkLabel =
                    payment.network === "eip155:84532"
                      ? "Base Sepolia (Testnet)"
                      : payment.network;

                  const wallet = payment.payTo || "";

                  const shortWallet =
                    wallet.length > 10
                      ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                      : wallet;

                  function copyWallet() {
                    navigator.clipboard.writeText(wallet);
                  }

                  return (
                    <div>

                      <div className="text-slate-300 space-y-2">

                        <div>
                          Price: {formattedAmount}
                        </div>

                        <div>
                          Network: {networkLabel} - {result.decodedPayment.accepts?.[0]?.network}
                        </div>

                        <div className="flex items-center gap-2">
                          <span>Wallet: {shortWallet}</span>
                          <button
                            onClick={copyWallet}
                            className="text-xs px-2 py-1 bg-slate-700 rounded hover:bg-slate-600"
                          >
                            Copy
                          </button>
                        </div>

                        <div>
                          Timeout: {payment.maxTimeoutSeconds}s
                        </div>

                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          <details>
            <summary className="cursor-pointer text-blue-400">
              Show raw headers
            </summary>
            <pre className="mt-2 text-xs overflow-x-auto">
              {JSON.stringify(result.headers, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}