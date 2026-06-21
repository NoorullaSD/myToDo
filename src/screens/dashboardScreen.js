import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'

export default function DashboardScreen() {
    const navigation = useNavigation();
    const data = {
        completedToday: 24,
        pendingToday: 8,
        totalTasks: 32,
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>
                            Good Morning 👋
                        </Text>

                        <Text style={styles.userName}>
                            Welcome Back
                        </Text>
                    </View>

                    <TouchableOpacity
                        testID="profile-button"
                        activeOpacity={0.8}
                        style={styles.profileContainer}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Image
                            source={{
                                uri: 'https://i.pravatar.cc/150',
                            }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text testID="completed-count" style={styles.statNumber}>
                            {data.completedToday}
                        </Text>

                        <Text style={styles.statLabel}>
                            Completed
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text testID="pending-count" style={styles.statNumber}>
                            {data.pendingToday}
                        </Text>

                        <Text style={styles.statLabel}>
                            Pending
                        </Text>
                    </View>
                </View>

                {/* Graph Section */}
                <View style={styles.graphContainer}>
                    <Text testID="graph-section" style={styles.sectionTitle}>
                        Task Distribution
                    </Text>
                </View>

                {/* Recent Tasks */}
                <Text style={styles.sectionTitle}>
                    Recent Tasks
                </Text>

                <View testID="recent-task-1" style={styles.taskItem}>
                    <Text >
                        ✓ Design Login Screen
                    </Text>
                </View>

                <View style={styles.taskItem}>
                    <Text>
                        ✓ Firebase Authentication
                    </Text>
                </View>

                <View style={styles.taskItem}>
                    <Text>
                        ⏳ Dashboard UI
                    </Text>
                </View>

                <View style={styles.taskItem}>
                    <Text>
                        ⏳ API Integration
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },

    greeting: {
        fontSize: 16,
        color: '#64748B',
    },

    userName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 4,
    },

    profileContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        padding: 2,
        backgroundColor: '#E2E8F0',
    },

    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 8,
        marginBottom: 24,
    },

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    statCard: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },

    statNumber: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0F172A',
    },

    statLabel: {
        marginTop: 8,
        color: '#64748B',
    },

    graphContainer: {
        marginTop: 30,
        marginBottom: 30,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 16,
    },

    taskItem: {
        backgroundColor: '#FFFFFF',
        padding: 18,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 12,
    },
});