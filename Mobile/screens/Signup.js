import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React ,{useEffect,useState} from 'react'
import {Input, NativeBaseProvider,Button,Icon,Box,Image,AspectRatio} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
function Signup(){
    const url ="http://10.196.9.129:8000/api/v1/users/";
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [profession,setProfession] = useState("");
    const[erro,setErro] = useState("");
    const navigation = useNavigation();
    const fetchApi = async()=>{
        try{
            const res =  await Axios.post(url,{
                email:email,
                password: password,
                name: name,
                profession: profession
            });
            console.log(res.data.body);
            if(res.data.body.profession=="student"){
                navigation.navigate("StudentDash",{
                    email: res.data.body.email,
                });
            }
            else if(res.data.body.profession=="teacher"){
                navigation.navigate("TeacherDash",{
                    email: res.data.body.email,
                });
            }
        }
        catch(err){
            setErro("*Please fill all the details");
            console.log(err);
        }
      
    }
    return(
        <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={{color:"red"}}>{erro}</Text>
                <Text style={styles.LoginText}>Signup</Text>
            </View>
            <View style={styles.text2}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                    <Text style={styles.signupText}>Login</Text>
                </TouchableOpacity>
            </View>
                    <Input
                        style={styles.input}
                       isRequired={true}
                       onChangeText={(x)=>setName(x)}
                       variant="underlined"
                       placeholder='name'
                       defaultValue={name}
                       _focus={{ borderColor: '#026efd' }}
                       _hover={{ borderColor: '#026efd' }}
                    />
                    <Input
                    style={styles.input}
                       isRequired={true}
                       onChangeText={(x)=>setEmail(x)}
                       variant="underlined"
                       placeholder='Email'
                       defaultValue={email}
                       _focus={{ borderColor: '#026efd' }}
                       _hover={{ borderColor: '#026efd' }}
                    />
                       <Input
                       style={styles.input}
                       isRequired={true}
                       onChangeText={(x)=>setPassword(x)}
                       variant="underlined"
                       secureTextEntry={true}
                       placeholder="Password"
                       defaultValue={password}
                       _focus={{ borderColor: '#026efd' }}
                       _hover={{ borderColor: '#026efd' }}
                       />
        
                    <Input
                       isRequired={true}
                       style={styles.input}
                       onChangeText={(x)=>setProfession(x)}
                       variant="underlined"
                       placeholder='profession (teacher / student) '
                       defaultValue={profession}
                       _focus={{ borderColor: '#026efd' }}
                       _hover={{ borderColor: '#026efd' }}
                    />

            <View style={StyleSheet.buttonStyle}>
                <Button style={styles.button} onPress={fetchApi}>
                    Signup
                </Button>
            </View>
        </View>
    )
}

export default ()=>{
    return(
        <NativeBaseProvider>
            <Signup/>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:150,
        flex:1,
        backgroundColor:"#fff",
        paddingHorizontal: 20,
    },
    LoginText:{
        marginTop:100,
        fontSize:30,
        fontWeight:"bold"
    },
    Middle:{
        alignItems:'center',
        justifyContent:'center'
    },
    text2:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:5
    },
    signupText: {
        fontWeight: 'bold',
        color: '#026efd',
      },
      input: {
        width: '100%',
        fontSize: 20,
        marginBottom: 15,
      },
    buttonStyle:{
        marginTop:20,
        marginLeft:15,
        marginRight:15
    },
    buttonStyleX:{
        marginTop:12,
        marginLeft:15,
        marginRight:15
    },
    button: {
        backgroundColor: '#026efd',
        marginTop: 10,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 300,
    },
})