import React, { Component } from 'react';
import { Text, View, StyleSheet ,Button} from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import axios from 'axios';
import { connect } from 'react-redux';
import {getMissionUser,getMissionCourier,getToggle} from "../../redux/actions/MyMap/MapAction"
import io from 'socket.io-client';

import MapViewDirections from '../../MapViewDirection';



const GOOGLE_MAPS_APIKEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8';
const haversine = require('haversine')


class Mapss extends Component {

  constructor(props){
    super(props)
    this.state={
      mapRegion: { latitude: 41.03858586175244,longitude: 28.69594148022964, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      locationResult: null,
      location: {coords: { latitude: 41.03858586175244, longitude: 28.69594148022964}},
      region:{},
      data:[],
      target:[],
      myCoord:[{
        latitude:"",
        longitude:"",
        error:null
      }],
      missionCourier:null,
      missionUser:null,

      toggle:false,
      

      missionTarget:[],
      isMisTarget:false

    }
  }

  _targetLocUser=(e)=>{
  // console.warn(e.nativeEvent)

    this.setState({target:e.nativeEvent.coordinate,missionTarget:this.state.missionUser,isMisTarget:true})
    this.props.getToggle(true)
   // this.props.goTarget(e.nativeEvent.coordinate)

   
  }

 
    
    _targetLocCourier=(e)=>{
  
     
      // console.warn(e.nativeEvent)
        this.state.missionCourier.map((item)=>{
         
          if(item.latitude==e.nativeEvent.coordinate.latitude && item.longitude==e.nativeEvent.coordinate.longitude){
          
            this.setState({target:e.nativeEvent.coordinate,missionTarget:item,isMisTarget:true})
            this.props.getToggle(true)
          }
        })
      }
     
    

  _MyCoord=()=>{
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          myCoord:[{
            latitude:position.coords.latitude,
            longitude: position.coords.longitude,  error: null,}]
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
   // console.warn(this.watchId)
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

 
  componentDidMount() {

    this._MyCoord()
 
    this._getLocationAsync();
    
    this._sendSocket()
  }


  _sendSocket=()=>{
    let newlist =  this.props.missionCourier.payload
    let newlist2=this.props.missionUser.payload
    this.setState({missionCourier:newlist,missionUser:newlist2})
     
  }


  _getLocationAsync = async () => {
    //console.warn(this.state.data)
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
    let data={latitude:location.coords.latitude,longitude:location.coords.longitude,title:"myCoord",description:"mydesss"}
   this.state.data.push(data)
  // console.warn(this.state.data)
   this.setState({ locationResult: JSON.stringify(location), location,});
 };


 _events=(e)=>{
  // console.warn(e)
  // this.setState({region:e})
 // let ee= haversine(this.state.location.coords, this.state.target,{ unit: 'meter'})

 }

 


  render() {
 
// console.warn(this.state.myCoord,"watchcoord")
    //console.warn(this.state.missionData,"mycooord")
  //  console.warn(this.state.data,"ssssssssssssssss")

    return (
      <View style={styles.container}>
        <MapView 
          style={{flex:1}}
          initialRegion ={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        onRegionChange={this._events}
        >

{this.state.missionCourier ==null ? null : this.state.missionCourier.map((marker, id) => (
    <MapView.Marker
    coordinate={{
      latitude: Number(marker.latitude),
      longitude: Number(marker.longitude)
  }}
  onPress={this._targetLocCourier}
  key={id}
  title={marker.title}
  description={marker.description}
 
/> ))}

{this.state.missionUser ==null ? null : this.state.missionUser.map((marker, id) => (
  <MapView.Marker
  coordinate={{
    latitude: Number(marker.latitude),
    longitude: Number(marker.longitude)
}}
onPress={this._targetLocUser}
key={id}
title={marker.title}
description={marker.description}
pinColor='#27cf4f'

/> ))}


<MapView.Marker
    coordinate={{
      latitude: Number(this.state.myCoord.latitude == null ? this.state.location.coords.latitude:this.state.myCoord.latitude ),
      longitude: Number(this.state.myCoord.longitude == null ? this.state.location.coords.longitude:this.state.myCoord.longitude)
  }}
  onPress={this._targetLoc}
  pinColor='#000000'
  
  title={"marker.title"}
  description={"marker.description"}
 
/>

{this.state.isMisTarget ? 
<MapView.Marker
    coordinate={{
      latitude: Number(this.state.missionTarget.targetLatitude ),
      longitude: Number(this.state.missionTarget.targetLongitude)
  }}
  onPress={this._targetLoc}
  pinColor='#000000'
  title={"target.title"}
  description={"target.description"}
 
/>:null}

{this.state.isMisTarget ? 
  <MapViewDirections
                origin={this.state.target}
                destination={{
                  latitude: Number(this.state.missionTarget.targetLatitude ),
                  longitude: Number(this.state.missionTarget.targetLongitude)
              }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="red"
                onReady={this._events}
                onError={this.onError}
              /> : null}



<MapViewDirections
  						origin={{
                latitude: Number(this.state.myCoord.latitude == null ? this.state.location.coords.latitude:this.state.myCoord.latitude ),
                longitude: Number(this.state.myCoord.longitude == null ? this.state.location.coords.longitude:this.state.myCoord.longitude)
            }}
  						destination={this.state.target}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={3}
              strokeColor="blue"
  						onReady={this._events}
  						onError={this.onError}
  					/>
        </MapView>
      
        <Text>
          Location: {haversine(this.state.location.coords, this.state.target,{ unit: 'meter'})} km
        </Text>
        <Button title="Tıkla" onPress={this._sendSocket}></Button>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
});


function mapStateToProps(state) {
 // console.warn(state,"stateeeeeeeeeeee")
  return {
  
    missionCourier:state.MissionReducer.misData,
   missionUser:state.MissionUserReducer.misData
  };
}

const mapDispatchToProps = {
  getMissionUser,
  getMissionCourier,
  getToggle
};



export default connect(mapStateToProps,mapDispatchToProps)(Mapss);