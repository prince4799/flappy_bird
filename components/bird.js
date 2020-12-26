import React from 'react'
import {Image,} from 'react-native'

export default function Bird({birdLeft,birdBottom}){
    const birdWidth=70
    const birdHeight=60
    let bird=birdBottom
    return(
        <Image source={require('../assets/flappy.png')}
        style={{
            height:birdHeight,
            width:birdWidth,
            borderBottomRightRadius:55,
            borderBottomLeftRadius:5,
            position:'absolute',
            bottom:bird,
            left:birdLeft-(birdWidth/2)
        }}/>
    );
}