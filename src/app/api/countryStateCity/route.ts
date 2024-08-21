import { NextResponse } from "next/server";
import { RequestWithURL, ErrorWithMessage } from "@/utils/types"; // Ajusta la ruta según tu estructura

const APIKey = process.env.COUNTRYSTATECITY_API_KEY as string;

export async function GET(request: RequestWithURL): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const latitude: string | null = searchParams.get("latitude");
  const longitude: string | null = searchParams.get("longitude");

  // Validar parámetros
  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "Missing latitude or longitude" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`
    );

    // Verificar el estado de la respuesta
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: (error as ErrorWithMessage).message },
      { status: 500 }
    );
  }
}
