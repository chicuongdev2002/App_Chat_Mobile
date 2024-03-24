import { View, Text, Dimensions, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { TextInput } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons, Octicons, MaterialIcons } from '@expo/vector-icons';
import EmojiSelector, { Categories } from "react-native-emoji-selector";
// import WebSocket from 'react-native-websocket';
// import io from 'socket.io-client';
// import { on } from 'hammerjs';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { func } from 'prop-types';

import ChatRegion from './ChatRegion';
import { render } from 'react-dom';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([])
    var stompClient = useRef(null);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <View style={{
                        width: 160,
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        justifyContent: 'space-between',
                    }}>
                        <Octicons name="device-camera-video" size={35} color="white" />
                        <Octicons name="search" size={35} color="white" />
                        <TouchableOpacity style={{ width: 35 }}
                            onPress={() => navigation.navigate('OptionChat')}
                        >
                            <Octicons name="list-unordered" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                )
            }
        })

        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])

        const socket = new SockJS('http://localhost:8080/ws');
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, onConnected, onError); 
    }, [])


    function onConnected() {
        stompClient.current.subscribe('/topic/public', onMessageReceived)
        stompClient.current.send('/app/chat.addUser', {},
            JSON.stringify({ sender: 'son'}))
    }

    function onMessageReceived(payload) {
        const message = JSON.parse(payload.body)
        console.log(message);
        // if(message.content){
        //     const newMessage = {
        //         _id: message.id, // Generate unique ID for the message
        //         text: mess.trim(),
        //         createdAt: message.sendDate,
        //         user: {
        //             _id: 1,
        //         },
        //     };
        //     sendMessage()
        //     setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
        // }
        
    }

    function onError(error) {
        console.log('Could not connect to WebSocket server. Please refresh and try again!')
    }

    function sendMessage() {
        var messageContent = 'haha';
        if(messageContent && stompClient.current) {
            console.log("OK");
            var chatMessage = {
                sender: 'Phong',
                content: messageContent,
                isSeen: false,
                receiver: 'Toan',
                sendDate: new Date()
            };
            stompClient.current.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        }
    }

    var [position, setPosition] = useState({ start: 0, end: 0 })
    const textInputRef = useRef(null);
    const handleFocusText = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }
    var [extend, setExtend] = useState(true)
    var [mess, setMess] = useState('')
    var [colorEmoji, setColorEmoji] = useState('black')
    let { width, height } = Dimensions.get('window')
    const animate = useRef(new Animated.Value(height - 60)).current

    const onSend = () => {
        if (mess.trim() === '') return; // Prevent sending empty message
        const newMessage = {
            _id: Math.random().toString(), // Generate unique ID for the message
            text: mess.trim(),
            createdAt: new Date(),
            user: {
                _id: 1,
            },
        };
        sendMessage()
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
        setMess(''); // Clear the TextInput value after sending
    };

    return (
        <View style={{ width: width, flex: 1, height: height, justifyContent: 'space-between' }}>
            <Animated.View style={{ height: animate, backgroundColor: 'lightgray', marginBottom: 25 }}>
                <GiftedChat
                    renderInputToolbar={(props) =>
                        <View style={{ flexDirection: 'row', width: width, backgroundColor: 'white', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, width: width - 45, height: 80, justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (extend) {
                                            Animated.timing(animate, {
                                                toValue: height * 0.5,
                                                duration: 500,
                                            }).start()
                                            setExtend(false)
                                            setColorEmoji('cyan')
                                        } else {
                                            Animated.timing(animate, {
                                                toValue: height - 60,
                                                duration: 500,
                                            }).start()
                                            setExtend(true)
                                            setColorEmoji('black')
                                        }
                                        handleFocusText()
                                    }}
                                >
                                    <Entypo name="emoji-happy" size={35} color={colorEmoji} />
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 10, width: width - 200 }}>
                                    <TextInput placeholder="Tin nhắn" style={{ backgroundColor: 'white', fontSize: 20, width: '100%' }}
                                        value={mess}
                                        onChangeText={text => {
                                            setMess(text)
                                            // setPosition(textInputRef.current.selection)
                                        }}
                                        selection={position}
                                        ref={textInputRef}
                                        onSelectionChange={event => setPosition(event.nativeEvent.selection)
                                        }
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', width: 85, justifyContent: 'space-between' }}>
                                    <Entypo name="dots-three-horizontal" size={35} color="black" />
                                    <SimpleLineIcons name="picture" size={35} color="black" />
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={props.onSend}
                                style={{ width: 45, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}
                            >
                                <MaterialIcons name="send" size={35} color="cyan" />
                            </TouchableOpacity>
                        </View>
                    }
                    messages={messages}
                    onSend={messages => onSend()}
                    user={{
                        _id: 1,
                    }}
                />
            </Animated.View>

            {/* <View style={{ height: height * 0.5 }}>
                <EmojiSelector
                    style={{ width: width }}
                    category={Categories.symbols}
                    onEmojiSelected={
                        emoji => {
                            if (mess !== '')
                                // console.log(mess.substring(position.end))
                                setMess(mess.substring(0, position.start) + emoji + mess.substring(position.end))
                            else
                                setMess(emoji)
                            // setPosition({start: position.start + 1, end: position.end + 1})
                            handleFocusText()
                        }
                    }
                />
            </View> */}
        </View>
    )
}

export default Chat