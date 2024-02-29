import React, { useCallback } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {debounce} from 'lodash';
import {fetchLocationWeather} from '../api/fetch';

export default function App({handleLat, handleLon, handleLocation}) {

  const handleSearch = value => {
    fetchLocationWeather({cityName: value}).then(data => {
      handleLocation(`${data[0].name}, ${data[0].country}`);
      handleLat(data[0].lat);
      handleLon(data[0].lon);
    }).catch(() => console.log('This city does not exist'))
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 2000), [])

  return (
    <View style={styles.header}>
      <View style={styles.header_box}>
        <TextInput 
          onChangeText={handleTextDebounce}
          placeholder='Search City'
          style={styles.search}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'orange',
    justifyContent: 'center',
    marginTop: 20,
  },
  header_box: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: 100,
  },
  search: {
    borderRadius: 50,
    width: '200%',
    backgroundColor: 'lightgray',
    padding: 5,
    paddingLeft: 10,
  }
});