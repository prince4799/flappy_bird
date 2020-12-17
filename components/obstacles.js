import React from 'react'
import {View,} from 'react-native'

export default function Obstacles({obstaclesWidth,obstaclesHeight,gap,color,random}){
    
    
    return(
        <View style={{flexDirection:'row'}}>
            {/* obstacle upside */}
        <View
        style={{
           height:obstaclesHeight+random-70,
           width:70,
           left:obstaclesWidth,
           backgroundColor:color,
           borderWidth:2,
           borderColor:'black',
           borderRadius:20,
           position:'absolute'
        }}
        />
        {/* //obstacle Down */}
        <View
        style={{
           height:obstaclesHeight+random,
           width:70,
           left:obstaclesWidth,
           backgroundColor:color,
           borderWidth:2,
           borderColor:'black',
           borderRadius:20,
           top:random+150+gap,
           position:'absolute',
           bottom:0,
        }}
        />
        </View>
    );
}
// {obstaclesLeft,obstaclesBottom}