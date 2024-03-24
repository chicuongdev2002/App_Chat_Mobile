import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import store from "../../Redux/Redux";

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState([]);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [showError, setShowError] = useState(false); 

 // Đăng nhập
const handleLogin = () => {
  let found = false;
  account.forEach((a) => {
    if (a.phone == phoneNumber && a.password == password) {
      setId(a.id);
      fetchUserById(a.id);
      found = true; 
    }
  });
  if (!found) { 
    setError("Số điện thoại hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại");
    setShowError(true);
  } else { 
    setError("");
    setShowError(false);
  }
};


  // Gọi API để lấy thông tin user bằng id
  const fetchUserById = async (id) => {
    try {
      const res = await axios.get(`https://deploybackend-production.up.railway.app/users/getUserById?id=${id}`);
      if (res.data) {
        store.dispatch({ type: 'save', payload: res.data });
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Gọi API lấy account
  const fetchAccount = async () => {
    try {
      const res = await axios.get("https://deploybackend-production.up.railway.app/account/all");
      if (res.data) {
        setAccount(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setError("");
      setShowError(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#ffffff", paddingBottom: 17 }}>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#1fadea", paddingVertical: 17, paddingHorizontal: 14 }}>
          <Text style={{ color: "#fdf8f8", fontSize: 20, flex: 1 }}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: "#d9d9d9", paddingVertical: 7, paddingHorizontal: 14, marginBottom: 32 }}>
          <Text style={{ color: "#000000", fontSize: 20 }}>Vui lòng nhập số điện thoại và mật khẩu đăng nhập</Text>
        </View>
        {showError && ( 
          <Text style={{ color: "red", fontSize: 16, marginHorizontal: 15 }}>{error}</Text>
        )}
        <TextInput
          style={{ height: 40, marginBottom: 16, marginHorizontal: 15, color: "#635b5b", fontSize: 20 }}
          placeholder="Số điện thoại"
          placeholderTextColor="#635b5b"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType="numeric"
        />
        <View style={{ height: 1, backgroundColor: "#06c3ff", marginBottom: 16, marginHorizontal: 15 }}></View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22, marginHorizontal: 15 }}>
          <TextInput
            style={{ flex: 1, height: 40, color: "#635b5b", fontSize: 20 }}
            placeholder="Mật khẩu"
            placeholderTextColor="#635b5b"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={handleTogglePasswordVisibility}>
            <Text style={{ color: "#635b5b", fontSize: 12 }}>{showPassword ? "ẨN" : "HIỆN"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1, backgroundColor: "#000000", marginBottom: 20, marginHorizontal: 15 }}></View>
        <Text style={{ color: "#2752eb", fontSize: 20, marginBottom: 49, marginLeft: 15, textDecorationLine: "underline", textDecorationColor: "#2752eb" }} onPress={handleForgotPassword}>Lấy lại mật khẩu</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
            <Text style={styles.buttonTextLogin}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRegis} onPress={handleRegister}>
            <Text style={styles.buttonTextRegis}>Đăng kí</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "#635b5b", fontSize: 12, marginLeft: 126, marginBottom: 50 }}>Các câu hỏi thường gặp</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  buttonLogin: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1faeeb",
    borderRadius: 20,
    paddingVertical: 13,
    marginBottom: 20,
    marginRight: 5,
  },
  buttonRegis: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    paddingVertical: 13,
    marginBottom: 20,
    marginRight: 5,
  },
  buttonTextLogin: {
    color: "#ffffff",
    fontSize: 20,
  },
  buttonTextRegis: {
    color: "#000000",
    fontSize: 20,
  },
});

export default Login;
