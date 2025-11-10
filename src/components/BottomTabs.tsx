import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Screens/HomeScreen';
import LearningScreen from '../Screens/LearningScreen';
import ShopScreen from '../Screens/ShopScreen';
import InventoryScreen from '../Screens/InventoryScreen';
import ProfileScreen from '../Screens/SHG/ProfileScreen';
import { SafeAreaView } from 'react-native-safe-area-context';


const BottomTabs = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const renderScreen = () => {
        switch (activeTab) {
            case 'Home':
                return <HomeScreen />;
            case 'Learning':
                return <LearningScreen />;
            case 'Shop':
                return <ShopScreen />;
            case 'Inventory':
                return <InventoryScreen />;
            case 'Profile':
                return <ProfileScreen />;
            default:
                return <HomeScreen />;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <View style={{ flex: 1 }}>
                {renderScreen()}

                {/* Bottom Tab Bar */}
                <View style={styles.tabContainer}>
                    {[
                        { name: 'Home', icon: 'home-outline', filled: 'home' },
                        { name: 'Learning', icon: 'book-outline', filled: 'book' },
                        { name: 'Shop', icon: 'cart-outline', filled: 'cart' },
                        { name: 'Inventory', icon: 'cube-outline', filled: 'cube' },
                        { name: 'Profile', icon: 'person-outline', filled: 'person' },
                    ].map((tab) => (
                        <TouchableOpacity
                            key={tab.name}
                            style={styles.tab}
                            onPress={() => setActiveTab(tab.name)}>
                            <Ionicons
                                name={activeTab === tab.name ? tab.filled : tab.icon}
                                size={25}
                                color={activeTab === tab.name ? '#007bff' : 'gray'}
                            />
                            <Text
                                style={[
                                    styles.label,
                                    activeTab === tab.name && styles.activeLabel,
                                ]}>
                                {tab.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingVertical: 8,
        elevation: 8,
    },
    tab: { alignItems: 'center' },
    label: { fontSize: 11, color: 'gray' },
    activeLabel: { color: '#007bff', fontWeight: '600' },
});

export default BottomTabs;
