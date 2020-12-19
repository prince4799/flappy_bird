import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableWithoutFeedback,Modal,Alert,TouchableHighlight } from 'react-native';
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
  const obstaclesHeight = 200
  const gap = 150
  const [score ,setScore]=useState(0)
  const [isGameOver,setGameOver]=useState(false)
  // const 


  useEffect(() => {
    if (birdBottom >0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom-gravity)
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
      setScore(score+1)
    }
},[obstaclesWidth])

//jumping  Functions

const jump=()=>{ 
  if(!isGameOver&&(birdBottom<screenHeight))
  {
    setBirdBottom(birdBottom=> birdBottom+50)
  }
}

useEffect(() => {
  if (obstaclesWidth2>-50)
  {
    gameTimerId3=setInterval(()=>{ 
      setObstaclesWidth2(obstaclesWidth2=>obstaclesWidth2-20)
    },105)
    return()=>{ clearInterval(gameTimerId3)}
  }
  else{
    setObstaclesWidth2(screenWidth/2+screenWidth+60)
    setRandomBottom2(Math.random()*150)
    setScore(score+1)
  }
},[obstaclesWidth2])


//check for collosion

useEffect(() => {
 if (
   ((birdBottom<=obstaclesHeight+randomBottom+gap)&&(obstaclesWidth==birdLeft||obstaclesWidth==birdLeft+70)||
 (birdBottom>=(screenHeight-(obstaclesHeight+randomBottom)))&&(obstaclesWidth==birdLeft || obstaclesWidth==birdLeft-70))||

 ((birdBottom<=obstaclesHeight+randomBottom2+gap)&&(obstaclesWidth2==birdLeft||obstaclesWidth2==birdLeft+70)||
 (birdBottom>=(screenHeight-(obstaclesHeight+randomBottom2)))&&(obstaclesWidth2==birdLeft || obstaclesWidth2==birdLeft-70)))
{
  gameOver()
}
})

const gameOver=() => {
  setGameOver(!isGameOver)
  clearInterval(gameTimerId)
  clearInterval(gameTimerId2)
  clearInterval(gameTimerId3)
  console.log(score)
}
  return (
    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>
      <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft} />
        <Modal
        animationType="slide"
        transparent={true}
        visible={isGameOver}
        onRequestClose={() => {
          Alert.alert("Thank you!!");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{score}</Text>
          </View>
        </View>
      </Modal>
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
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5
  },
});
