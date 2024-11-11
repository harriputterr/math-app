import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity  } from 'react-native'
import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './_layout';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the Icon component

export interface IUser {
    username: string;
    password: string;
}

interface IProps {
    onLogin: (user: IUser) => void;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Login'> & IProps;

const Login = (props: TProps) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Added showPassword state.
    const [showPassword, setShowPassword] = React.useState(false);

    function login() {

        let foundUser: IUser | false = false;

        // 1. Improved authentication - Created a new backend system to handle authentication.
        // 2. More Secure Storage - Separated backend system communicates with the DB
        // 3. Input Validation handled by backend system.
        // 4. Code Injection also handled by backend.
        
            fetch('http://172.20.10.2:7777/login', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            }).then(async (res: any) => {
                if (res.status === 200){
                    const user = await res.json()
                    foundUser = user.user as IUser;
                    props.onLogin(foundUser)
                    return foundUser;
                }
                else if(res.status === 401){
                    Alert.alert('Error', 'Username or password is invalid.');
                    return null;
                }
                else if(res.status === 400){
                    const response = await res.json();
                    const error = response.error;
                    Alert.alert('Error', error);
                    return null;
                }
            }).catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.username}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
            />
                <TextInput
                    style={styles.password}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    // Added new prop for securing text entry and is binded to showPassword state.
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TouchableOpacity
                    style={styles.toggleButton}
                    // Changes and reverses the Boolean state of the showPassword when the button is clicked.
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} />
                </TouchableOpacity>

            <Button title="Login" onPress={login} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    username: {
        borderWidth: 1,
        borderColor: '#333333',
        padding: 10,
        marginBottom: 10,
    },
    password: {
        borderWidth: 1,
        borderColor: '#333333',
        padding: 10,
        marginBottom: 10,
    },
    // Some additional CSS for password visibility toggle button.
    toggleButton: {
        marginLeft: 10,
    }
});

export default Login