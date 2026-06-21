import React from 'react';

import { render, fireEvent, } from '@testing-library/react-native';

import DashboardScreen from '../src/screens/dashboardScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

describe('DashboardScreen', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders greeting text', async () => {

        const { getByText } = await render(<DashboardScreen />);

        expect(
            getByText('Good Morning 👋')
        ).toBeTruthy();

        expect(
            getByText('Welcome Back')
        ).toBeTruthy();
    });

    test('renders statistics', async () => {

        const { getByText } = await render(<DashboardScreen />);

        expect(
            getByText('24')
        ).toBeTruthy();

        expect(
            getByText('8')
        ).toBeTruthy();

        expect(
            getByText('Completed')
        ).toBeTruthy();

        expect(
            getByText('Pending')
        ).toBeTruthy();
    });

    test('renders task distribution section', async () => {

        const { getByText } = await render(<DashboardScreen />);

        expect(
            getByText('Task Distribution')
        ).toBeTruthy();
    });

    test('renders recent tasks', async () => {

        const { getByText } = await render(<DashboardScreen />);

        expect(
            getByText('✓ Design Login Screen')
        ).toBeTruthy();

        expect(
            getByText('✓ Firebase Authentication')
        ).toBeTruthy();

        expect(
            getByText('⏳ Dashboard UI')
        ).toBeTruthy();

        expect(
            getByText('⏳ API Integration')
        ).toBeTruthy();
    });

    test('navigates to profile screen', async () => {

        const { getByTestId } = await render(<DashboardScreen />);

        fireEvent.press(
            getByTestId('profile-button')
        );

        expect(mockNavigate)
            .toHaveBeenCalledWith('Profile');
    });

});