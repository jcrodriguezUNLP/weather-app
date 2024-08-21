import { NextResponse } from "next/server";
import { RequestWithURL, ErrorWithMessage } from "@/utils/types"; // Ajusta la ruta según tu estructura

const APIKey = process.env.GEOCAGE_API_KEY as string;

export async function GET(request: RequestWithURL): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const city: string | null = searchParams.get("city")?.trim() || null;
  const state: string | null = searchParams.get("state")?.trim() || null;
  const country: string | null = searchParams.get("country")?.trim() || null;

  // Inicializa locationQuery con una cadena vacía
  let locationQuery: string = "";

  if (city || state || country) {
    if (city && state && country) {
      locationQuery = `${city}, ${state}, ${country}`;
    } else if (city && state) {
      locationQuery = `${city}, ${state}`;
    } else if (city && country) {
      locationQuery = `${city}, ${country}`;
    } else if (state && country) {
      locationQuery = `${state}, ${country}`;
    } else if (city) {
      locationQuery = city;
    } else if (state) {
      locationQuery = state;
    } else if (country) {
      locationQuery = country;
    }
  } else {
    return NextResponse.json(
      { error: "Not enough parameters" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        locationQuery
      )}&key=${APIKey}`
    );

    // Verifica el estado de la respuesta
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching location data:", error);
    return NextResponse.json(
      { error: (error as ErrorWithMessage).message },
      { status: 500 }
    );
  }
}
