import { getApp } from '@react-native-firebase/app';

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from '@react-native-firebase/auth';

const auth = getAuth(getApp());

class AuthService {
    async login(email, password) {
        return await signInWithEmailAndPassword(
            auth,
            email,
            password,
        );
    }

    async register(email, password) {
        return await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
    }

    async logout() {
        if (auth.currentUser) {
            await signOut(auth);
        }
    }

    getCurrentUser() {
        return auth.currentUser;
    }

    getCurrentUserId() {
        return auth.currentUser?.uid;
    }
}

export default new AuthService();