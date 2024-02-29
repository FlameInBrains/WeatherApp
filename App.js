import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground, ActivityIndicator } from 'react-native';
import Header from './src/components/Header';
import WeatherCard from './src/components/WeatherCard';
import { fetchWeatherForecast } from './src/api/fetch';

const bcgimage = { uri: 'https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?cs=srgb&dl=pexels-pixabay-301599.jpg&fm=jpg' };

export default function App() {
  const [locations, setLocation] = useState('Kyiv, UA');
  const [weather_1, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [latitude, setLat] = useState(50.45);
  const [longtitude, setLon] = useState(30.52);

  useEffect(() => {
    fetchWeatherForecast({
      lat: latitude,
      lon: longtitude,
    }).then(data => {
      setWeather(data);
    }).catch(() => setError('This city does not exist or the server is down')).finally(() => setLoading(false));
  }, [locations]);

  return (
    <SafeAreaView style={styles.container}>
      <Header handleLat = {setLat} handleLon = {setLon} handleLocation = {setLocation}/>
      <ImageBackground source={bcgimage} style={styles.body}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.main_data}>
            <Text style={[styles.degrees, styles.weather_info]}> {weather_1.list[0].main.temp.toFixed()} °C</Text>
            <Text style={styles.weather_info}>{locations}</Text>
            <Text style={styles.weather_info}> {weather_1.list[0].weather[0].description} </Text>
            <Text style={styles.weather_info}>Wind speed: {weather_1.list[0].wind.speed}m/s</Text>
            <Text style={styles.weather_info}>Atmosphere presure: {weather_1.list[0].main.pressure}mbar</Text>
          </View>
        )
      }
      </ImageBackground>
      <WeatherCard day_1 = {weather_1.list[8]}/>
      <WeatherCard day_1 ={weather_1.list[16]}/>
      <WeatherCard day_1 = {weather_1.list[24]}/>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 100,
  },
  degrees: {
    fontSize: 60,
  },
  main_data: {
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  weather_info: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});
