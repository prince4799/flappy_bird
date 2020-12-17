import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Bird from './components/bird'
import Obstacles from './components/obstacles'



export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)
  const [randomBottom,setRandomBottom]=useState(0)
  const [randomBottom2,setRandomBottom2]=useState(0)
  let gameTimerId
  let gameTimerId2
  let gameTimerId3
  const gravity = 15
  const [obstaclesWidth,setObstaclesWidth] =useState(screenWidth) 
  const [obstaclesWidth2,setObstaclesWidth2] =useState(screenWidth/2+screenWidth+60) 
  const obstaclesHeight = 225
  const gap = 250


  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
        console.log(Math.floor(birdBottom)+"  birdBottom")
      }, 120)
      return () => { clearInterval(gameTimerId) }
    }
    else
    setBirdBottom(screenHeight/2)
  }, [birdBottom])

  useEffect(() => {
    if (obstaclesWidth>-50)
    {
      gameTimerId2=setInterval(()=>{ 
        setObstaclesWidth(obstaclesWidth=>obstaclesWidth-20)
      },105)
      return()=>{ clearInterval(gameTimerId2)}
    }
    else{
      setObstaclesWidth(screenWidth/2+screenWidth+60)
      setRandomBottom(Math.random()*150)
    }
},[obstaclesWidth])


useEffect(() => {
  if (obstaclesWidth2>-50)
  {
    gameTimerId3=setInterval(()=>{ 
      setObstaclesWidth2(obstaclesWidth2=>obstaclesWidth2-20)
    },105)
    console.log(obstaclesWidth2+" obstacleWidth2")
    return()=>{ clearInterval(gameTimerId3)}
  }
  else{
    setObstaclesWidth2(screenWidth/2+screenWidth+60)
    setRandomBottom2(Math.random()*150)
  }
},[obstaclesWidth2])


//check for collosion

useEffect(() => {
 if ((birdBottom<obstaclesHeight+2*randomBottom2+gap+150)&&(obstaclesWidth2==screenWidth/2+10)||
 (birdBottom>obstaclesHeight+randomBottom)&&(obstaclesWidth==screenWidth/2+10))
{
  console.log(`gameOver`)
  clearInterval(gameTimerId)
  clearInterval(gameTimerId2)
  clearInterval(gameTimerId3)
}
})


  return (
    <View style={styles.container}>
      <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft} />
      <Obstacles
        obstaclesWidth={obstaclesWidth}
        color={'red'}
        obstaclesHeight={obstaclesHeight}
        random={randomBottom}
        gap={gap} />
      <Obstacles
        obstaclesWidth={obstaclesWidth2}
        color={'coral'}
        random={randomBottom2}
        obstaclesHeight={obstaclesHeight}
        gap={gap} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
});
