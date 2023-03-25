import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  Input,
  NativeBaseProvider,
  Button,
  Icon,
  Box,
  Image,
  AspectRatio,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Axios from 'axios';
// var lat=1,long=2;
function Attendance() {
  const navigation = useNavigation();
  const route = useRoute();
  const courseId = route.params.course_id;
  const courseName = route.params.course_name;
  const profEmail = route.params.prof_email;
  const [location, setLocation] = useState({});
  const [duration, setDuration] = useState('');
  const url = 'http://10.196.9.129:8000/api/v1/attendance/';
  const[lat,setLat] = useState(0);
  const[long,setLong] = useState(0);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('permission not granted');
        return;
      }
      const loc = await Location.getCurrentPositionAsync();
      console.log(loc);
      setLocation(loc);
      setLat(loc.coords.latitude);
      setLong(loc.coords.longitude);
    })();
  }, []);

  async function startClass() {
    await Axios.post(url, {
      latitude: Number(lat),
      longitude: Number(long),
      course_id: courseId,
      class_duration: Number(duration),
      prof_email: route.params.prof_email,
    });
  }

  async function endClass() {
    let res = null;
    try {
      res = [];
      res.push(await Axios.delete(url + '?id=' + courseId));
      res.push(
        await Axios.get(
          'http://10.196.9.129:8000/api/v1/markAttendance/' +
            '?id=' +
            courseId +
            '&email=' +
            profEmail +
            '&cname=' +
            courseName
        )
      );
      res.push(await Axios.delete('http://10.196.9.129:8000/api/v1/markAttendance?id=' + courseId));
    } catch (err) {
      console.log('Fail >>', res, err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          isRequired={true}
          onChangeText={(x) => setDuration(x)}
          variant="outline"
          placeholder="Enter class duration"
          defaultValue={duration}
          style={styles.inputField}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.startButton} onPress={startClass}>
          Start Class
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.endButton} onPress={endClass}>
          End Class
        </Button>
      </View>
      <Text style={styles.locationText}>Your latitude: {lat}</Text>
      <Text style={styles.locationText}>Your longitude: {long}</Text>
      <StatusBar style="auto" />
      <Text style={styles.courseText}>
        course name: {route.params.course_name}
      </Text>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Attendance />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
  },
  buttonContainer:{
    marginTop: 20,
    width: '80%',
    justifyContent: 'space-between',
  },
  button:{
    width: '100%',
    marginBottom: 20,
  },
  inputContainer:{
    width: '80%',
    marginBottom: 20,
  },
  input:{
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  errorText:{
    color: 'red',
    marginBottom: 10,
  },
locationText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  startButton: {
    marginTop: 30,
    backgroundColor: "#026efd",  
  },
  endButton: {
    marginTop: 30,
    backgroundColor: "#026efd",
  },
  courseText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  
});
