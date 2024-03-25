import React, { useState,useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from 'axios'; 
import { useSelector, useDispatch } from 'react-redux';
import {save, updateAvatar } from "../../../Redux/slice";
import Icon from 'react-native-vector-icons/FontAwesome';
const EditProfile = ({navigation}) => {
  const coverImage= useSelector((state) => state.account.coverImage);
  const name = useSelector((state) => state.account.userName);
  const avt = useSelector((state) => state.account.avt);
  const bio = useSelector((state) => state.account.bio);
  const userNewData = useSelector((state) => state.account);
  const dispatch = useDispatch(); 
  const [avatar, setAvatar] = useState(avt); 
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1/3 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#000000" />
        </TouchableOpacity>

        {coverImage && (
          <Image
            source={{ uri: coverImage }}
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
});

export default EditProfile;
