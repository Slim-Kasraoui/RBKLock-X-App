import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Login from './components/Login';
import Home from './components/Home';

const RBKlocation = {
  latitude : 36.8944707,
  longitude : 10.186748
}
export default class App extends React.Component {
  state = {
    loggedIn: false
  }

  logIn = () => {
    this.setState({ loggedIn: true })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loggedIn? <Home loc={RBKlocation}/> : <Login logIn={this.logIn}/>}
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  }
});
