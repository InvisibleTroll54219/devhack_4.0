import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Login from './screens/Login';
import Signup from './screens/Signup';
import StudentDash from './screens/StudentDash';
import TeacherDash from './screens/TeacherDash';
import Attendance from './screens/Attendance';
import StudentAttendance from './screens/StudentAttendance';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const stack = createStackNavigator();
function App() {
  return(
    <stack.Navigator screenOptions={{headerShown:false}}>
      <stack.Screen name="Login" component={Login}/>
      <stack.Screen name="Signup" component={Signup}/>
      <stack.Screen name="TeacherDash" component={TeacherDash}/>
      <stack.Screen name="StudentDash" component={StudentDash}/>
      <stack.Screen name="Attendance" component={Attendance}/>
      <stack.Screen name="StudentAttendance" component={StudentAttendance}/>
    </stack.Navigator>
  );
};

export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}
 