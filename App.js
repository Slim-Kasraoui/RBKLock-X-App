import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Login from './components/Login'

export default class App extends React.Component {
  state = {
   
  }
  render() {
    return (
      <View style={styles.container}>
        <Login/>
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});
