import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import TryAgain from './TryAgain'
import Clock from '../Clock'


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     services: false,
        //     permission: false,
        //     latitude: 0,
        //     longitude: 0,
        //     nearby: false
        // }
    }

    


    render() {
        return (
            <View>
                <View >
                    {this.props.state.services && this.props.state.permission && this.props.state.nearby ? <Clock /> : <TryAgain grantAccess={this.props.grantAccess} />}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   
    
    
})