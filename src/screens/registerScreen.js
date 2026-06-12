import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

const ValidationRow = ({ valid, text }) => (
  <Text
    style={[
      styles?.validationText,
      valid ? styles.validationTextValid : styles.validationTextInvalid,
    ]}>
    {valid ? '✓' : '○'} {text}
  </Text>
);

export default function RegisterScreen() {
  const [email, setEmail] = useState('er.noorulla@gmail.com');
  const [username, setUsername] = useState('NOORULLA24');
  const [password, setPassword] = useState('Noor@6199');
  const [confirmPassword, setConfirmPassword] = useState('Noor@6199');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // Email Validation
  const emailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Username Validation
  const usernameValid =
    username.length > 0 &&
    username === username.toUpperCase() &&
    !/\s/.test(username);

  // Password Rules
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar =
    /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNoSpace = !/\s/.test(password);
  const hasMinLength = password.length >= 6;

  const passwordValid =
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar &&
    hasNoSpace &&
    hasMinLength;

  const passwordMatch =
    password.length > 0 &&
    password === confirmPassword;

  const isFormValid = useMemo(() => {
    return (
      emailValid &&
      usernameValid &&
      passwordValid &&
      passwordMatch
    );
  }, [
    emailValid,
    usernameValid,
    passwordValid,
    passwordMatch,
  ]);

  const handleRegister = async () => {
    try {
      const response =
        await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

      console.log(
        'User Created:',
        response.user.uid,
      );

    } catch (error) {
      console.log(error);

      if (error.code === 'auth/email-already-in-use') {
        console.log('Email already exists');
      } else if (
        error.code === 'auth/invalid-email'
      ) {
        console.log('Invalid email');
      } else if (
        error.code === 'auth/weak-password'
      ) {
        console.log('Weak password');
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView style={styles.keyBoardContainer} behavior="padding">
          <View style={styles.indicator} />

          <Text style={styles.title}>
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Welcome back. Enter your details below.
          </Text>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL</Text>

            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            {email.length > 0 && (
              <Text
                style={[
                  styles.infoText,
                  emailValid ? styles.validationTextValid : styles.validationTextInvalid,
                ]}>
                {emailValid ? '✓ Valid email address' : '✗ Invalid email'}
              </Text>
            )}
          </View>

          {/* Username */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>USERNAME</Text>

            <TextInput
              style={styles.input}
              placeholder="NOORULLA"
              placeholderTextColor="#9CA3AF"
              value={username}
              onChangeText={text =>
                setUsername(text.toUpperCase())
              }
            />

            {username.length > 0 && (
              <Text
                style={[
                  styles.infoText,
                  usernameValid ? styles.validationTextValid : styles.validationTextInvalid,
                ]}>
                {usernameValid ? '✓ Valid username' : '✗ Uppercase only, no spaces'}
              </Text>
            )}
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>PASSWORD</Text>

            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(!showPassword)
                }>
                <Text style={styles.eye}>
                  {showPassword
                    ? 'Hide'
                    : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rulesContainer}>
              <ValidationRow
                valid={hasUpperCase}
                text="One uppercase letter"
              />
              <ValidationRow
                valid={hasLowerCase}
                text="One lowercase letter"
              />
              <ValidationRow
                valid={hasNumber}
                text="One number"
              />
              <ValidationRow
                valid={hasSpecialChar}
                text="One special character"
              />
              <ValidationRow
                valid={hasMinLength}
                text="Minimum 6 characters"
              />
              <ValidationRow
                valid={hasNoSpace}
                text="No spaces"
              />
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              CONFIRM PASSWORD
            </Text>

            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Re-enter password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword,
                  )
                }>
                <Text style={styles.eye}>
                  {showConfirmPassword
                    ? 'Hide'
                    : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            {confirmPassword.length > 0 && (
              <Text
                style={[
                  styles.infoText,
                  passwordMatch ? styles.infoValid : styles.infoInvalid,
                ]}>
                {passwordMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
              </Text>
            )}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            disabled={!isFormValid}
            onPress={handleRegister}
            style={[
              styles.button,
              !isFormValid &&
              styles.disabledButton,
            ]}>
            <Text style={styles.buttonText}>
              CREATE ACCOUNT
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  keyBoardContainer: {
    marginBottom: 20
  },
  indicator: {
    marginBottom: 10,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 36,
  },

  inputContainer: {
    marginBottom: 22,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
    marginBottom: 8,
  },

  input: {
    height: 58,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },

  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },

  passwordInput: {
    flex: 1,
    height: 58,
    fontSize: 16,
    color: '#111827',
  },

  eye: {
    color: '#2563EB',
    fontWeight: '600',
  },

  infoText: {
    marginTop: 8,
    fontSize: 13,
  },

  validationTextValid: {
    fontSize: 13,
    color: '#22C55E'
  },

  validationTextInvalid: {
    fontSize: 13,
    color: '#EF4444'
  },

  rulesContainer: {
    marginTop: 12,
    gap: 4,
  },

  validationText: {
    fontSize: 13,
  },

  button: {
    height: 58,
    borderRadius: 30,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },

  disabledButton: {
    backgroundColor: '#D1D5DB',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});