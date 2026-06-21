import React from 'react';

import {
    render,
    fireEvent,
    waitFor,
} from '@testing-library/react-native';

import LoginScreen from '../src/screens/loginScreen';

const mockNavigate = jest.fn();

const mockDispatch = jest.fn();

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
}));

jest.mock('../src/service/authService', () => ({
    login: jest.fn(),
}));

jest.mock('../src/service/notificationService', () => ({
    getFCMToken: jest.fn(),
}));

jest.mock('../src/service/firestoreService', () => ({
    saveUserFCMToken: jest.fn(),
}));

jest.mock(
    '@react-native-async-storage/async-storage',
    () => ({
        getItem: jest.fn(),
        setItem: jest.fn(),
    }),
);

describe('LoginScreen', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders screen', async () => {

        const { getByText } = await render(<LoginScreen />);

        expect(
            getByText('Welcome Back')
        ).toBeTruthy();

        expect(
            getByText('LOGIN')
        ).toBeTruthy();
    });

    test('email input works', async () => {

        const { getByTestId } = await render(<LoginScreen />);

        const email =
            getByTestId('email-input');

        fireEvent.changeText(
            getByTestId('email-input'),
            'noorulla@gmail.com'
        );

        expect(
            getByTestId('email-input').props.value
        ).toHaveProp('value', 'noorulla@gmail.com');
    });

    test('password input works', async () => {

        const { getByTestId } = await render(<LoginScreen />);

        const password =
            getByTestId('password-input');

        fireEvent.changeText(
            getByTestId('password-input'),
            'Noor@6199'
        );

        expect(
            getByTestId('password-input').props.value
        ).toHaveProp('value', 'Noor@6199');
    });

    test('toggle password visibility', async () => {

        const { getByTestId, } = await render(<LoginScreen />);

        const password =
            getByTestId('password-input');

        const toggle =
            getByTestId('toggle-password');

        expect(
            password.props.secureTextEntry
        ).toBe(true);

        fireEvent.press(toggle);

        expect(
            password.props.secureTextEntry
        ).toBe(false);
    });

    test('login button disabled initially', async () => {

        const { getByTestId } = await render(<LoginScreen />);

        expect(
            getByTestId('login-button')
                .props.disabled
        ).toBe(true);
    });

    test('login button enabled', async () => {

        const { getByTestId, } = await render(<LoginScreen />);

        fireEvent.changeText(
            getByTestId('email-input'),
            'er.noorulla@gmail.com'
        );

        fireEvent.changeText(
            getByTestId('password-input'),
            'Noor@6199'
        );

        expect(
            getByTestId('login-button')
                .props.disabled
        ).toBe(false);
    });

});