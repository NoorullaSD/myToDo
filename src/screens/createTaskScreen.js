import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FirestoreService from '../service/firestoreService';
import NotificationService from '../service/notificationService';
import { scheduleReminder } from '../shared/scheduleReminder'
import DatePicker from 'react-native-date-picker';


const priorities = ['Low', 'Medium', 'High'];

const categories = [
    'Work',
    'Personal',
    'Study',
    'Health',
];

export default function CreateTaskScreen() {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const [priority, setPriority] =
        useState('Medium');

    const [category, setCategory] =
        useState('Work');

    const [isRegular, setIsRegular] =
        useState(false);

    const [reminder, setReminder] =
        useState(false);

    const handleCreateTask =
        async () => {
            try {
                const taskId =
                    await FirestoreService.createTask({
                        taskName,
                        description,
                        priority,
                        category,
                        isRegular,
                        reminder,
                        status: 'Pending',
                        reminderDate: date
                            ? date.toISOString()
                            : null,
                    });

                console.log(
                    'Task Id:',
                    taskId,
                );

                await scheduleReminder(
                    taskName,
                    date,
                );


                await NotificationService.showLocalNotification(
                    'Task Created 🎉',
                    `${taskName} created successfully`,
                );

                setTaskName('');
                setDescription('');
                setPriority('Medium');
                setCategory('Work');
                setIsRegular(false);
                setReminder(false);
            } catch (error) {
                console.log(error);
            }
        };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>
                    Create Task
                </Text>

                {/* Task Name */}

                <Text style={styles.label}>
                    Task Name
                </Text>

                <TextInput
                    placeholder="Enter task name"
                    value={taskName}
                    onChangeText={setTaskName}
                    style={styles.input}
                />

                {/* Description */}

                <Text style={styles.label}>
                    Description
                </Text>

                <TextInput
                    placeholder="Enter task description"
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                    style={[
                        styles.input,
                        styles.descriptionInput,
                    ]}
                />

                {/* Priority */}

                <Text style={styles.label}>
                    Priority
                </Text>

                <View style={styles.row}>
                    {priorities.map(item => (
                        <TouchableOpacity
                            key={item}
                            onPress={() =>
                                setPriority(item)
                            }
                            style={[
                                styles.tag,
                                priority === item &&
                                styles.activeTag,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tagText,
                                    priority === item &&
                                    styles.activeTagText,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Category */}

                <Text style={styles.label}>
                    Category
                </Text>

                <View style={styles.row}>
                    {categories.map(item => (
                        <TouchableOpacity
                            key={item}
                            onPress={() =>
                                setCategory(item)
                            }
                            style={[
                                styles.tag,
                                category === item &&
                                styles.activeTag,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tagText,
                                    category === item &&
                                    styles.activeTagText,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Regular Task */}

                <View style={styles.switchRow}>
                    <Text style={styles.switchText}>
                        Regular Task
                    </Text>

                    <Switch
                        value={isRegular}
                        onValueChange={setIsRegular}
                    />
                </View>

                {/* Reminder */}

                <View style={styles.switchRow}>
                    <Text style={styles.switchText}>
                        Enable Reminder
                    </Text>

                    <Switch
                        value={reminder}
                        onValueChange={setReminder}
                    />
                </View>

                {
                    reminder ?
                        <Text
                            onPress={() => setOpen(true)}
                            style={styles.date}
                        >
                            {date
                                ? date.toLocaleString()
                                : 'Set Reminder Date & Time'}
                        </Text>
                        :
                        null
                }
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="datetime"
                    onConfirm={(selectedDate) => {
                        setOpen(false);
                        setDate(selectedDate);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />

                {/* Create Button */}

                <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleCreateTask}
                >
                    <Text style={styles.buttonText}>
                        Create Task
                    </Text>
                </TouchableOpacity>
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

    heading: {
        fontSize: 30,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 10,
        marginBottom: 30,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
        marginTop: 16,
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        color: '#0F172A',
    },

    descriptionInput: {
        height: 120,
        textAlignVertical: 'top',
        paddingTop: 16,
    },

    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },

    tag: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#E2E8F0',
    },

    activeTag: {
        backgroundColor: '#2563EB',
    },

    tagText: {
        color: '#475569',
        fontWeight: '600',
    },

    activeTagText: {
        color: '#FFFFFF',
    },

    switchRow: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    switchText: {
        fontSize: 16,
        color: '#0F172A',
        fontWeight: '500',
    },

    createButton: {
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    date: {
        padding: 12,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});