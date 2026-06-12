import notifee, {
    TriggerType,
    AndroidImportance,
} from '@notifee/react-native';

export const scheduleReminder = async (
    taskName,
    reminderDate,
) => {
    const channelId =
        await notifee.createChannel({
            id: 'tasks',
            name: 'Task Reminders',
            importance:
                AndroidImportance.HIGH,
        });

    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: new Date(
            reminderDate,
        ).getTime(),
    };

    await notifee.createTriggerNotification(
        {
            title: 'Task Reminder ⏰',
            body: taskName,
            android: {
                channelId,
            },
        },
        trigger,
    );
};