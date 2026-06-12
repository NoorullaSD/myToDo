import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/loginScreen';
import RegistrationScreen from '../screens/registerScreen';
import BottomTabs from './bottomTabs';
import ProfileScreen from '../screens/profileScreen'
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    const isLoggedIn = useSelector(
        state => state.auth.isLoggedIn,
    );

    console.log("isloggin---------->>>>", isLoggedIn)

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            {isLoggedIn ? (
                <>
                    <Stack.Screen
                        name="MainTabs"
                        component={BottomTabs}
                    />

                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                    />

                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                    />

                    <Stack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}