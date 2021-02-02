import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

import Login from './components/Login';
import Home from './components/home/Home';

const RBKlocation = {
  latitude: 36.8944707,
  longitude: 10.186748
}
export default class App extends React.Component {
  state = {
    loggedIn: false,
    services: false,
    permission: false,
    latitude: 0,
    longitude: 0,
    nearby: false, // ::::::::::::::::::::::::::::::::::: Should be false (true for testing)
    again: false
  }
  componentDidMount() {
  }

  shouldComponentUpdate() {
    return true
  }

  logIn = () => {
    this.setState({ loggedIn: true })
    this.checkServices()
      .then(() => {
        return this.requestPermission();
      })
      .then(() => {
        return this.getPositionAndCheck();
      })
      .catch(err => { console.log(err) })
  }

  checkServices = () => {
    return Location.hasServicesEnabledAsync().then(
      data => {
        console.log('service enabled');
        if (data) {
          this.setState({ services: true })
          return
        }
        console.log('First open your location please.')
      }
    ).catch(err => console.log(err))
  }

  requestPermission = () => {
    return Location.requestPermissionsAsync()
      .then(data => {
        if (data.granted) {
          this.setState({ permission: true })
          return
        }
        console.log("Oups can't check in Yet! \nPlease allow me now to check your location then try again :)")
      }).catch(err => console.log(err))
  }

  onPermisses = () => {
    let d = this.getDistance(RBKlocation.latitude, RBKlocation.longitude, this.state.latitude, this.state.longitude)
    console.log(RBKlocation.latitude, RBKlocation.longitude, this.state.latitude, this.state.longitude);
    console.log(d);
    if (d > 0.35) {
      console.log('I think you gotta go there first !');
      return
    }
    this.setState({ nearby: true })

  }
  getPositionAndCheck = () => {

    return Location.getPermissionsAsync()
      .then(data => {
        if (data.status === 'granted') {
          Location.getCurrentPositionAsync({ accuracy: 3 }).then(data => {
            console.log('gettig pos 61 ===>', data.coords);
            if (data.coords.latitude !== 0 && data.coords.longitude !== 0) {
              // console.log(data.coords);
              this.setState({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
              })
            }
            console.log('Something wrong in location first call')
          })
            .then(() => {
              this.onPermisses();
              this.setState({ again: !this.state.again })
            })
            .catch(err => { throw err })
        }
      })
  }

  deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  getDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // this.deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loggedIn ? <Home loc={RBKlocation} state={this.state} grantAccess= {this.getPositionAndCheck}/> : <Login logIn={this.logIn} />}
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
