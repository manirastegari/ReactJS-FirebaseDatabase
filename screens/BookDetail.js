import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { db } from "../config/FirebaseConfig";

const BookDetail = ({navigation, route}) => {

    const { bookDetail } = route.params

    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookGenre, setBookGenre] = useState('');

    useEffect(() => {
      setBookName(bookDetail.name);
      setBookAuthor(bookDetail.author);
      setBookGenre(bookDetail.genre);
    }, []);

    const updateBook = async () => {
      if(bookName === '' || bookAuthor === '' || bookGenre === '') {
          Alert.alert('Error!', 'Please provide all the details');
          return;
      }

      console.log(`${bookDetail.id} to be updated`);

      const bookData = {
        name: bookName,
        author: bookAuthor,
        genre: bookGenre
      }
      console.log(bookData);

      const bookUpdate = doc(db, 'bookDB', bookDetail.id);

      await updateDoc(bookUpdate, bookData);
      Alert.alert('Update', `Book ${bookDetail.name} updated successfully.`);
      navigation.goBack();
    }

    return(
        <View style={styles.container}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter Book Name"
            value={bookName}
            autoCapitalize="words"
            onChangeText={(text) => setBookName(text)} />
          <TextInput
            style={styles.inputText}
            placeholder="Enter Book Author"
            value={bookAuthor}
            autoCapitalize="words"
            onChangeText={(text) => setBookAuthor(text)} />
          <TextInput
            style={styles.inputText}
            placeholder="Enter Book Genre"
            value={bookGenre}
            autoCapitalize="words"
            onChangeText={(text) => setBookGenre(text)} />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => updateBook()} >
            <Text style={styles.buttonText}>Update Book</Text>
          </TouchableOpacity>
        </View>
    )
}

export default BookDetail;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    inputText: {
      width: '80%',
      height: 50,
      borderColor: 'lightsteelblue',
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 18,
      marginBottom: 10,
      marginTop: 10
    },
    buttonStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      backgroundColor: 'lightsteelblue',
      borderRadius: 10,
      height: 40,
      marginTop: 10
    },
    buttonText: {
      fontSize: 20,
      fontWeight: '500',
      color: 'navy'
    }
  });