import React, { useState,useEffect } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useIsFocused  } from '@react-navigation/native';
import { updateAvatar } from "../../../Redux/slice";
const UserProfile = ({ navigation }) => {
    const name = useSelector((state) => state.account.userName);
    const avt = useSelector((state) => state.account.avt);
    const [searchText, setSearchText] = useState('');
    const [avatar, setAvatar] = useState(avt); 
    const isFocused = useIsFocused();
    const dispatch = useDispatch(); 
    useEffect(() => {
      if (isFocused) {
        dispatch(updateAvatar(avatar));
      }
    }, [isFocused]);
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.searchContainer}>
                <EvilIcons name="search" size={40} color="white" />
                    <TextInput
                        placeholder="Tìm kiếm"
                        placeholderTextColor="#ffffff"
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}
                    style={styles.profileContainer}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: avt }} 
                            resizeMode="cover"
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{name}</Text>
                        <Text style={styles.profileText}>Xem trang cá nhân</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.touchableOpacity}>
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.contentButton}>
                        <Entypo name="wallet" size={24} color="#015CE0" />
                        <Text style={styles.text}>Ví QR</Text>
                        </View>
                        <Text style={styles.description}>
                        Lưu trữ và xuất trình các mã QR quan trọng
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.contentButton}>
                        <Entypo name="icloud" size={24} color="#015CE0" />
                        <Text style={styles.text}>Cloud của tôi</Text>
                        </View>
                        <Text style={styles.description}>Lưu trữ các tin nhắn quan trọng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.contentButton}>
                        <Feather name="pie-chart" size={24} color="#015CE0" />
                        <Text style={styles.text}>Quản lí dung lượng và bộ nhớ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                    <View style={styles.contentButton}>
                    <MaterialIcons name="security" size={24} color="#015CE0" />
                        <Text style={styles.text}>Tài khoản và bảo mật</Text>

</View>      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.contentButton}>
                        <Feather name="lock" size={24} color="#015CE0" />
                        <Text style={styles.text}>Quyền riêng tư</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    searchContainer: {
        backgroundColor: '#1faeeb',
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection:'row'
    },
    searchInput: {
        backgroundColor: '#1faeeb',
        borderRadius: 20,
        color: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingVertical: 7,
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    avatarContainer: {
        marginRight: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30, 
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        color: "#000000",
        fontSize: 20,
        marginBottom: 5,
    },
    profileText: {
        color: "#635b5b",
        fontSize: 12,
    },
    touchableOpacity: {
        flexDirection: "column",
        alignItems: "flex-start",
        borderColor:"#DDDDDD",
        borderBottomWidth:1,
    },
    item: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginHorizontal: 14,
        marginBottom: 20,
      
    },
    contentButton:{
        marginTop:20,

        flexDirection: "row",
    },
    text: {
        color: "#000000",
        fontSize: 20,
        flex: 1,
    },
    description: {
        color: "#635b5b",
        fontSize: 15,
        marginBottom: 10,
        marginLeft: 14,
        textAlign: "left",
    },
});

export default UserProfile;
