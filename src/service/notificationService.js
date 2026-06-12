import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, } from '@notifee/react-native';

class NotificationService {
    async requestPermission() {
        const status =
            await messaging().requestPermission();

        return status;
    }

    async getFCMToken() {
        const token =
            await messaging().getToken();

        console.log(
            'FCM Token:',
            token,
        );

        return token;
    }

    async saveToken() {
        const token = await this.getFCMToken();

        console.log('FCM Token:', token);

        return token;
    }

    foregroundListener() {
        return messaging().onMessage(
            async remoteMessage => {
                console.log(
                    'Foreground Notification:',
                    remoteMessage,
                );
            },
        );
    }

    backgroundHandler() {
        messaging().setBackgroundMessageHandler(
            async remoteMessage => {
                console.log(
                    'Background Notification:',
                    remoteMessage,
                );
            },
        );
    }


    async showLocalNotification(
        title,
        body,
    ) {
        const channelId =
            await notifee.createChannel({
                id: 'tasks',
                name: 'Task Notifications',
                importance:
                    AndroidImportance.HIGH,
            });

        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId,
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

}

export default new NotificationService();