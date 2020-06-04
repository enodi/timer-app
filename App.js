import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';

const App = () => {
  const [seconds, setSeconds] = useState(55);
  const [minutes, setMinutes] = useState(59);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (minutes === 59 && seconds === 59) {
          setHours((hours) => hours + 1);
          setMinutes(0);
          setSeconds(0);
        } else if (seconds === 59) {
          setMinutes((minutes) => minutes + 1);
          setSeconds(0);
        } else {
          setSeconds((seconds) => seconds + 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, hours]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.timerText}>
        {hours > 0 && `${hours}:`}
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </Text>
      <View style={styles.buttonSection}>
        <Button style={[styles.button]} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Button>
        <Button style={styles.button} onPress={toggle}>
          <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#000',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {color: '#fff', fontSize: 100},
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  buttonText: {color: '#fff', fontSize: 20},
  button: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: 'red',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginTop: 40,
  },
});

export default App;
