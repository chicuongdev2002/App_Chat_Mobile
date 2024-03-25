import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile'
const UserProfile = ({ navigation }) => {
    const name = useSelector((state) => state.account.userName);
    const avt = useSelector((state) => state.account.avt);
    const [searchText, setSearchText] = useState('');

    return (
        <SafeAreaView 
            style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
            }}>
            <ScrollView  
                style={{
                    flex: 1,
                    backgroundColor: "#d9d9d9",
                }}>
                <View style={{ backgroundColor: '#1fadea', paddingVertical: 15, paddingHorizontal: 10 }}>
                    <TextInput
                        placeholder="Tìm kiếm"
                        placeholderTextColor="#ffffff"
                        style={{
                            backgroundColor: '#1584c8',
                            borderRadius: 20,
                            color: '#ffffff',
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            marginBottom: 10,
                        }}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#ffffff",
                        paddingVertical: 7,
                        marginBottom: 8,
                        paddingHorizontal: 10,
                    }}>
                    <View style={{ marginRight: 10 }}>
                        <Image
                            source={{ uri: avt }} 
                            resizeMode="cover"
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30, 
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text 
                            style={{
                                color: "#000000",
                                fontSize: 16,
                                marginBottom: 5,
                            }}>
                            {name}
                        </Text>
                        <Text 
                            style={{
                                color: "#635b5b",
                                fontSize: 12,
                            }}>
                            {"Xem trang cá nhân"}
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UserProfile;
