import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MyApp from "../src/navigation/index"
import {getMissionCourier,getMissionUser} from "./redux/actions/MyMap/MapAction"
import { connect } from 'react-redux';
import axios from 'axios';

 class AppToMyApp extends Component {
   constructor(props){
       super(props)
       this.state={
           missionData:[]
       }

       socket.on('missionCourier', (data) => this.props.getMissionCourier(data))
       socket.on('missionUser', (data) => this.props.getMissionUser(data))
   }

   _getCourierMissions=async()=>{
    await axios.get('https://reactwebapi.azurewebsites.net/api/mission/CourierMissions')
     .then(response =>{
       socket.emit('missionCourier', response.data );
      // this.setState({ data: response.data })
 
   });}

   _getUserMissions=async()=>{
    await axios.get('https://reactwebapi.azurewebsites.net/api/mission/UserMissions')
     .then(response =>{
       socket.emit('missionUser', response.data );
      // this.setState({ data: response.data })
 
   });}


   componentDidMount(){
 this._getCourierMissions()
 this._getUserMissions()

   }


    render() {
       
        return (
           
                <MyApp></MyApp>
            
        )
    }
}


function mapStateToProps(state) {
  
    return {
     
      missionCourier:state.MapReducer,
     
    };
  }
  
  const mapDispatchToProps = {
    getMissionUser,
    getMissionCourier
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(AppToMyApp);
