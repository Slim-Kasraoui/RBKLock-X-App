import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location';
import Clock from './Clock'


export default class Home extends React.Component {
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
        }).then(() => {
            this.onPermisses()
        })
            .catch(err => { console.log(err) })

    }

    //Check if employee nearby and update state
    onPermisses = () => {
        let d = this.getDistance(this.props.loc.latitude, this.props.loc.longitude, this.state.latitude, this.state.longitude)
        console.log(this.props.loc.latitude, this.props.loc.longitude, this.state.latitude, this.state.longitude);
        console.log(d);
        if (d > 0.35) {
            alert('I think you gotta go there first !')
        }
        this.setState({ nearby: true })

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
                <Text style={styles.logo}>RBKlock-X</Text>
                <View >
                    <Clock/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    counter: {
        fontSize: 35,
        fontWeight: "bold",
    },
    btnContainer: {
        elevation: 8,
        backgroundColor: "#841584",
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 35,
        marginTop: 35
    },
    btn: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center"
    },
    logo: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#841584",
        textAlign: 'center',
        marginBottom: 50
    },
    timer: {
        fontSize: 18,

        textAlign: 'center',
        flexDirection: 'row',
        alignSelf: "center",
        alignItems: 'baseline',
        marginBottom: 50
    },
    ready: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#841584",
        textAlign: 'center',
        marginBottom: 10
    },
})