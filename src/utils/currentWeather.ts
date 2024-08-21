import { WeatherData, Coordinates } from "@/utils/types";

export async function getCurrentWeather(
  coordinates: Coordinates
): Promise<WeatherData> {
  const endpoint = `/api/openWeather?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Error fetching weather data");
    }
    return (await response.json()) as WeatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
