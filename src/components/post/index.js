import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Text, Button, TouchableOpacity,Platform } from "react-native";
import Video from "react-native-video";
import styles from "./styles";



const SinglePost = forwardRef((props, parentRef) => {
    const ref = useRef(null);
    const [paused, setPaused] = useState(false)
    useImperativeHandle(parentRef, () => ({
        play,
        stop,
        unload
    }))
    const onBuffer = () => { }
    const videoError = () => { }
    useEffect(() => {
        // console.log("props:..............",props)
    }, [])
    const play = async () => {
        console.log("From play")
        // console.log('FROM FEDDDDDDDDDDDDD',ref.current)
        ref.current.paly()
        // if(ref.current == null){
        //     return null
        // }
        // let status = await ref.current.getStatusAsync()
        // if(status?.isPlaying) return
        // try{
        //     await ref.current.playAsync();
        // }catch(e) {
        //     console.log(e)
        // } 
    }
    const stop = async () => {
        console.log("From stop")

        ref.current.pause()
        // if(ref.current == null){
        //     return null
        // }
        // let status = await ref.current.getStatusAsync()
        // if(!status?.isPlaying) return
        // try{
        //     await ref.current.stopAsync();
        // }catch(e) {
        //     console.log(e)
        // } 
    }
    const unload = async () => {
        console.log("From unload")

        if (ref.current == null) {
            return null
        }

        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
        {/* <TouchableOpacity onPress={console.log(props.item)}> */}
            <Video
                source={{  uri: Platform.OS == 'ios' ? props.item.videos[0].hlsfmp4 : props.item.videos[0].hlsfmp4}}
                poster={props.item.videos[0].thumbnail}
                style={styles.container}
                resizeMode={'cover'}
                repeat={true}
                rate={1.0}
                volume={1}
                posterResizeMode='cover'
                playInBackground={true}
                playWhenInactive={false}
                initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
                onError={(e)=> console.log(e)}
                // onBuffer={onBuffer}
                // onError={videoError}
                ref={ref}
                paused={props.item._id === props.selected ? false : true}

            />
        {/* </TouchableOpacity> */}
        </>
    )
})

export default SinglePost