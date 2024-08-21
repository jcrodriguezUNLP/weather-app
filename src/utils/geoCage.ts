export async function searchLocation(
  city: string,
  state: string,
  country: string
): Promise<any> {
  const endpoint = `/api/geoCage?city=${city}&state=${state}&country=${country}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Error fetching location data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
}
