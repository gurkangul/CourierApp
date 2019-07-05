import React, { Component } from 'react'
import { Text, View ,StyleSheet,Button,TouchableHighlight,Animated} from 'react-native'
import Mapss from "../components/mymap/Mapss"
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Toggle } from "../components/mymap/Toggle"
import {getToggle} from "../redux/actions/MyMap/MapAction"
import Modal from "react-native-modal";

class MyMap extends Component {
  state = {
    alertsIsOn: true,
    newsletterIsOn: false,
    trackingIsOn: true,
    modalVisible:false,
    modalOpacity:new Animated.Value(0)
  }

  _onSocket=()=>{
    socket.on('update', function (response) {
    //  console.warn(response.data)
     this.setState({dolarRate: response.data.dolarRate})
    }.bind(this));
  }

  _emitSocket=()=>{
    this.setState({ alertsIsOn: !this.state.alertsIsOn })

}

setModalVisible=()=> {
 // this.setState({modalVisible: !this.state.modalVisible});
  this.props.getToggle(false)
}

    render() {
      
    //  alert(this.props.toggle)
        return (
            <View style={styles.container}>
                <View style={{ flex: 2 }}>
               <Mapss ></Mapss>
               </View>

          
               <Modal style={{ backgroundColor:"transparent",marginTop:400,alignItems: 'center',}}
               backdropOpacity={null}
              onSwipeComplete={this.setModalVisible}
              swipeDirection="left"
              onBackdropPress={this.setModalVisible}
          isVisible={this.props.toggle}
          >
         
         <View style={{ height:100 , width:250,backgroundColor:"white",borderRadius:35
          }}>
            <Text>Hello!</Text>
            <Button title="Hide modal" onPress={this.setModalVisible} />
          </View>
        </Modal>
          </View>
        
        )
    }
}


function mapStateToProps(state) {
 // console.warn(state,"stateeeeeeeeeeee")
  return {
  
    toggle:state.ToggleReducer.toggle.payload,
  
  };
}

const mapDispatchToProps = {
  getToggle
};



export default connect(mapStateToProps,mapDispatchToProps)(MyMap);


const styles = StyleSheet.create({
    container: {
      flex: 1,
    
     
    },
  

  });

