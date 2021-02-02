import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Timer from 'react-compound-timer'

export default class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clockedIn: false,
            time: 0
        }
    }

    clockIn = () => {
        this.setState({ clockedIn: true })
        console.log('started');
    }
    clockOut = (time) => {
        this.setState({ clockedIn: false, time: time })
        console.log('Leaved');
        console.log(time);

    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>RBKlock-X</Text>

                <Timer
                    direction="forward"
                    startImmediately={false}
                    onStart={this.clockIn}
                    onStop={this.clockOut}
                >
                    {({ start, resume, pause, stop, reset, getTimerState, getTime }) => (
                        <React.Fragment>
                            <View style={styles.timer}>
                                <Text style={styles.counter}><Timer.Hours /> : </Text>
                                <Text style={styles.counter}><Timer.Minutes /> : </Text>
                                <Text style={styles.counter}><Timer.Seconds /></Text>
                            </View>
                            <Text style={styles.ready}> Ready to be productive? :D </Text>
                            {
                                this.state.clockedIn ?
                                    <TouchableOpacity onPress={() => {
                                        stop();
                                        var time;
                                        time = parseInt(getTime()).toString();
                                        var timeinS = time.slice(0, time.length - 3)
                                        this.clockOut(timeinS);
                                        reset()
                                    }} style={styles.btnContainer}>
                                        <Text style={styles.btn}>Check out</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={start} style={styles.btnContainer}>
                                        <Text style={styles.btn}>Check in</Text>
                                    </TouchableOpacity>
                            }
                        </React.Fragment>
                    )}
                </Timer>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#841584",
        textAlign: 'center',
        marginBottom: 50
    },
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
    // logo: {
    //     fontSize: 40,
    //     fontWeight: "bold",
    //     color: "#841584",
    //     textAlign: 'center',
    //     marginBottom: 50
    // },
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