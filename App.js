import React from 'react';
import { Colors } from './components/styles';
const { primary, teriary } = Colors;

import firebase from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyDpOyH-7waLCTd-1whrZtLmEqhkQV12jog",
    authDomain: "chatbot-react-native-sttq.firebaseapp.com",
    projectId: "chatbot-react-native-sttq",
    storageBucket: "chatbot-react-native-sttq.appspot.com",
    messagingSenderId: "393712953191",
    appId: "1:393712953191:web:bcf0edfcc1770aceddf1c2",
    measurementId: "G-GW7LEKM0NX"
};

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Login from './screens/Login';
import Register from './screens/Register';
import Welcome from './screens/Welcome';
import Chatbot from './screens/Chatbot';

const Stack = createStackNavigator();


const App = () => {
    return (
        <NavigationContainer initialRoutName="Login">
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: teriary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }                    
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Chatbot" component={Chatbot} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;