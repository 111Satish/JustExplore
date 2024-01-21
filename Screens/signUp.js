import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        checkLoginStatus();
      }, []);
    
      const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem('authToken');
          if (token) {
            navigation.navigate('Home');
          }
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };
    

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://10.2.106.243:3000/signup', {
                email,
                password,
            });

            if (response.status === 200) {
                console.log(response.data.token);
            
                await AsyncStorage.setItem('authToken', response.data.token);
                navigation.navigate('Home');
            } else {
                console.error('Signup Error:', response.data.error);
                Alert.alert('Signup Error', response.data.error);
            }
        } catch (error) {
            console.error('Signup Error:', error.message);
            Alert.alert('Signup Error', 'An error occurred while signing up.');
        }
    };

    return (
        <ImageBackground
            source={require('../assets/image/loginBack.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />

                <Button title="Sign Up" onPress={handleSignup} />

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Already have an account? Login here.</Text>
                </TouchableOpacity>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        textAlign:'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems:'center'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    loginLink: {
        padding: 5,
        backgroundColor: 'green',
        marginTop: 10,
        color: 'white',
        textDecorationLine: 'underline',
    },
});

export default SignUpScreen;
