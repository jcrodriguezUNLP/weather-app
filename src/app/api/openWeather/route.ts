import { NextResponse } from "next/server";
import { RequestWithURL, ErrorWithMessage } from "@/utils/types"; // Asegúrate de que estas rutas sean correctas

const APIKey = process.env.OPENWEATHER_API_KEY as string;

export async function GET(request: RequestWithURL): Promise<NextResponse> {
  // Extraer parámetros de la URL
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
    // Construir la URL de la solicitud a la API de OpenWeather
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`
    );

    // Verificar el estado de la respuesta
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    // Convertir la respuesta a JSON
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: (error as ErrorWithMessage).message },
      { status: 500 }
    );
  }
}
