import { StyleSheet, Text, TouchableOpacity, View,FlatList, ScrollView,ToastAndroid } from 'react-native'
import React from 'react';
import { Button,TextInput } from 'react-native-paper';
import { useState,useEffect } from 'react';
import { WordProps } from '../Utilis/types';
// import { useTheme } from '../Context/ThemeProvider';
import axios from 'axios';
  


const Home : React.FC= ({navigation}:any) => {

    const [randomWord,setRandomWord] = useState<WordProps>();
     const[showState,setShowState] =useState<any>(true)

    //   const { theme, isLoadingTheme, updateTheme } = useTheme();

     
   

   const GetRandomWord = async () => {
    await axios
      .get(`https://random-words-api.vercel.app/word`)
      .then((response) => {
      
        setRandomWord(response.data[0]);
        console.warn(response.data[0])
        
      })
      .catch((err) => setError(err.response.data.message));

      
  };
  useEffect(() => {
    GetRandomWord();
  }, []);


  console.warn("randomword",GetRandomWord)
  
 


//  const changeTheme = () => updateTheme(theme.themeMode);

//   if (isLoadingTheme) return null;








    const[newWord,setNewWord]= useState('')
    const [wordDetails,setWordDetails]= useState<any>([])
    const[definition,setDefinition]=useState<any>([])
    const [error, setError] = useState(false)
    const wordAPI = axios.create({
        baseURL: "http://api.dictionaryapi.dev/"
    }) 
    const getNewWordApi = () =>{
        wordAPI.get(`api/v2/entries/en/${newWord}`)
        
        .then((response: any) => { const {word} = response.data;
       
        // console.warn(response.data[0].word)
       console.warn(response.data[0].meanings)
        
            setWordDetails(response.data)})
            
        
        .catch((error: any) => setError(true))
        setShowState(false)
    }
   // useEffect(() => getNewWordApi(), [])


    const handleSubmit = async () => {
        navigation.navigate("Back", { wordDetails });
        setDefinition({ word: "" });
      };
   console.warn("abc",setDefinition)
//  console.warn("newword",newWord)
// console.warn("worddetails",wordDetails)
//  console.warn("definition",definition)
 // console.warn("worddetails",wordDetails.meanings[0]?.definitions)
//   console.warn("worddetails",wordDetails?.meanings)








  return (

      <>
     <View style ={styles.container}>
    
    {/* <Button
    mode='contained'
    style = {styles.themeButton}
   >ChangeTheme</Button>
    */}
    
    {/* <TouchableOpacity onPress={changeTheme} style={styles.themeButton}>
        <Text style={styles.text}>Switch Theme</Text>
      </TouchableOpacity> */}


      {/* <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      > */}
          <View style={styles.design}>
           <TextInput
            style={styles.input}
            mode='outlined'
            placeholder='"Enter keyword...' 
            onChangeText={setNewWord}/>
            
            <Button 
            mode='contained'
            style = {styles.button}
            uppercase = {false}
            disabled = {!newWord}
            onPress ={getNewWordApi}
             >
            Search</Button> 
            </View>
            {error &&
            ToastAndroid.show("please enter a meaningful word", ToastAndroid.SHORT)
            // Alert.alert("Incorrect Word",'please enter a meaningful word')
            // <Text style={styles.wordText}>Please enter a meaningword</Text>
            }
    {showState && <View style={styles.randomList}>
                
    
    <Text style={styles.randomText}>Word of the day!{'\n'}{randomWord?.word}</Text>
    <Text style={styles.randomproText}>Pronunciation:{randomWord?.pronunciation}</Text>
    <Text style={styles.randomdefText}>definition:{randomWord?.definition}</Text>
    

   </View>}
                
            

            <View> 
                <FlatList
                    data={wordDetails}
                    renderItem={(item:any) => {
                        
                        return (
                            <View style ={styles.listView}>
                                <View>
                                <TouchableOpacity
                                onPress={handleSubmit}>
                                <Text style ={styles.wordText}> Word : {item?.item?.word}</Text>
                                <Text style ={styles.defText}> Definition : {item?.item?.meanings[0]?.definitions[0].definition}</Text>
                                </TouchableOpacity>
                                </View>
                                
                               
                            </View>
                        )
                       
                    }}  keyExtractor={(item : any) => Math.random().toString(16).slice(2)}
                   
                    
                />
                
            </View>
           
        </View>   
       
        </>
       )
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
     design:{
        flexDirection : "row",
        justifyContent : "space-evenly",
        alignItems : "flex-start",
     },
    listView:{
        
    padding: 20,
    borderRadius: 1,
    borderStartColor:"#171717",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation:3,
    marginTop:2,
    margin:"2%",
    },

    input :{
        height : 40,
        width : "70%",
        marginTop : 40,
        flexDirection : "row",
        
    },
    button : {
      
        // backgroundColor :'#6d94ed',
        width : 100,
        borderRadius : 15,
        height : 40,
        marginTop : 45,
        flexDirection:"row",
        justifyContent : "center",
        alignContent:'center'
    },
    themeButton:{
        width : 200,
        borderRadius : 15,
        height : 40,
        marginTop : 45,
        flexDirection:"row",
        justifyContent : "center",
        alignContent:'center'
    },
    text: {
        fontSize: 25,
        margin: 10,
      },
    
    wordText:{
        fontSize: 30,
        fontWeight:"bold",
        color:"black"
    },
    defText :{
        fontSize: 20,
        fontStyle:"italic",
        padding :3
    },
    randomText:{
        fontSize: 30,
        fontWeight:"bold",
        color:"black"
    },
    randomproText:{
        fontSize: 25,
        fontStyle:"italic",
        padding :3
    },
    randomdefText:{
        fontSize: 25,
        fontStyle:"italic",
        // padding :3
    },
    randomList:{
       
         padding: 8,
        // borderRadius: 1,
        // borderStartColor:"#171717",
        // shadowColor: '#171717',
        // shadowOffset: {width: -2, height: 4},
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        // elevation:3,
        //  marginTop:8,
         margin:"4%",
        alignItems:"center"
      
    }
});
export default  Home;
  