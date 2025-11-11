"use client";

import { Container, Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { WeatherSearch } from "./actions";
import { useState } from "react";
import { WeatherData } from "../types/weather";

function SubmitButton() {
  return (
    <Button variant="primary" type="submit" className="w-100">
      Get Weather
    </Button>
  );
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const WeatherSearchData = async (formData: FormData) => {
    setError("");
    const city = formData.get("city")?.toString() || "";
    console.log("Weather search initiated");

    const { data, error: weatherError } = await WeatherSearch(city);

    if (weatherError) {
      setError(weatherError);
      setWeather(null);
    }

    if (data) {
      setWeather(data);
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: "#4d91f8" }}>

      <Form action={WeatherSearchData} className="d-flex flex-column align-items-center p-4 rounded" style={{
          backgroundColor: "white",
          width: '300px'}}>
        <Form.Group className="mb-3 text-center">
          <Form.Label>Input City Name</Form.Label>
          <Form.Control type="text" placeholder="Enter city name" className="mb-3" name="city"/>
        </Form.Group>
        <SubmitButton />
      </Form>

      {error && <p className="text-danger mt-3">{error}</p>}

      {weather && (
        <Card className="mt-4" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{weather.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"> {weather.weather[0].main} </Card.Subtitle>
            <Card.Text>
              Temperature: {weather.main.temp}°C<br />
              Feels Like: {weather.main.feels_like}°C<br />
              Humidity: {weather.main.humidity}%<br />
              Wind Speed: {weather.wind.speed} m/s<br />
              Description: {weather.weather[0].description}<br />
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon"/>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}