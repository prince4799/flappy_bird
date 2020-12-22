import React from 'react'
import {View,Dimensions} from 'react-native'

export default function Obstacles({obstaclesWidth,obstaclesHeight,gap,color,random}){
    const Height=Dimensions.get("screen").height
    
    return(
        <View style={{flexDirection:'row'}}>
            {/* obstacle upside */}
        <View
        style={{
           height:obstaclesHeight-random,
           width:70,
           left:obstaclesWidth,
           backgroundColor:color,
           borderWidth:2,
           borderColor:'black',
           borderRadius:20,
           position:'absolute',
           top:0,
        
        }}
        />
        {/* //obstacle Down */}
        <View
        style={{
           height:obstaclesHeight-random,
           width:70,
           left:obstaclesWidth,
           backgroundColor:color,
           borderWidth:2,
           borderColor:'white',
           borderRadius:20,
           position:'absolute',
           top:Height-(obstaclesHeight-random),
           bottom:0
        }}
        />
        </View>
    );
}
// {obstaclesLeft,obstaclesBottom}