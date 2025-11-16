"use server" //file dijalankan pada server

import { WeatherData } from "@/types/weather" //import interface

export async function WeatherSearch(city: string): Promise<{
  data?: WeatherData; // jika success data akan disimpan di data
  error?: string; // jika error akan disimpan di error
}> {
  try {
    // validasi input
    if (!city.trim()) {
      return { error: "City name is required" };
    }
    // ambil data weather
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);

    // jika city tidak ada
    if (!res.ok) {
      throw new Error("City not found");
    }

    // jika berhasil
    const data: WeatherData = await res.json();
    console.log("Weather data", data);
    return { data };
    // jika error 
  } catch (error) {
    console.error("Error fetching weather data", error);
    return { error: (error as Error).message || "An error occurred" };
  }
}