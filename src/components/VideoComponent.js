import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  Button,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import PercentageCircle from 'react-native-circle-percentage';
// https://youtu.be/6-r9PVI94hE?list=RDB8G3zCnZvMU
// https://youtu.be/6-r9PVI94hE
VideoComponent = ({openModal, urlId}) => {
  const [playing, setPlaying] = useState(true);
  const [isMute, setMute] = useState(false);
  const [url, setUrl] = useState(urlId);
  const [isMinimize, setMinimize] = useState(openModal);
  const [playing2, setPlaying2] = useState(false);

  const [time, setTime] = useState(1);

  const controlRef = useRef();
  const controlRef2 = useRef();

  useEffect(() => {
    setUrl(urlId);
    setMinimize(openModal);
    console.log(urlId);
  }, [openModal, urlId]);

  const onStateChange = state => {
    console.log('state', state);
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
    if (state !== 'playing') {
      setPlaying(false);
    }
  };

  const onStateChange2 = state => {
    console.log('state2', state);
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
    if (state !== 'playing') {
      setPlaying(false);
    }
  };

  const togglePlaying = () => {
    setPlaying(prev => !prev);
  };

  const togglePlaying2 = () => {
    setPlaying2(prev => !prev);
  };

  const seekBackAndForth = control => {
    console.log('currentTime');

    controlRef.current?.getCurrentTime().then(currentTime => {
      control === 'forward'
        ? controlRef.current?.seekTo(currentTime + 15, true)
        : controlRef.current?.seekTo(currentTime - 15, true);
    });
  };

  const Percentage = async () => {
    console.log(controlRef2);
    const duration = await controlRef2.current
      ?.getDuration()
      .then(getDuration => {
        return getDuration;
      });

    const currentTime = await controlRef2.current
      ?.getCurrentTime()
      .then(currentTime => {
        return currentTime;
      });
    var percentage = (currentTime * 100) / duration;
    setTime(percentage);
    console.log(currentTime, duration, percentage, playing2);
  };

  useMemo(async () => {
    console.log(controlRef2);
    const duration = await controlRef2.current
      ?.getDuration()
      .then(getDuration => {
        return getDuration;
      });

    const currentTime = await controlRef2.current
      ?.getCurrentTime()
      .then(currentTime => {
        return currentTime;
      });
    var percentage = (currentTime * 100) / duration;
    setTime(percentage);
    console.log(currentTime, duration, percentage, playing2);
  }, [time, playing2]);

  //   useMemo(async () => {

  //   }, [time]);

  const PlayPercentage = async () => {};
  const muteVideo = () => setMute(!isMute);
  const ControlIcon = ({name, onPress}) => (
    <Icon onPress={onPress} name={name} size={40} color="#fff" />
  );
  return (
    <>
      <View
        style={{
          width: 70,
          height: 70,
          backgroundColor: '#f00',
          position: 'absolute',
          bottom: 50,
          right: 20,
          borderRadius: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <AnimatedCircularProgress
          size={70}
          width={3}
          fill={time}
          tintColor="#00e0ff"
          backgroundColor="#3d5875">
          {fill => (
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="play" size={40} color="#fff" />
            </View>
          )}
        </AnimatedCircularProgress> */}
        <PercentageCircle radius={35} percent={time} color={'#3498db'}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              onPress={togglePlaying2}
              name={playing2 ? 'pause' : 'play'}
              size={40}
              color="#000"
            />
          </View>
        </PercentageCircle>
        {/* <Text>{time}</Text> */}
      </View>
      <View
        style={{
          height: 80,
          width: '100%',
          backgroundColor: '#f00',
          opacity: 0,
        }}>
        <YoutubePlayer
          height={80}
          ref={controlRef2}
          play={playing2}
          //   mute={true}
          videoId={url}
          width={80}
          //   onChangeState={onStateChange2}
        />
      </View>
      <Modal
        isVisible={isMinimize}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={styles.content2}>
          <View
            style={{
              width: '100%',
              //   height: 70,
              backgroundColor: '#272a2e',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              padding: 20,
            }}>
            <View
              style={{
                width: '100%',

                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // padding: 10,
              }}>
              <Icon
                onPress={() => {
                  setMinimize(false);
                }}
                name="times"
                size={40}
                color="#fff"
              />
              <Icon
                onPress={() => {
                  controlRef.current?.getCurrentTime().then(currentTime => {
                    console.log(controlRef.current);
                    controlRef2.current?.seekTo(currentTime, true);
                    Percentage();
                    setMinimize(false);
                    setPlaying2(true);
                  });
                }}
                name="minus"
                size={40}
                color="#fff"
              />
            </View>
          </View>
          <YoutubePlayer
            height={200}
            ref={controlRef}
            play={playing}
            mute={isMute}
            videoId={url}
            forceAndroidAutoplay={true}
            onChangeState={onStateChange}
          />

          <View
            style={{
              width: '100%',
              //   height: 70,
              backgroundColor: '#272a2e',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 10,
            }}>
            <View style={styles.controlContainer}>
              <ControlIcon
                onPress={() => seekBackAndForth('rewind')}
                name="backward"
              />
              <ControlIcon
                onPress={togglePlaying}
                name={playing ? 'pause' : 'play'}
              />
              <ControlIcon
                onPress={() => seekBackAndForth('forward')}
                name="forward"
              />
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <ControlIcon
                onPress={muteVideo}
                name={isMute ? 'volume-off' : 'volume-up'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'darkblue',
    position: 'absolute',
  },
  content2: {
    backgroundColor: '#fff',
    // height: 500,
    borderRadius: 10,
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default VideoComponent;
