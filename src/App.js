import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      weather: null,
      error: null,
    };
  }

  fetchWeaterData = () => {
    const { city } = this.state;
    if (!city) return;
    const apiKey = "09f131d72b0b258740da267646d4d65d"; // change to env
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Couldn't fetch the weather data for this city");
        }

        return response.json();
      })
      .then((data) => {
        this.setState({ weather: data, error: null });
      })
      .catch((error) => {
        this.setState({ error: error.message, weather: null });
      });
  };

  handleCityNameInputChange = (event) => {
    this.setState({ city: event.target.value });
  };

  handleWeatherDataSubmit = (event) => {
    event.preventDefault();
    this.fetchWeaterData();
  };

  render() {
    const { city, weather, error } = this.state;
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Weather Dashboard
          </h1>
          <form className="mb-4">
            <input
              type="text"
              value={city}
              placeholder="Enter the city name"
              className="border border-gray rounded-lg py-2 px-4 w-full mb-4"
              onChange={this.handleCityNameInputChange}
            />
            <button
              onClick={this.handleWeatherDataSubmit}
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
            >
              Get Weather Information
            </button>
          </form>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {weather && (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{weather.name}</h2>
              <p className="text-gray-700">
                Temperature: {weather.main.temp} C
              </p>
              <p className="text-gray-700">
                Weather: {weather.weather[0].description}{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
