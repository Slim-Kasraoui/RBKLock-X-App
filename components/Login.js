import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class Login extends React.Component {
    state = {
        username: '',
        password: ''
      }
      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.logo}>RBKlock-X</Text>
            <TextInput
              placeholder="Username"
              onChangeText={(text) => this.setState({ username: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              onChangeText={(text) => this.setState({ password: text })}
              style={styles.input}
            />
            <TouchableOpacity onPress={()=>{alert(this.state.username, this.state.password)}} style={styles.btnContainer}>
              <Text style={styles.btn}>Clock</Text>
            </TouchableOpacity>
    
          </View>
        )
      }
}

const styles = StyleSheet.create({
    input: {
      height: 45,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 20,
      marginBottom: 20,
      marginHorizontal: 35,
      textAlign: 'center',
      color: "#841584",
    },
    logo: {
      fontSize: 18,
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
      marginTop: 25
    },
    btn: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center"
    }
  });
  