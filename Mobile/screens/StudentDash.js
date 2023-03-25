import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

function StudentDash() {
  const navigation = useNavigation();
  const route = useRoute();
  const url = "http://10.196.9.129:8000/api/v1/courses";
  const [courses, setCourses] = useState([]);
  const [dumb, setDumb] = useState(0);
  const [course_id, setCourse_id] = useState("");
  const [erro,setErro] = useState("");
  const url2 = url + "?" + "em=" + route.params.email + "&" + "course_id=" + course_id;
  
  function handleSubmit() {
    if(course_id===""){
        setErro("Invalid course ID");
        return;
    }
    function f2() {
        try{
            Axios.patch("http://10.196.9.129:8000/api/v1/users?em=" + route.params.email + "&course=" + p.data.body.name + "&course_id=" + p.data.body._id).then(res => {
                console.log("hi" + res.data.body);
                setDumb(!dumb);
              });
        }
        catch(err){
            setErro("Invalid course ID");
            return;
        }
    }

    try{
        Axios.patch(url2).then(res => {
            p = res;
          }).then(() => f2())
        setErro("");
    }
    catch(err){
        setErro("Invalid course ID");
        return;
    }
  }

  function changePage(name, id) {
    console.log(name, id);
    navigation.navigate("StudentAttendance", {
      course_name: name,
      course_id: id,
      stu_email: route.params.email
    })
  }

  useEffect(() => {
    Axios.get("http://10.196.9.129:8000/api/v1/users/" + route.params.email).then(res => {
      setCourses(res.data.body.courses);
      console.log(res.data.body.courses);
    })
  }, [dumb]);

  const renderList = courses.map((item, index) =>
    <TouchableOpacity key={index} onPress={() => changePage(item[0], item[1])}>
      <Box
        bg="white"
        shadow={2}
        rounded="lg"
        width="90%"
        marginTop={3}
        marginBottom={3}
        padding={2}
      >
        <Text style={styles.courseName}>{item[0]}</Text>
        <Text style={styles.courseId}>{item[1]}</Text>
        </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
         <ScrollView>
    <Text style={styles.errorText}>{erro}</Text>
      <View style={styles.inputContainer}>
        <Input
          isRequired={true}
          onChangeText={(x) => setCourse_id(x)}
          variant="outline"
          placeholder='Enter course ID'
          defaultValue={course_id}
          _light={{
            placeholderTextColor: "blueGray.400"
          }}
          style={styles.input}
        />
        <Button style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Button>
      </View>

      <View>
      <Text style={styles.heading}>Courses</Text>
        {renderList}
      </View>
      </ScrollView>
    </View>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <StudentDash />
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
    heading:{
        paddingTop: 5,
        fontSize:30
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0066CC",
    marginTop:15,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  courseList: {
    marginTop: 20,
  },
  courseItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseId: {
    fontSize: 16,
    color: '#666',
  },
});