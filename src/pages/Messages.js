import React, { Component } from 'react'
import { Text, View ,Button} from 'react-native'
import PrivateMessage from '../components/messages/PrivateMessage';

 class Messages extends Component {
constructor(props){
    super(props)

}

state={
    receiver:[{id:"aaa"},{id:"bbb"},{id:"ccc"}],
   sender:"gurkan",
   receiveData:null,
   selected:false,
}

_openMessage=(e)=>{
    
    const data={receiver:e,sender:this.state.sender,socket:socket.id}
socket.emit("Message",data)
this.setState({selected:true})

}

    render() {
        
        return (
            <View>
                {this.state.selected===false ?
                      <View>
                {this.state.receiver.map((data,i) =>
                  <View key={i}>
                <Text> {data.id} </Text>
               <Button title="send message" onPress={() => this._openMessage(data.id)}></Button>
               </View>
                )}
                </View>
                   :
                <View>
                    <PrivateMessage></PrivateMessage>
                </View>}

            </View>
        )
    }
}


export default Messages