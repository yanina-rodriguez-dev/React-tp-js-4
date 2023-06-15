import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Formulario = () => {
  const [ubicacion, setUbicacion] = useState("");
  const [pais, setPais] = useState("");
  const [clima, setClima] = useState(null);
  const [humedad, setHumedad] = useState(null);
  const [presion, setPresion] = useState(null);
  const [temperatura, setTemperatura] = useState(null);

  const obtenerClima = async () => {
    const API_KEY = "dfd5a069a264dc5d499f6b99c5e0b7df";
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${ubicacion},${pais}&limit=1&appid=${API_KEY}`;

    try {
      const geocodingResponse = await fetch(geocodingUrl);
      const geocodingData = await geocodingResponse.json();

      console.log("Geocoding Data:", geocodingData);

      if (geocodingResponse.ok && geocodingData.length > 0 && geocodingData[0].latlon) {
        const { lat, lon } = geocodingData[0].latlon;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        console.log("Weather Data:", weatherData);

        if (weatherResponse.ok) {
          setClima(weatherData);
          setHumedad(weatherData.main.humidity);
          setPresion(weatherData.main.pressure);
          setTemperatura(weatherData.main.temp);
        } else {
          setClima(null);
          setHumedad(null);
          setPresion(null);
          setTemperatura(null);
        }
      } else {
        setClima(null);
        setHumedad(null);
        setPresion(null);
        setTemperatura(null);
      }
    } catch (error) {
      console.log(error);
      setClima(null);
      setHumedad(null);
      setPresion(null);
      setTemperatura(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    obtenerClima();
  };

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="ubicacion">
          <Form.Label>Ubicación</Form.Label>
          <Form.Control
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="pais">
          <Form.Label>País</Form.Label>
          <Form.Control
            type="text"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" className="m-3" type="submit">
          Consultar
        </Button>
      </Form>

      {clima && (
        <div>
          <h2>{ubicacion}</h2>
          <p>Temperatura actual: {temperatura}°C</p>
          <p>Descripción: {clima.weather[0].description}</p>
          <p>Humedad: {humedad}</p>
          <p>Presión: {presion}</p>
        </div>
      )}
    </section>
  );
};

export default Formulario;

