import {createStackNavigator, createAppContainer,createSwitchNavigator} from 'react-navigation';
import Home from "../pages/Home"
import Login from "../pages/Login"
import Settings from "../pages/Settings"
import MyMap from "../pages/MyMap"
import Messages from "../pages/Messages"


const AppRouter = createStackNavigator({
   
    Home: {
      screen: Home
    },
    MyMap: {
      screen: MyMap
    },
    Messages: {
      screen: Messages
    },
  
    Settings:{
        screen:Settings
    },
    
  });

  const AppAuth=createStackNavigator({
      Login:Login
  })

  const MyApp={
      AppRouter,
      AppAuth
  }

  export default createAppContainer(createSwitchNavigator(
    {
     // AuthLoading: AuthLoadingScreen,
      App: AppRouter,
      Auth: AppAuth,
    },
    {
      initialRouteName: 'App',
    }
  ));
  
 // export default createAppContainer(MyApp);