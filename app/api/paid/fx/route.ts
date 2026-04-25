import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://api.frankfurter.dev/v2/rates?base=USD&quotes=EUR,GBP,INR",
    { cache: "no-store" }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch FX rates" },
      { status: 502 }
    );
  }

  const data = await response.json();

  return NextResponse.json({
    product: "Paid FX Rates API",
    paymentModel: "x402",
    underlyingProvider: "Frankfurter",
    useCase: "Cross-border pricing, settlement comparison, and stablecoin commerce demos",
    data
  });
}