import axios from 'axios';

const apiKey = 'fa0c51c1e13ddcc3463f16b41f9fdc79';

const forecastEndpoint = params => `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=${apiKey}&units=metric`;
const locationEndpoint = params => `http://api.openweathermap.org/geo/1.0/direct?q=${params.cityName}&limit=1&appid=${apiKey}`;

const apiCall = async (endpoint) => {
  const options = {
    method: 'GET',
    url: endpoint,
  }
  try {
    const response = await axios.request(options);
    return response.data;
  } catch(err) {
    console.log('Something went wrong', err);
    return null;
  }
}

export const fetchWeatherForecast = params => {
  return apiCall(forecastEndpoint(params));
}

export const fetchLocationWeather = params => {
  return apiCall(locationEndpoint(params));
}