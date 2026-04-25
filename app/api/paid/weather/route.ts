import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=33.1507&longitude=-96.8236&current=temperature_2m,wind_speed_10m",
    { cache: "no-store" }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 502 }
    );
  }

  const data = await response.json();

  return NextResponse.json({
    product: "Paid Weather API",
    paymentModel: "x402",
    underlyingProvider: "Open-Meteo",
    location: "Frisco, TX",
    useCase: "Generic Web2 data API converted into a machine-payable endpoint",
    data
  });
}