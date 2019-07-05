import React, { Component } from 'react'
import { Text, View,TextInput,Button } from 'react-native'


 class PrivateMessage extends Component {

    constructor(props){
        super(props)
    }
    state = {
        chatMessage:"",
        submitMessage:"",
        receiveData:null
        
    }

    componentDidMount(){
        socket.on('Message', (data) => this.setState({receiveData:data}))
    }


    _sendMessage=()=>{
       this.setState({submitMessage:this.state.chatMessage,chatMessage:""})
    }

    render() {
        console.warn(this.state.receiveData,"receivedata")
        return (
            <View>
                <Text>{this.state.submitMessage}</Text>
                
                <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1,float:"bottom"}}
        onChangeText={(text) => this.setState({chatMessage:text})}
        value={this.state.chatMessage}
        placeholder='Enter text...'
      
      />
      <Button title="Send" onPress={this._sendMessage}  ></Button>
            </View>
        )
    }
}


export default PrivateMessage
