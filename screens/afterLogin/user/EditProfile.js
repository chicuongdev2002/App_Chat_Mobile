import React, { useState,useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Platform, Alert,ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from 'axios'; 
import { useSelector, useDispatch } from 'react-redux';
import {save, updateAvatar } from "../../../Redux/slice";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import profileImage from '../../../assets/profile.png';
import { Audio } from 'expo-av';
import ButtonWithAudio from '../../../components/ButtonWithAudio';
const EditProfile = ({navigation}) => {
  const coverImage= useSelector((state) => state.account.coverImage);
  const name = useSelector((state) => state.account.userName);
  const avt = useSelector((state) => state.account.avt);
  const bio = useSelector((state) => state.account.bio);
  const userNewData = useSelector((state) => state.account);
  const dispatch = useDispatch(); 
  // const avatar=useState("")
  // const coverImage=useState("")
  const [avatar, setAvatar] = useState(avt); 
// const lastName = name.split(' ').pop(); 
  useEffect(() => {
    // Update Redux khi avt thay đổi
    dispatch(updateAvatar(avatar));
  }, [avatar]);
//hàm xử lí chọn image từ thiết bị
  const selectImage = async (isAvatar) => {
    let result;
    if (Platform.OS === 'web'&&isAvatar) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
    } else {
      if (isAvatar) {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });
      } else {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });
      }
    }

    console.log("Result:", result);
    if (result && result.assets && result.assets.length > 0 && result.assets[0].uri) {
      uploadImage(result.assets[0].uri);
      console.log("Uri",result.assets[0].uri);
    } else {
      console.log("Không có hình ảnh đươc chọn");
    }
  };

  const uploadImage = async (uri) => {
    try {
   // Lấy tên của file từ URI
    let filename = uri.split('/').pop();
      //upload ảnh lên azure
      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'image/jpeg',
        name:filename,
      });
      formData.append('name', filename);
     console.log("FormData",formData);
      const response = await axios.post('https://deploybackend-production.up.railway.app/azure/changeImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      //lưu vào redux để render ra màn hình
      dispatch(updateAvatar(response.data));
      //set lại avatar
      setAvatar(response.data);
      // Cập nhật dữ liệu người dùng chỉ với trường avt
      const updatedUserData = { ...userNewData, avt: response.data };
      //update dữ liệu về backend
    const updateUserResponse = await axios.post('https://deploybackend-production.up.railway.app/users/updateUser', updatedUserData);
    console.log('Dữ liệu trả về sau update', updateUserResponse.data);
    dispatch(save(updatedUserData))
    } catch (error) {
      console.error('Lỗi upload ảnh', error);
    }
  };
  //Hàm xử lí chọn ảnh khi nhấn vào ảnh đại diện
  const handleSelectOption = () => {
    if (Platform.OS === 'web') {
      selectImage(true); // Chọn ảnh từ thư viện trên web
    } else {
      Alert.alert(
        "Chọn ảnh",
        "Chọn tùy chọn ảnh",
        [
          {
            text: "Xem ảnh đại diện",
            onPress: () => console.log("Xem ảnh đại diện"),
          },
          {
            text: "Chụp ảnh mới",
            onPress: () => selectImage(false), // Chụp ảnh mới trên thiết bị di động
          },
          {
            text: "Chọn ảnh từ thư viện",
            onPress: () => selectImage(true), // Chọn ảnh từ thư viện trên thiết bị di động
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"#FFFFFF" }}>
      <View style={{ flex: 1.5/3 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.buttonAudio}>
      <ButtonWithAudio />
    </View>
        {coverImage && (
          <Image
            source={{ uri:coverImage }}
            style={styles.coverImage}
          />
        )}
        <View style={styles.userInfoContainer}>
          <TouchableOpacity onPress={handleSelectOption}>
            <View style={styles.avatarContainer}>
              {avatar && (
                <Image
                  source={{ uri: avatar }}
                  style={styles.avatar}
                />
              )}
              {!avatar && (
                <Text style={styles.selectAvatarText}>Chọn ảnh đại diện</Text>
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
      </View>
      <View  style={styles.headerScrollView}>
         <ScrollView horizontal style={styles.buttonScrollView}>
         <TouchableOpacity style={styles.button} onPress={() => {}}>
           <Fontisto name="applemusic" size={24} color="#2196f3" />
           <Text style={styles.buttonText}>Nhạc chờ</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={() => {}}>
           <FontAwesome5 name="file-import" size={24} color="#2196f3" />
           <Text style={styles.buttonText}>Nhập từ Facebook</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={() => {}}>
         <FontAwesome6 name="image" size={24} color="#2196f3" />
           <Text style={styles.buttonText}>Ảnh</Text>
         </TouchableOpacity>
       </ScrollView>
       </View>
       <View style={styles.centerScreen}>
       <Image
           source={profileImage }
                  style={styles.imageCenter}
                />
       </View>
       <View style={styles.centerScreen}>
        <Text  style={styles.centerText}>Hôm nay {name} có gì vui?</Text>
       </View>
       <View style={styles.footerScreen}>
       <TouchableOpacity style={styles.buttonNK}>
      <Text style={styles.buttonTextNK}>Đăng lên nhật kí</Text>
    </TouchableOpacity>
       </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: "60%",
    position: "absolute",
    zIndex: -1,
  },
  userInfoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  selectAvatarText: {
    marginTop: 10,
  },
  userName: {
    marginTop: 10,
    fontSize: 24,
  },
  bio: {
    marginTop: 10,
    fontSize: 18,
    color: '#CCCCCC'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    margin:10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  centerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonScrollView: {
    flexDirection: "row",
    // paddingHorizontal: 10,
  
  },
  headerScrollView:{
    flex:0.5/3
  },
  centerScreen:{
    flex:0.5/3,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop:50
  },
  imageCenter:{
    width: 200,
    height: 200,
  },
  buttonNK: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    width:'50%'
  },
  buttonTextNK: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "bold",
  },
  footerScreen:{
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonAudio:{
      justifyContent: 'center',
       alignItems: 'flex-start',
       marginLeft:30,
       marginTop:10
  }
});

export default EditProfile;
