import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_KEY = 'SUA_API_KEY_AQUI';

export default function App() {
  const [city, setCity] = useState('Fortaleza');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async (cityName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather(city);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌦️ App do Clima</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a cidade"
        value={city}
        onChangeText={(text) => setCity(text)}
        onSubmitEditing={() => getWeather(city)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : weather ? (
        <View style={styles.info}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
        </View>
      ) : (
        <Text style={styles.error}>Cidade não encontrada</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cce6ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  info: {
    alignItems: 'center',
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 22,
    textTransform: 'capitalize',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});
