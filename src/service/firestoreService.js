import { getApp } from '@react-native-firebase/app';

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
} from '@react-native-firebase/firestore';

import AuthService from './authService';

const db = getFirestore(getApp());

class FirestoreService {
    async createTask(taskData) {
        const docRef = await addDoc(
            collection(db, 'tasks'),
            {
                ...taskData,
                userId:
                    AuthService.getCurrentUserId(),
                createdAt:
                    serverTimestamp(),
            },
        );

        return docRef.id;
    }

    async getTasks() {
        const q = query(
            collection(db, 'tasks'),
            where(
                'userId',
                '==',
                AuthService.getCurrentUserId(),
            ),
        );

        const snapshot =
            await getDocs(q);

        return snapshot.docs.map(
            item => ({
                id: item.id,
                ...item.data(),
            }),
        );
    }

    async updateTaskStatus(
        taskId,
        status,
    ) {
        await updateDoc(
            doc(db, 'tasks', taskId),
            {
                status,
            },
        );
    }

    async deleteTask(taskId) {
        await deleteDoc(
            doc(db, 'tasks', taskId),
        );
    }

    async saveUserFCMToken(uid, token) {
        await setDoc(
            doc(db, 'users', uid),
            {
                fcmToken: token,
                updatedAt: serverTimestamp(),
            },
            { merge: true },
        );
    }
}

export default new FirestoreService();