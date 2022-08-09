import { View, Text, StyleSheet, TouchableOpacity,FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
 import SoundPlayer from "react-native-sound-player";
 import Sound from "react-native-sound";
// import { useTheme } from "../../contexts/ThemeProvider";




const Dictionary = () => {
   const route = useRoute();
  const { wordDetails }: any = route.params;
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  // const [showMore, setShowMore] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");
  // const { theme, isLoadingTheme } = useTheme();

  useEffect(() => {
    GetWordMeaning();
  }, []);

  const GetWordMeaning = async () => {
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordDetails.word}`)
      .then((res) => {
      
        setResults(res.data[0].meanings);
        setAudioUrl(res.data[0].phonetics[0].audio);
      })
      .catch((err) => setError(err.response.data.message));
  };

   console.warn(setResults)
  // const meaningArray = results.map((item: IMeaning) =>
  //   item.definitions.map((item: IDefinition) => item.definition)
  // );
  const partsOfSpeech = results.map((item: IMeaning) => item.partOfSpeech);

  const playAudio = async () => {
    console.log("audioUrl--->>>", audioUrl);
    try {
      !!audioUrl && SoundPlayer.playUrl(audioUrl);
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

 

  return (
    <View
      style={styles.container}>

<View style ={styles.listView}>
  <Text style={styles.wordText}>{wordDetails[0]?.word}</Text>
  <Text style={styles.partText}>Phonetic :{wordDetails[0]?.phonetics[0]?.text}</Text>
  <Text style={styles.partText}>part of speech :{wordDetails[0]?.meanings[0]?.partOfSpeech}</Text>
  <Text style={styles.partText}>Definition: {wordDetails[0]?.meanings[0]?.definitions[0]?.definition}</Text>
  <Text style={styles.egText}>Example: {wordDetails[0]?.meanings[0]?.definitions[0]?.example}</Text>
  <Image source={require('C:\Users\Minnu Murali\Dictionary\assests\image\audiobutton.png')} /> 
  {/* <Image source={require('./audiobutton.png')}/> */}
</View>  
     
      {/* <FlatList
                    data={wordDetails}
                    renderItem={(item:any) => {
                        
                        return (
                            <View style ={styles.listView}>
                                <View>
                                <Text style ={styles.wordText}>  {wordDetails[0]?.word}</Text>
                                <Text style ={styles.wordText}> Pronounciation : {item?.item?.phonetics[0]?.text}</Text>
                                <Text style ={styles.partText}>partOfSpeech :{item?.item?.meanings[0]?.partOfSpeech}</Text>
                                 <Text style ={styles.partText}>{item?.item?.meanings[0]?.partOfSpeech}</Text>
                                <Text style ={styles.defText}> example: {item?.item?.meanings[0]?.definitions[0]?.definition}</Text>
                                
                                </View>
                               
                            </View>
                        )
                       
                    }}  keyExtractor={(item : any) => Math.random().toString(16).slice(2)}
                   
                    
                />  */}

      <Text style={styles.title}>
        {wordDetails.word}
      </Text>
      <View style={styles.btnContainer}>
        {/* <TouchableOpacity
          onPress={() => setShowMore(!showMore)}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.text}>show more</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={playAudio}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.text}>audio</Text>
        </TouchableOpacity>
      </View>
      {error !== "" && <Text style={styles.error}>{error}</Text>}

      {/* {meaningArray.map((items) =>
        items.map((item, index) => (
          <Text
            key={`__${index}`}
            style={styles.meaning}
          >
            {item}
          </Text>
        ))
      )} */}

      {/* {!!showMore && (
        <View style={styles.btnContainer}>
          {partsOfSpeech.map((item: string, index: number) => (
            <Text
              key={`__${index}`}
              style={styles.more}
            >
              {item}
            </Text>
          ))}
        </View>
      )} */}
    </View>
  );
};

export default Dictionary;

interface IMeaning {
  antonyms: string[];
  definitions: IDefinition[];
  partOfSpeech: string;
  synonyms: string[];
}

interface IDefinition {
  definition: string;
  example: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
  },
  meaning: {
    fontSize: 30,
    margin: 10,
  },
  error: {
    color: "red",
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#6f03fc",
    padding: 5,
    borderRadius: 5,
    fontWeight: "500",
    marginLeft: 10,
  },
  text: {
    fontSize: 25,
    margin: 10,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 15,
  },
  more: {
    color: "blue",
    fontSize: 30,
    marginTop: 10,
  },
  listView:{
       
    //borderWidth: 1,
    padding: 8,
   // borderRadius: 1,
    borderStartColor:"#171717",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation:3,
    marginTop:2,
    margin:"2%"

     
       
       

    },
    egText:{
     
      fontSize:30 ,
      paddingTop:5,
      color : "#1b1c1b",
      fontStyle:"italic"
      },
    partText:{
      fontWeight:"normal",
      fontSize:30 ,
      paddingTop:5,
      color : "#1b1c1b"
       },
  wordText:{
    fontSize: 40,
    fontWeight:"bold",
    color:"black"
},
defText :{
  fontSize: 30,
  fontStyle:"italic",
  padding :3,
  color : "#1b1c1b"
}
});
