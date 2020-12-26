
import React, { useEffect, useState,useFocusEffect } from 'react';
import { 
  StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    BackHandler,
    Alert
   } from 'react-native';
import Bird from './bird'
import Obstacles from './obstacles'
import { LinearGradient } from 'expo-linear-gradient';




 

 export default function HomeScreen({navigation}) {
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
  const [obstaclesRightSpace,setObstaclesWidth] =useState(screenWidth) 
  const [obstaclesRightSpace2,setObstaclesWidth2] =useState(screenWidth/2+screenWidth+80) 
  const obstaclesHeight =280
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

  //===========================================

  
  
  useEffect(() => {
    const backAction = () => {
      Alert.alert("EXIT","Want to exit the Game?",[
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

const backHandler = BackHandler.addEventListener("hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
  

  //===========================================

  useEffect(() => {
    if (obstaclesRightSpace>-50)
    {
      gameTimerId2=setInterval(()=>{ 
        setObstaclesWidth(obstaclesRightSpace=>obstaclesRightSpace-20)
      },105)
      return()=>{ clearInterval(gameTimerId2)}
    }
    else{
      setObstaclesWidth(screenWidth/2+screenWidth+60)
      setRandomBottom(Math.random()*100)
      setScore(score+1)
    }
},[obstaclesRightSpace])

//jumping  Functions

const jump=()=>{ 
  if(!isGameOver&&(birdBottom<screenHeight))
  {
    setBirdBottom(birdBottom=> birdBottom+50)
  }
}

const restart=()=>{
setGameOver(false)
setScore(0)
navigation.push('Home')
}

useEffect(() => {
  if (obstaclesRightSpace2>-50)
  {
    gameTimerId3=setInterval(()=>{ 
      setObstaclesWidth2(obstaclesRightSpace2=>obstaclesRightSpace2-20)
    },105)
    return()=>{ clearInterval(gameTimerId3)}
  }
  else{
    setObstaclesWidth2(screenWidth/2+screenWidth+80)
    setRandomBottom2(Math.random()*100)
    setScore(score+1)
    // setScore(0)
  }
},[obstaclesRightSpace2])


//check for collosion

useEffect(() => {
if(
 ( 
   (birdBottom<=(obstaclesHeight-randomBottom)||
   birdBottom+50>=(screenHeight-(obstaclesHeight-randomBottom)))&&
   (birdLeft>=obstaclesRightSpace&&birdLeft<=obstaclesRightSpace+70)
 )
  ||
  (
    (birdBottom<=(obstaclesHeight-randomBottom2)||
    birdBottom+50>=(screenHeight-(obstaclesHeight-randomBottom2)))&&
    (birdLeft>=obstaclesRightSpace2&&birdLeft<=obstaclesRightSpace2+70)
  )
)
{
  // setGameOver(false)
  setGameOver(true)
  clearInterval(gameTimerId)
  clearInterval(gameTimerId2)
  clearInterval(gameTimerId3)
  setScore(score)
  console.log("gameOver bet`end of game... reload")
}  
})


  return (
    <TouchableWithoutFeedback onPress={jump}>
    <LinearGradient
    colors={['#f55d51','#f09a3e']} style={styles.container}>
      <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft} />
       
      <Obstacles
        obstaclesRightSpace={obstaclesRightSpace}
        color={'green'}
        obstaclesHeight={obstaclesHeight}
        random={randomBottom}
         />
      <Obstacles
        obstaclesRightSpace={obstaclesRightSpace2}
        color={'green'}
        random={randomBottom2}
        obstaclesHeight={obstaclesHeight}
         />
       {isGameOver&& <View style={styles.centeredView}>
             {score>10? <Image source={require('../assets/happy.png')}
              style={styles.scoreImage} />:
              <Image source={require('../assets/angry.png')}
              style={styles.scoreImage2} />}
            <Text style={styles.score}>{score}</Text>
            <TouchableOpacity style={styles.button} onPress={restart} >
            <Image source={require('../assets/refresh.png')}
              style={styles.buttonImage} />
              </TouchableOpacity>
        </View>
}
    </LinearGradient>
    </TouchableWithoutFeedback>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    backgroundColor: "#8290e0",
    alignSelf:'center',
    height:200,
    width:200,
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
  scoreImage:
  {
    height:100,
    width: 100,
    alignSelf:'center',
    resizeMode:'cover',
},
scoreImage2:
{
  height:100,
  width: 150,
  left:10,
  // alignSelf:'center',
  resizeMode:'cover',
},
button:
{
  
  alignSelf:'center',
},
buttonImage:
{
  height:40,
  width:40,
  // left:10,
  alignSelf:'center',
}
});
