import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, Text, View,Button ,TextInput} from 'react-native'
import axios from 'axios';

 class Login extends Component {
    static navigationOptions = {
        title: 'Login Page',
        
      };

state={
    email:"",
    password:"",
    Login:false,


}


componentDidMount(){
 console.warn( AsyncStorage.getItem('email'));
}

handleSubmit=async(event)=> {
  //console.warn(event,"sss")
  //console.warn(this.state.email,this.state.password)
  //event.preventDefault();
  const data = {
    Email:this.state.email,
    Password:this.state.password
  };
  //const jsonData=JSON.stringify(data)
  //console.warn(jsonData)
  await axios({
    url: 'https://reactwebapi.azurewebsites.net/api/account/Login',
    method: 'POST',
    data: data
}).then(obj => {
  //console.warn(obj,"obj")
 // localStorage.setItem("Token",obj.data)
 //Cookies.set('Token', obj.data);
 const resdata=obj.data
 console.warn(resdata.email)
 //console.warn(obj.data.email,"objj")
AsyncStorage.setItem('user',JSON.stringify(obj.data));
//this.tokenDecode()
 this.setState({Login:true})
 this._GoHome()
//this.props.isLogin(this.state.Login)
  //console.log(Cookies.get('Token'))
}).catch(obj=>{
  console.warn(obj,"catch")
  this.setState({Login:false})
})}

      _GoHome=()=>{
          this.props.navigation.navigate("Home",{name:"Gurkan"})
      }

      _OnChangeEmail=(event)=>{
          console.warn(event)
          this.setState({ email:event})
      }

      
      _OnChangePassword=(event)=>{
        console.warn(event)
        this.setState({ password:event})
    }

    showStore=async()=>{
      let data= await AsyncStorage.getItem('user')
      let user=JSON.parse(data)
      alert(user.email)
    }



    render() {
        
//console.warn(this.props.navigation.navigate.name)
        return (
            <View style={styles.container}>
                <Text> Email </Text>
                <TextInput
        style={styles.inputStyle}
        onChangeText={this._OnChangeEmail}
        value={this.state.email}
       
      />

<Text> password </Text>
                <TextInput
        style={styles.inputStyle}
        onChangeText={this._OnChangePassword}
        value={this.state.password}
        
      />
              <Button title="Sign in"  onPress={this.handleSubmit }></Button>

              <Button title="Show"  onPress={this.showStore }></Button>
            </View>
        )
    }
}




export default Login


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
     
    },
    inputStyle:{
        height: 40,
        width:150,
         borderColor: 'gray',
          borderWidth: 1,
          borderRadius:15
    }

  });