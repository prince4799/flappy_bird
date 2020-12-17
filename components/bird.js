import React from 'react'
import {View,} from 'react-native'

export default function Bird({birdLeft,birdBottom}){
    const birdWidth=60
    const birdHeight=50
    let bird=birdBottom
    return(
        <View
        style={{
            height:birdHeight,
            width:birdWidth,
            borderBottomRightRadius:55,
            borderBottomLeftRadius:5,
            borderTopRightRadius:35,
            borderTopLeftRadius:75,
            backgroundColor:"yellow",
            borderWidth:1,
            borderColor:'black',
            position:'absolute',
            bottom:bird,
            left:birdLeft-(birdWidth/2)
        }}
        >
            <View
            style={{
                borderWidth:1,
                borderColor:'black',
                top:25,
                width:30,
                left:10,
            }}/>
            <View
            style={{
                height:25,
                width:25,
                borderRadius:25,
                backgroundColor:'red',
                left:40,
                bottom:5,
            }}/>
        </View>
            
    );
}