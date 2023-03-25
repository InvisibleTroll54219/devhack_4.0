import { View, Text, StyleSheet, TouchableOpacity ,ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

function TeacherDash() {
  const navigation = useNavigation();
  const route = useRoute();
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('');
  const url = 'http://10.196.9.129:8000/api/v1/courses';

  function nextPage(name, id) {
    navigation.navigate('Attendance', {
      course_name: name,
      course_id: id,
      prof_email: route.params.email,
    });
  }

  function handleSubmit() {
    Axios.post(url, {
      name: course,
      email: route.params.email,
    }).then((res) => {
      setCourses([...courses, res.data.body]);
    });
  }

  useEffect(() => {
    Axios.get('http://10.196.9.129:8000/api/v1/courses?em=' + route.params.email).then((res) => {
      setCourses(res.data.body);
    });
  }, []);

  const renderList = courses.map((item, index) => (
    <TouchableOpacity key={index} onPress={() => nextPage(item.name, item._id)}>
      <Box
        bg="white"
        shadow={2}
        rounded="lg"
        width="90%"
        marginTop={3}
        marginBottom={3}
        padding={2}
      >
        <Text style={styles.courseName}>{item.name}</Text>
        <Text style={styles.courseID}>ID: {item._id}</Text>
      </Box>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
         <ScrollView>
      <View style={styles.formContainer}>
        <Input
          isRequired={true}
          onChangeText={(x) => setCourse(x)}
          variant="outline"
          placeholder="Enter course name"
          defaultValue={course}
          _light={{
            placeholderTextColor: 'blueGray.400',
          }}
          style={styles.inputField}
        />
        <Button onPress={handleSubmit} style={styles.addButton}>
          Add Course
        </Button>
      </View>
      <View style={styles.coursesContainer}>
        <Text style={styles.heading}>Courses</Text>
        {renderList}
      </View>
      </ScrollView>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <TeacherDash />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
heading:{
    paddingTop: 5,
    fontSize:30
},
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  coursesContainer:{
    paddingTop: 40,
  },
  formContainer: {
    backgroundColor: "#F9F9F9",
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  addButton:{
    marginTop:20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0066CC",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  courseContainer: {
    marginTop: 20,
  },
  courseItem: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  courseDetails: {
    fontSize: 16,
    color: "#888888",
  },
});