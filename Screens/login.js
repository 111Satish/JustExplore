import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        checkLoginStatus();
      }, []);
    
      const checkLoginStatus = async () => {
        try {
            const authToken = response.data.token;

            if (authToken) {
              await AsyncStorage.setItem('authToken', authToken);
              navigation.navigate("Home")
            }
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };

    const handleLogin = async() => {

        try {
            const response = await axios.post('http://10.2.106.243:3000/login', {
                email,
                password,
            });

            if (response.status === 200) {
                console.log(response.data.token);
                await AsyncStorage.setItem('authToken', response.data.token);
                navigation.navigate('Home');
            } else {
                console.error('Login Error:', response.data.error);
                Alert.alert('Login Error', response.data.error);
            }
        } catch (error) {
            console.error('Login Error:', error.message);
            Alert.alert('Login Error', 'An error occurred while logging in.');
        }
    };

    return (
        <ImageBackground
            source={require('../assets/image/loginBack.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Just Explore</Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    mode="outlined"
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                    mode="outlined"
                />

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={styles.button}
                    labelStyle={styles.buttonText}
                >
                    Login
                </Button>

                <View style={styles.bottomContainer}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    <Button icon={() => <Icon name="google" size={20} color="white" />} mode="contained">
                        Sign in with Google
                    </Button>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        padding: 16,
        flexDirection:'column',
        alignItems:'center',
        alignItems:'center'
    },
    title: {
        alignSelf:'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 24,
        textShadowRadius:18,
        textShadowColor:'#999'
    },
    input: {
        color:'white',
        marginBottom: 16,
        backgroundColor:'#333',
        width:'80%',
    },
    button: {
        marginTop: 16,
        backgroundColor: '#4CAF50', 
        width:'80%',
    },
    buttonText: {
        color: 'white',
    },
    bottomContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 16,
        alignContent:'center',
        alignItems:'center',
    },
    forgotPassword: {
        color: 'white',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
