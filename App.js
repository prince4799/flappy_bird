import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
    Text,
    SafeAreaView,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image
   } from 'react-native';
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
  const obstaclesHeight =250
  const gap = 150
  const [score ,setScore]=useState(0)
  const [isGameOver,setGameOver]=useState(false)

  
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
      setRandomBottom(Math.random()*100)
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
if((birdBottom<=(obstaclesHeight-randomBottom)||birdBottom<=(obstaclesHeight-randomBottom2)
 ||birdBottom>=(screenHeight-(obstaclesHeight-randomBottom))||birdBottom>=(screenHeight-(obstaclesHeight-randomBottom2)))&&
 ((birdLeft>=obstaclesWidth||birdLeft>=obstaclesWidth2-70)
 &&(birdLeft<=obstaclesWidth||birdLeft<=obstaclesWidth2-70))
 )

{
  gameOver()
}  

})
const gameOver=() => {
  console.log(score)
  // setGameOver(false)
  
  
  setGameOver(true)
  clearInterval(gameTimerId)
  clearInterval(gameTimerId2)
  clearInterval(gameTimerId3)
  console.log("gameOver bet`end of game... reload")
}
  return (
    <TouchableWithoutFeedback onPress={jump}>
    <SafeAreaView style={styles.container}>
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
        color={'red'}
        random={randomBottom2}
        obstaclesHeight={obstaclesHeight}
        gap={gap} />
       {isGameOver&& <View style={styles.centeredView}>
            <Text style={styles.score}>Your Score</Text>
            <Text style={styles.score}>{score}</Text>
            <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText}>Try again</Text>
              <Image
              source={{uri:'https://www.tbray.org/ongoing/When/201x/2017/09/27/refresh.png'}}
              style={styles.buttonImage}/>
              </TouchableOpacity>
        </View>
}
    </SafeAreaView>
    </TouchableWithoutFeedback>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  centeredView: {
    backgroundColor: "grey",
    alignSelf:'center',
    height:180,
    width:250,
    elevation:10,
    top:280,
    borderWidth:2,
    borderColor:'white',
    borderRadius:20,
    justifyContent:'center'
  },
  score:{
    fontSize:32,
    alignSelf:'center',
  },
  buttonText:
  {
    // backgroundColor:"red"

},
button:
{
  height:60,
  width:70,
  alignSelf:'center',
  borderWidth:2.5,
  backgroundColor:'#fff',
  borderRadius:10

},
buttonImage:
{
  height:25,
  width:25,
  alignSelf:'center',
}
});
