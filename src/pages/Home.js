import React, { Component } from 'react'
import {AsyncStorage,StyleSheet, Text, View,Button } from 'react-native'
import { Toggle } from "../components/mymap/Toggle"
import Modal from "react-native-modal";
class Home extends Component {
    static navigationOptions = {
        title: 'Home Page',

      };

      state = {
        alertsIsOn: true,
        newsletterIsOn: false,
        trackingIsOn: true,
      }
    
     
      newsletterToggleHandle(state) {
        this.setState({ newsletterIsOn: state })
      }
      trackingToggleHandle(state) {
        this.setState({ trackingIsOn: state })
      }
      alertsToggleHandle(state) {
        this.setState({ alertsIsOn: state })
      }
     
componentDidMount(){
   
}
      _GoLogin=async()=>{
          let mail= await AsyncStorage.getItem('email')
          alert(mail)
        //this.props.navigation.navigate("Login",{name:"gg"})
    }

    _GoMap=()=>{
        this.props.navigation.navigate("MyMap")
       
    }

    _emitSocket=()=>{
        this.setState({ alertsIsOn: !this.state.alertsIsOn })

    }

    _GoMessages=()=>{
      this.props.navigation.navigate("Messages")
    }


    render() {
       
        //console.warn(this.props.navigation.getParam("name"))
        return (
            <View style={styles.container}>
                <Text> Home </Text>
                <Button title="Go Messages"  onPress={this._GoMessages }></Button>
                <Button title="Go Map"  onPress={this._GoMap }></Button>
                <Button title="Go emit"  onPress={this._emitSocket }></Button>
                <View>
                    {this.state.alertsIsOn ? 
        <Toggle
          isOn={this.state.alertsIsOn}
          onToggle={this._emitSocket }
        />
        : null}
        <Toggle
          isOn={this.state.newsletterIsOn}
          onToggle={state => this.newsletterToggleHandle(state)}
        />
        <Toggle
          isOn={this.state.trackingIsOn}
          onToggle={state => this.trackingToggleHandle(state)}
        />
      </View>
            </View>
        )
    }
}

export default Home


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
     
    },
  });