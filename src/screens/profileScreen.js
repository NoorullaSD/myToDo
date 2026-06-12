import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { logout } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  signOut,
} from '@react-native-firebase/auth';


const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.8}>
    <View style={styles.menuLeft}>
      <Ionicons
        name={icon}
        size={22}
        color="#0F172A"
      />
      <Text style={styles.menuText}>
        {title}
      </Text>
    </View>

    <Ionicons
      name="chevron-forward"
      size={18}
      color="#94A3B8"
    />
  </TouchableOpacity>
);



export default function ProfileScreen() {

  const navigation = useNavigation()
  const dispatch = useDispatch();

  const auth = getAuth(getApp());

  console.log('Current User:', auth);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigation.navigate('Login')
    } catch (error) {
      navigation.navigate('Login')
      console.log('Logout Error:', error);
    }
  };

  const user = {
    name: 'Noorulla',
    email: 'noorulla@gmail.com',
    completedTasks: 124,
    pendingTasks: 12,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Profile
          </Text>
        </View>

        {/* Profile */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://i.pravatar.cc/300',
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {user.name}
          </Text>

          <Text style={styles.email}>
            {user.email}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {user.completedTasks}
            </Text>

            <Text style={styles.statLabel}>
              Completed
            </Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {user.pendingTasks}
            </Text>

            <Text style={styles.statLabel}>
              Pending
            </Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon="person-outline"
            title="Edit Profile"
          />

          <MenuItem
            icon="notifications-outline"
            title="Notifications"
          />

          <MenuItem
            icon="lock-closed-outline"
            title="Change Password"
          />

          <MenuItem
            icon="settings-outline"
            title="Settings"
          />

          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogOut}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.logoutText}>
            Logout
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
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0F172A',
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  name: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },

  email: {
    marginTop: 6,
    fontSize: 14,
    color: '#64748B',
  },

  statsRow: {
    flexDirection: 'row',
    marginTop: 35,
    paddingHorizontal: 24,
    gap: 12,
  },

  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },

  statLabel: {
    marginTop: 5,
    color: '#64748B',
  },

  menuContainer: {
    marginTop: 35,
    paddingHorizontal: 24,
  },

  menuItem: {
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    marginLeft: 14,
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },

  logoutButton: {
    marginHorizontal: 24,
    marginTop: 40,
    marginBottom: 30,

    height: 56,
    borderRadius: 28,

    backgroundColor: '#EF4444',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});