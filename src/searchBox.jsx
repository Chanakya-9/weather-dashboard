import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import "./searchBox.css";
import { useState } from "react";

export default function SearchBox() {
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    const KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const getInfo = async () => {
        try {
            const response = await fetch(
                `${URL}?q=${city}&appid=${KEY}&units=metric`
            );

            const data = await response.json();

            if (data.cod !== 200) {
                alert(data.message);
                return;
            }

            const result = {
                city: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                feelsLike: data.main.feels_like,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                weather: data.weather[0].main,
                description: data.weather[0].description,
                windSpeed: data.wind.speed,
            };

            setWeather(result);
            console.log(result);
        } catch (err) {
            console.log(err);
            alert("Something went wrong!");
        }
    };

    const search = (event) => {
        setCity(event.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();
        await getInfo();
        setCity("");
    };

    return (
        <div className="searchBox">
            <h3>🌤️ Find Your Weather</h3>

            <form onSubmit={submit}>
                <TextField
                    value={city}
                    onChange={search}
                    id="City"
                    label="City Name"
                    variant="outlined"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                >
                    Search
                </Button>
            </form>

            {weather && (
                <div className="weatherInfo"
                    // style={{
                    //     marginTop: "20px",
                    //     textAlign: "left",
                    // }}
                >
                    <h1>
                        {weather.city}, {weather.country}
                    </h1>

                    <p><strong>Temperature:</strong> {weather.temp} °C</p>
                    <p><strong>Feels Like:</strong> {weather.feelsLike} °C</p>
                    <p><strong>Humidity:</strong> {weather.humidity}%</p>
                    <p><strong>Pressure:</strong> {weather.pressure} hPa</p>
                    <p><strong>Min Temp:</strong> {weather.tempMin} °C</p>
                    <p><strong>Max Temp:</strong> {weather.tempMax} °C</p>
                    <p><strong>Weather:</strong> {weather.weather}</p>
                    <p><strong>Description:</strong> {weather.description}</p>
                    <p><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
                </div>
            )}
        </div>
    );
}