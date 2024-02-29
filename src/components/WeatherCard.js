import React from 'react';
import { StyleSheet, Text, View, ImageBackground} from 'react-native';

export default function App({day_1}) { 
  const date = day_1.dt_txt.split(' ')[0];

  return (
        <View style={styles.card_content}>
          <View style={styles.card_text}>
            <Text> {date} </Text>
          </View>

          <View style={styles.card_text}>
            <Text>  {day_1.main.temp.toFixed()}°C </Text>
          </View>

          <View style={styles.card_text}>
            <Text> {day_1.weather[0].description} </Text>
          </View>

          <View style={styles.card_text}>
            <Text> Wind speed: {day_1.wind.speed} m/s </Text>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  card_content: {
    flex: 0.2,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
  },
  card_text: {
    height: '100%',
    width: 100,
    paddingRight: '3%',
    //borderRightWidth: 1,
    justifyContent: 'center',
  }
});