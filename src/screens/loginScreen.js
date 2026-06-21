import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginSuccess } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import AuthService from '../service/authService';
import NotificationService from '../service/notificationService';
import FirestoreService from '../service/firestoreService';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isValid =
        email.trim().length > 0 &&
        password.trim().length > 0;

    const handleLogin = async () => {
        try {
            const response = await AuthService.login(
                email,
                password,
            );

            const uid = response.user.uid;

            // Get FCM Token
            const token = await NotificationService.getFCMToken();
            const oldToken = await AsyncStorage.getItem('FCM_TOKEN');

            // Save Token in Firestore
            if (token !== oldToken) {
                await FirestoreService.saveUserFCMToken(
                    uid,
                    token,
                );

                await AsyncStorage.setItem(
                    'FCM_TOKEN',
                    token,
                );
            }

            dispatch(loginSuccess());

            navigation.navigate('MainTabs');
        } catch (error) {
            console.log('Login Error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={
                    Platform.OS === 'ios'
                        ? 'padding'
                        : 'height'
                }>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Welcome Back
                    </Text>

                    <Text style={styles.subtitle}>
                        Sign in to continue to your
                        account.
                    </Text>
                </View>

                {/* Email */}
                <View style={styles.inputSection}>
                    <Text style={styles.label}>
                        EMAIL
                    </Text>

                    <TextInput
                        testID="email-input"
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password */}
                <View style={styles.inputSection}>
                    <Text style={styles.label}>
                        PASSWORD
                    </Text>

                    <View style={styles.passwordBox}>
                        <TextInput
                            testID="password-input"
                            style={styles.passwordInput}
                            placeholder="Enter password"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            testID="toggle-password"
                            onPress={() =>
                                setShowPassword(
                                    !showPassword,
                                )
                            }>
                            <Text style={styles.showText}>
                                {showPassword
                                    ? 'Hide'
                                    : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity
                    style={styles.forgotContainer}>
                    <Text style={styles.forgotText}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                    testID="login-button"
                    disabled={!isValid}
                    onPress={handleLogin}
                    style={[
                        styles.loginButton,
                        !isValid &&
                        styles.disabledButton,
                    ]}>
                    <Text style={styles.loginText}>
                        LOGIN
                    </Text>
                </TouchableOpacity>

                {/* Bottom */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?
                    </Text>

                    <TouchableOpacity>
                        <Text style={styles.signupText}>
                            Create Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const COLORS = {
    background: '#FAFAFA',
    primary: '#111827',
    secondary: '#6B7280',
    border: '#E5E7EB',
    white: '#FFFFFF',
    disabled: '#D1D5DB',
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
    },

    indicator: {
        width: 60,
        height: 6,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        marginBottom: 30,
    },

    header: {
        marginBottom: 40,
    },

    title: {
        fontSize: 36,
        fontWeight: '700',
        color: COLORS.primary,
    },

    subtitle: {
        fontSize: 16,
        color: COLORS.secondary,
        marginTop: 8,
        lineHeight: 24,
    },

    inputSection: {
        marginBottom: 22,
    },

    label: {
        fontSize: 12,
        letterSpacing: 1,
        fontWeight: '700',
        color: COLORS.secondary,
        marginBottom: 8,
    },

    input: {
        height: 58,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        paddingHorizontal: 18,
        fontSize: 16,
        backgroundColor: COLORS.white,
        color: COLORS.primary,
    },

    passwordBox: {
        height: 58,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
    },

    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.primary,
    },

    showText: {
        color: '#2563EB',
        fontWeight: '600',
    },

    forgotContainer: {
        alignSelf: 'flex-end',
        marginBottom: 32,
    },

    forgotText: {
        color: '#2563EB',
        fontWeight: '500',
    },

    loginButton: {
        height: 58,
        borderRadius: 29,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    disabledButton: {
        backgroundColor: COLORS.disabled,
    },

    loginText: {
        color: COLORS.white,
        fontWeight: '700',
        fontSize: 16,
        letterSpacing: 1,
    },

    footer: {
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },

    footerText: {
        color: COLORS.secondary,
        marginRight: 6,
    },

    signupText: {
        color: '#2563EB',
        fontWeight: '700',
    },
});