import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';

const User = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      } else {
        console.log('Permission denied');
      }
    };

    getContacts();
  }, []);

  const handleAddFriend = (phoneNumber) => {
    // Viết logic để thêm bạn bè ở đây
    console.log(`Add friend with phone number: ${phoneNumber}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text>{item.name}</Text>
        <Text>{item.phoneNumbers ? item.phoneNumbers[0].number : 'N/A'}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddFriend(item.phoneNumbers[0].number)}
      >
        <Text style={styles.addButtonText}>Kết bạn</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  contactInfo: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#006AF5', 
    padding: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default User;
