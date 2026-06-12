import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle, withSpring, } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DashboardScreen from '../screens/dashboardScreen'
import CreateTaskScreen from '../screens/createTaskScreen'
import TaskListScreen from '../screens/taskListScreen'

const Tab = createBottomTabNavigator();



function AnimatedTab({ focused, iconName, label, onPress }) {

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSpring(
                        focused ? 1.1 : 1,
                    ),
                },
            ],
        };
    });

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.tabButton}>
            <Animated.View
                style={[
                    styles.iconWrapper,
                    focused &&
                    styles.activeIconWrapper,
                    animatedStyle,
                ]}>
                <Ionicons name={iconName} size={22} color={focused ? '#FFFFFF' : '#6B7280'} />
                {focused && (
                    <Text style={styles.activeLabel}>
                        {label}
                    </Text>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
}

function CustomTabBar({
    state,
    navigation,
}) {
    return (
        <View style={styles.tabContainer}>
            {/* Floating Create Button */}
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.createButton}
                onPress={() =>
                    navigation.navigate(
                        'CreateTask',
                    )
                }
            >
                <Ionicons
                    name="add"
                    size={34}
                    color="#fff"
                />
            </TouchableOpacity>

            <View style={styles.tabBar}>
                {/* Dashboard */}
                <AnimatedTab
                    focused={
                        state.routes[state.index]
                            .name === 'Dashboard'
                    }
                    iconName={
                        state.routes[state.index]
                            .name === 'Dashboard'
                            ? 'home'
                            : 'home-outline'
                    }
                    label="Dashboard"
                    onPress={() =>
                        navigation.navigate(
                            'Dashboard',
                        )
                    }
                />

                {/* Space for Floating Button */}
                <View style={styles.tabSpacer} />

                {/* Task List */}
                <AnimatedTab
                    focused={
                        state.routes[state.index]
                            .name === 'TaskList'
                    }
                    iconName={
                        state.routes[state.index]
                            .name === 'TaskList'
                            ? 'clipboard'
                            : 'clipboard-outline'
                    }
                    label="Tasks"
                    onPress={() =>
                        navigation.navigate(
                            'TaskList',
                        )
                    }
                />
            </View>
        </View>
    );
}

function CustomTabBarWrapper(props) {
    return <CustomTabBar {...props} />;
}


export default function BottomTabs() {
    return (
        <Tab.Navigator tabBar={CustomTabBarWrapper} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="CreateTask" component={CreateTaskScreen} />
            <Tab.Screen name="TaskList" component={TaskListScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },

    screenTitle: {
        fontSize: 28,
        fontWeight: '700',
    },

    tabContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },

    tabBar: {
        height: 72,
        borderRadius: 36,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    createButton: {
        position: 'absolute',
        alignSelf: 'center',
        top: -28,
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },

    tabButton: {
        flex: 1,
        alignItems: 'center',
    },

    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 18,
    },

    activeIconWrapper: {
        backgroundColor: '#111827',
    },

    activeLabel: {
        color: '#FFFFFF',
        marginLeft: 8,
        fontWeight: '600',
        fontSize: 12,
    },

    tabSpacer: {
        width: 90
    }
});