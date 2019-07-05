import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/Login';
import AppToMyApp from "./src/AppToMyApp"
import { store } from './src/redux/store/Store';
import { Provider } from 'react-redux';
import io from 'socket.io-client';





 class App extends React.Component {
  state = {
   
    user:null
   }
constructor(props){
  super(props)

   socket = io("http://192.168.1.105:3000", {jsonp: false,});

   socket.on('connect', function(){
    console.warn('Socket connected!');
   });


  
}

componentDidMount(){
//  console.warn(this.state.missionData)

}

  render() {

  
    return (
      <Provider store={store}>
      <AppToMyApp></AppToMyApp>
      </Provider>
    );
  }
}



export default App;