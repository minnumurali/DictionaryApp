import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import Home from './Screens/Home'; 
import Result from './Screens/Result';
import { NavigationContainer } from '@react-navigation/native';
 import ThemeProvide from './Context/ThemeProvider';



const Stack : any = createNativeStackNavigator()


export default function App() {
  return (
    <>
    

   
<ThemeProvide>
 <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
       <Stack.Screen
        name="Home" component={Home}
        options={{
          headerShown: false
        }}/>   
         <Stack.Screen
        name="Back" component={Result}/>
         {/* <Stack.Screen
        name="Search" component={Search}/> */}
       
     </Stack.Navigator>
</NavigationContainer> 

</ThemeProvide>
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //  alignItems: 'center',
    // justifyContent: 'center',
  },
});
