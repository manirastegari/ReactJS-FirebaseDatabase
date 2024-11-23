import { useState } from "react";
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    StatusBar } from "react-native";
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../config/FirebaseConfig";

const AddNewBook = () => {

    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookGenre, setBookGenre] = useState('');

    const addBook = async () => {
        if(bookName === '' || bookAuthor === '' || bookGenre === '') {
            Alert.alert('Error!', 'Please provide all the details');
            return;
        }

        try {
            const collectionRef = collection(db, 'bookDB');
            const bookData = {
                name: bookName,
                author: bookAuthor,
                genre: bookGenre
            }
            const docRef = await addDoc(collectionRef, bookData);
            setBookName('');
            setBookAuthor('');
            setBookGenre('');
            console.log('Book ID: ', docRef.id);

        } catch (e) {
            console.log('Error adding the book: ', e)
        }
    }

    return(
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="lightsteelblue" />
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Add New Book</Text>
            </View>
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
                onPress={addBook} >
                <Text style={styles.buttonText}>Add Book</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddNewBook;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: StatusBar.currentHeight
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightsteelblue',
        height: 50,
        width: '100%',
        marginBottom: 20
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'navy'
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