import React from 'react'
import {View,} from 'react-native'

export default function Obstacles({obstaclesWidth,obstaclesHeight,gap,color,random}){
    
    
    return(
        <View style={{flexDirection:'row'}}>
            {/* obstacle upside */}
        <View
        style={{
           height:obstaclesHeight+random,
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
           height:obstaclesHeight+random+gap,
           width:70,
           left:obstaclesWidth,
           backgroundColor:color,
           borderWidth:2,
           borderColor:'white',
           borderRadius:20,
           top:obstaclesHeight+gap+random,
           position:'absolute',
        //    justifyContent:'flex-end',
        }}
        />
        </View>
    );
}
// {obstaclesLeft,obstaclesBottom}