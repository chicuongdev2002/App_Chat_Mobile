import { View, Text, Dimensions, Animated, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { TextInput } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons, Octicons } from '@expo/vector-icons';
import EmojiSelector, { Categories } from "react-native-emoji-selector";

const Chat = ({ navigation }) => {
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
                        <TouchableOpacity style={{width: 35}}
                        onPress={() => navigation.navigate('OptionChat')}
                        >
                        <Octicons name="list-unordered" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    }, [])
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
    const animate = useRef(new Animated.Value(height - 80 - 40)).current
    return (
        <View style={{ width: width, flex: 1, height: height - 30, justifyContent: 'space-between' }}>
            <Animated.View style={{ height: animate, backgroundColor: 'lightgray' }}>
                <Text>Chat</Text>
            </Animated.View>
            <View style={{ width: width, height: 80, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', width: width, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (extend) {
                                Animated.timing(animate, {
                                    toValue: height * 0.5 - 40,
                                    duration: 500,
                                }).start()
                                setExtend(false)
                                setColorEmoji('cyan')
                            } else {
                                Animated.timing(animate, {
                                    toValue: height - 80 - 40,
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
                    <View style={{ marginHorizontal: 10, width: width - 195 }}>
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
                    <View style={{ flexDirection: 'row', width: 120, justifyContent: 'space-between' }}>
                        <Entypo name="dots-three-horizontal" size={35} color="black" />
                        <SimpleLineIcons name="microphone" size={35} color="black" />
                        <SimpleLineIcons name="picture" size={35} color="black" />
                    </View>
                </View>
            </View>
            <View style={{ height: height * 0.5 - 40 }}>
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
            </View>
        </View>
    )
}

export default Chat