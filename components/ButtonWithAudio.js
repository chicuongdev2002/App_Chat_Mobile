import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
const ButtonWithAudio = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/CTC.mp3')
      );
      setSound(sound);
    };

    loadSound();

    // Cleanup function để dừng phát âm thanh khi component bị hủy
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Dừng âm thanh khi màn hình mất focus
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound && isPlaying) {
          sound.pauseAsync();
          setIsPlaying(false);
        }
      };
    }, [sound, isPlaying])
  );

  return (
    <>
       <TouchableOpacity onPress={playSound}>
        <Animatable.View 
          style={styles.iconContainer}
          animation={isPlaying ? "pulse" : null} 
          iterationCount={isPlaying ? "infinite" : 1} 
        >
          <FontAwesome 
            name={isPlaying ? "stop" : "play"} 
            size={10} 
            color="black" 
          />
        </Animatable.View>
      </TouchableOpacity>
    </>
    
  );};
  const styles = StyleSheet.create({
    iconContainer: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 50,
      padding: 10,
    },
  });


export default ButtonWithAudio;
