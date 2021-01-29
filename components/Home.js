import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location';


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
            nearby: false
        }
    }

    //get current location
    getLocation = () => {
        //check if location enabled
        Location.hasServicesEnabledAsync().then(data => {
            if (!data) {
                alert('First pen your location please.')
            }
            //request permission
            Location.requestPermissionsAsync().then(data => {
                if (!data.granted) {
                    alert("Oups can't check in Yet! \nPlease allow me now to check your location then try again :)")
                }
            }).catch(err => { throw err })

            //check permission and get current position
            Location.getPermissionsAsync().then(data => {
                if (data.status === 'granted') {
                    Location.getCurrentPositionAsync({ accuracy: 3 }).then(data => {
                        this.setState({
                            latitude: data.coords.latitude,
                            longitude: data.coords.longitude
                        });
                    }).catch(err => { throw err })
                }
            })
        }).catch(err => { console.log(err) })

        this.onPermisses()
    }

    //Check if employee nearby and update state
    onPermisses = ()=>{
       let d = this.getDistance(this.props.loc.latitude, this.props.loc.longitude, this.state.latitude, this.state.longitude) 
       if(d>0.35){
           alert('I think you gotta go there first !')
       }
       this.setState({nearby: true})
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
            <View>
                <Text> Ready to be productive? :D </Text>
                <TouchableOpacity onPress={() => { this.getLocation(); }} style={styles.btnContainer}>
                    <Text style={styles.btn}>Get Location</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        elevation: 8,
        backgroundColor: "#841584",
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 35,
        marginTop: 25
    },
    btn: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center"
    }
})