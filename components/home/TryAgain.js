import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default class TryAgain extends Component {
    render() {
        return (
            <View>
                <Text style={styles.logo}>RBKlock-X</Text>
                <TouchableOpacity onPress={() => { this.props.grantAccess() }} style={styles.btnContainer}>
                    <Text style={styles.btn}> Oups try again! </Text>
                </TouchableOpacity>
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
})