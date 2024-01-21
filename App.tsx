import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View , Text} from 'react-native';
import SignUpScreen from './Screens/signUp';
import LoginScreen from './Screens/login';
import HomeScreen from './Screens/home';

const Drawer = createDrawerNavigator();
const App =()=>{
return(
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name = "SignUp" component={SignUpScreen}/>
      <Drawer.Screen name = "Login" component={LoginScreen}/>
      <Drawer.Screen name = "Home" component={HomeScreen}/>
    </Drawer.Navigator>
  </NavigationContainer>
);
};

export default App;
