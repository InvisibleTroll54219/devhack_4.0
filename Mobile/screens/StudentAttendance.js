import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {Input, NativeBaseProvider,Button,Icon,Box,Image,AspectRatio} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Axios from 'axios';
function StudentAttendance(){
  // console.log("hi");
  const navigation = useNavigation();
  const route = useRoute();
  const course_id = route.params.course_id;
  const course_name = route.params.course_name;
  const student_email = route.params.stu_email;
  const[location,setLocation] = useState({"coords":{"latitude":0,"longitude":0}});
  const [presentTime, setPresentTime] = useState(0);
  const[god,setGod] = useState(0);
  const[profLat,setLat] = useState(0);
  const[profLong,setLong] = useState(0);
  const[duration,SetDuration] = useState(0);
  const[flag,setFlag] = useState(0);
  const url ="http://10.196.9.129:8000/api/v1/attendance/";
  const url2 = "http://10.196.9.129:8000/api/v1/markAttendance";
  useEffect(()=>{
    const f = async () =>{
      const p  = await Axios.get(url+"?course_id="+course_id);
      // console.log(p.data.body);
      setLat((profLat)=>p.data.body.latitude);
      setLong(profLong=>p.data.body.longitude);
      SetDuration((duration)=>p.data.body.class_duration*0.8);
    }
    f();
  },[])

  useEffect(()=>{
    setInterval(()=>{
      setGod((god)=>god+1);
    },1000)
  },[]);

  useEffect(()=>{
    setInterval(()=>{
      if(Math.abs(location.coords.latitude-profLat)<0.0003 && Math.abs(location.coords.longitude-profLong)<0.0003){
        setPresentTime((presentTime)=>presentTime+1);
      }
    },60000)
  },[]); 

  useEffect(()=>{
    console.log(presentTime,duration);
    if(presentTime>duration && flag==0){
      const f = async ()=>{
        const p = await Axios.post(url2,{
          email: route.params.stu_email,
          course_id: route.params.course_id,
          isPresent: true
        })
        navigation.navigate("StudentDash",{
        email: student_email
        });
      }
      setFlag((flag)=>1);
      f();
    }
    else if(god>duration*60){
      navigation.navigate("StudentDash",{
        email: student_email
      });
      setFlag((flag)=>1);
    }
  },[presentTime])

  useEffect(()=>{
    (async()=>{
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        console.log("permission not granted");
        return;
      }
      const loc = await Location.getCurrentPositionAsync();
      setLocation((location)=>loc);
      lat = loc.coords.latitude;
      long = loc.coords.longitude;
    })()
  },[god]);

  return(
    <View style={styles.container}>
      <Text style={styles.b}>Don't leave the screen, Your attendance will restart</Text>
      <Text style={styles.txt}>You are present for : {presentTime} minutes {god%60} seconds</Text>
      <Text style={styles.txt}>professor latitude:{profLat}</Text>
      <Text style={styles.txt}>professor longitude:{profLong}</Text>
      <Text style={styles.txt}>{location.coords.latitude}</Text>
      <Text style={styles.txt}>{location.coords.longitude}</Text>
    </View>
  )
}
export default ()=>{
  return(
      <NativeBaseProvider>
          <StudentAttendance/>
      </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  txt:{
      marginTop:10,
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  b:{
    color:'#026efd',
    fontWeight: 'bold',
    fontSize: 20,
  }
});

