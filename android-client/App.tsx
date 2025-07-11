import { CustomTabBar } from '@/components/UI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme as NavDark, NavigationContainer, DefaultTheme as NavLight } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { MD3DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { UserProvider, useUser } from './src/context/UserContext';
import { RootStackParamList } from './src/types/Types';

// Import car list screens
import luxuryList from './src/screens/carListTabScreens/luxuryList';
import sedanList from './src/screens/carListTabScreens/sedanList';
import suvList from './src/screens/carListTabScreens/suvList';

// Import stack screens
import Chatroom from '@/screens/stackScreens/Chatroom';
import Booking from './src/screens/stackScreens/Booking';
import BookingConfirm from './src/screens/stackScreens/BookingConfirmation';
import carDetail from './src/screens/stackScreens/CarDetail';
import HomeScreen from './src/screens/stackScreens/HomeScreen';

import ChatList from '@/screens/stackScreens/ChatList';
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerComponent from './src/screens/drawerScreens/CustomDrawerComponent';
import Profile from './src/screens/drawerScreens/ProfileScreen';


import LoginScreen from '@/screens/stackScreens/LoginScreen';
import Ionicons from "react-native-vector-icons/Ionicons";

import ListCarScreen from '@/screens/stackScreens/CarListingScreen';
import RegisterScreen from '@/screens/stackScreens/RegisterScreen';

import UpdateCarListing from '@/screens/stackScreens/UpdateCarListing';

LogBox.ignoreLogs([
    'EventEmitter.removeListener',
    'This method is deprecated',
    'Method called was `collection`',
    'Method called was `add`'
]);

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CarTypeBottomTab = () => {
    const theme = useTheme();

    return (
        <Tab.Navigator
            initialRouteName='sedanList'
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.onBackground,
                    borderTopWidth: 1,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.onBackground
            }}
        >
            <Tab.Screen
                name='suvList'
                component={suvList}
                options={{
                    tabBarLabel: 'SUV',
                }}
            />
            <Tab.Screen
                name='sedanList'
                component={sedanList}
                options={{
                    tabBarLabel: 'Sedan',
                }}
            />
            <Tab.Screen
                name='luxuryList'
                component={luxuryList}
                options={{
                    tabBarLabel: 'Luxury',
                }}
            />
        </Tab.Navigator>
    )
}

const MainStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="Chatroom" component={Chatroom} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="CarTabs" component={CarTypeBottomTab} />
        <Stack.Screen name="CarDetail" component={carDetail} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="BookingConfirm" component={BookingConfirm} />
        <Stack.Screen name="ListCarScreen" component={ListCarScreen} />
        <Stack.Screen name="UpdateCar" component={UpdateCarListing} />
    </Stack.Navigator>
);

const App = () => {
    return (
        <UserProvider>
            <AppContent />
        </UserProvider>
    );
}

// Create a separate component for the app content that uses the context
const AppContent = () => {
    const { user } = useUser();
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('isDarkTheme');
                if (savedTheme !== null) {
                    setIsDarkTheme(JSON.parse(savedTheme));
                }
            } catch (error) {
                console.log('Error loading theme:', error);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        try {
            await AsyncStorage.setItem('isDarkTheme', JSON.stringify(!isDarkTheme));
            setIsDarkTheme(!isDarkTheme);
        } catch (error) {
            console.log('Error saving theme:', error);
        }
    };
    const CustomDefaultTheme = {
        ...NavLight,
        ...PaperDefaultTheme,
        colors: {
            ...NavLight.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            text: '#333333',
            primary: '#00b14f',
            secondary: '#f1f1f1',
            surface: '#ffffff',
            border: '#e0e0e0',
        }
    }

    const CustomDarkTheme = {
        ...NavDark,
        ...PaperDarkTheme,
        colors: {
            ...NavDark.colors,
            ...PaperDarkTheme.colors,
            background: '#333333',
            text: '#ffffff',
            primary: '#00b14f',
            secondary: '#1f1f1f',
            surface: '#1f1f1f',
            border: '#444444',
        }
    }

    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

    const handleHomePress = (navigation: any) => {
        navigation.navigate('Home Screen', {
            screen: 'Home'
        });
        navigation.closeDrawer();
    };

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <Drawer.Navigator
                    drawerContent={(props) => (
                        <CustomDrawerComponent
                            {...props}
                            isDarkTheme={isDarkTheme}
                            toggleTheme={toggleTheme}
                        />
                    )}
                    screenOptions={{
                        drawerStyle: { width: '65%' },
                        headerShown: false,
                    }}
                >
                    <Drawer.Screen name="Home Screen"
                        component={MainStack}
                        options={{
                            drawerIcon: ({ color }) => (
                                <Ionicons name="home-outline" size={20} color={color} />
                            ),
                            drawerLabelStyle: { fontSize: 20 },
                        }}
                        listeners={({ navigation }) => ({
                            drawerItemPress: (e) => {
                                e.preventDefault();
                                handleHomePress(navigation);
                            }
                        })}
                    />


                    {user ?
                        (<>
                            <Drawer.Screen name="Chats"
                                component={ChatList}
                                options={{
                                    drawerIcon: ({ color }) => (
                                        <Ionicons name="chatbubbles-outline" size={20} color={color} />
                                    ),
                                    drawerLabelStyle: { fontSize: 20 },
                                }}
                            />

                            <Drawer.Screen
                                name="Profile"
                                component={Profile}
                                options={{
                                    drawerIcon: ({ color }) => (
                                        <Ionicons name="man-outline" size={20} color={color} />
                                    ),
                                    drawerLabelStyle: { fontSize: 20 },
                                }}
                            />
                        </>
                        ) : (
                            <Drawer.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{
                                    drawerIcon: ({ color }) => (
                                        <Ionicons name="enter-outline" size={20} color={color} />
                                    ),
                                    drawerLabelStyle: { fontSize: 20 },
                                }}
                            />
                        )}
                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App;