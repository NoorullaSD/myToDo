import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FirestoreService from '../service/firestoreService';
export default function TaskListScreen() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTasks = async () => {
        try {
            const taskList = await FirestoreService.getTasks();
            setTasks(taskList);
        } catch (error) {
            console.log('Fetch Task Error:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchTasks();
    }, []);

    const renderTask = ({ item }) => (
        <View style={styles.taskCard}>
            <View style={styles.topRow}>
                <Text style={styles.taskName}>
                    {item.taskName}
                </Text>

                <View
                    style={[
                        styles.priorityBadge,
                        item.priority === 'High'
                            ? styles.highPriority
                            : item.priority === 'Medium'
                                ? styles.mediumPriority
                                : styles.lowPriority,
                    ]}>
                    <Text style={styles.priorityText}>
                        {item.priority}
                    </Text>
                </View>
            </View>

            <Text style={styles.description}>
                {item.description}
            </Text>

            <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                    📁 {item.category}
                </Text>

                <Text style={styles.infoText}>
                    {item.isRegular
                        ? '🔁 Regular'
                        : '📝 One Time'}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                    🔔 {item.reminder ? 'On' : 'Off'}
                </Text>

                <Text style={styles.status}>
                    {item.status}
                </Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.loaderContainer}>
                <ActivityIndicator
                    size="large"
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>
                My Tasks
            </Text>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={renderTask}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No Tasks Found
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 20,
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0F172A',
        marginVertical: 20,
    },

    taskCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    taskName: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },

    description: {
        marginTop: 10,
        color: '#64748B',
        lineHeight: 22,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },

    infoText: {
        color: '#475569',
        fontSize: 13,
    },

    priorityBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },

    lowPriority: {
        backgroundColor: '#DCFCE7',
    },

    mediumPriority: {
        backgroundColor: '#FEF3C7',
    },

    highPriority: {
        backgroundColor: '#FEE2E2',
    },

    priorityText: {
        fontSize: 12,
        fontWeight: '700',
    },

    status: {
        fontWeight: '700',
        color: '#2563EB',
    },

    emptyContainer: {
        marginTop: 80,
        alignItems: 'center',
    },

    emptyText: {
        color: '#94A3B8',
        fontSize: 16,
    },
});