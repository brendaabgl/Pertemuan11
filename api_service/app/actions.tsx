"use server"

import { WeatherData } from "@/types/weather"

export async function WeatherSearch(city: string): Promise<{
  data?: WeatherData;
  error?: string;
}> {
  try {
    if (!city.trim()) {
      return { error: "City name is required" };
    }
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);

    if (!res.ok) {
      throw new Error("City not found");
    }

    const data: WeatherData = await res.json();
    console.log("Weather data", data);
    return { data };
  } catch (error) {
    console.error("Error fetching weather data", error);
    return { error: (error as Error).message || "An error occurred" };
  }
}