import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useApp } from '../context/AppContext';

import SplashScreen from '../screens/SplashScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';
import NoteUploadScreen from '../screens/NoteUploadScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import MyUploadsScreen from '../screens/MyUploadsScreen';
import UserManagementScreen from '../screens/UserManagementScreen';
import GuestViewScreen from '../screens/GuestViewScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
    </Stack.Navigator>
  );
}

function UserTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="Upload" component={NoteUploadScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AdminTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="Admin" component={AdminDashboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function GuestTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="Guest" component={GuestViewScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { user } = useApp();
  const [showSplash, setShowSplash] = React.useState(true);
  const [selectedRole, setSelectedRole] = React.useState(null);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!selectedRole ? (
          <Stack.Screen
            name="RoleSelection"
            component={RoleSelectionScreen}
            initialParams={{ onSelectRole: setSelectedRole }}
          />
        ) : !user ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              initialParams={{ role: selectedRole, onBackRole: () => setSelectedRole(null) }}
            />
            {selectedRole === 'user' && (
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ animationEnabled: true }}
              />
            )}
          </>
        ) : user.role === 'admin' ? (
          <Stack.Screen name="AdminApp" component={AdminTabNavigator} />
        ) : user.role === 'guest' ? (
          <Stack.Screen name="GuestApp" component={GuestTabNavigator} />
        ) : (
          <>
            <Stack.Screen name="UserApp" component={UserTabNavigator} />
            <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
            <Stack.Screen name="MyUploads" component={MyUploadsScreen} />
            <Stack.Screen name="UserManagement" component={UserManagementScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}