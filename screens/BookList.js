import { 
  useCallback,
  useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
  import { 
  StyleSheet, 
  View, 
  Text,
  TextInput, 
  TouchableOpacity, 
  Alert, 
  FlatList, 
  StatusBar} from "react-native";
import { 
  collection, getDocs, deleteDoc, doc, 
  query,
  where} from 'firebase/firestore';
import { db } from "../config/FirebaseConfig";
import Icon from 'react-native-vector-icons/FontAwesome';


const BookList = ({navigation}) => {

  const [bookList, setbookList] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState('');

  useFocusEffect(
    useCallback(() => {
      getAllBooks();
    }, [])
  )

  const deleteBook = async (data) => {
    try {
      // reference of the specific document
      const deleteBook = doc(db, 'bookDB', data.id)
      await deleteDoc(deleteBook);
      Alert.alert('Deleted', `${data.name} is deleted.`);
      getAllBooks();
    } catch(e) {
      console.log('Error deleting the book: ', e);
    }
  }

  const getAllBooks = async () => {
    try {
      // reference of the collection
      const collectionRef = collection(db, 'bookDB');

      // get all the documents from the collection
      const getBookList = await getDocs(collectionRef);

      const responseBooks = [];

      getBookList.forEach( (doc) => {
        const Book = {
          id: doc.id, // document id
          ...doc.data()
        }
        responseBooks.push(Book);
      });

      setbookList(responseBooks);
    } catch (e) {
      console.log('Error fetching books: ', e);
    }
  }

  const searchAllBooks = async () => {
    try {
      // reference of collction from firebase
      const collectionRef = collection(db, 'bookDB');

      // generate the search query
      const searchQuery = query(collectionRef, where('genre', '==', searchKeyword))

      const getBookList = await getDocs(searchQuery);

      const responseBooks = [];

      getBookList.forEach( (doc) => {
        const Book = {
          id: doc.id, // document id
          ...doc.data()
        }
        responseBooks.push(Book);
      });

      if(responseBooks.length > 0) {
        setbookList(responseBooks);
      } else {
        Alert.alert('Search Result','No Data Found');
      }

      setSearchKeyword('');

    } catch (e) {
      console.log("Search Error: ", e)
    }
  }

  const showBookDetail = (item) => {
    navigation.navigate('BookDetail', { bookDetail: item });
  };

  const handleEmptyList = () => (
    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 26, color: 'red' }}>No Data Found!</Text>
    </View>
  );

  const BookItem = ({item}) => (
    <TouchableOpacity onPress={() => showBookDetail(item)}>
      <View style={styles.mainView}>
        <View style= {styles.subViewContainer}>
          <View style={styles.subView}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.houseText}>Genre: {item.genre}</Text>
          </View>
          <Icon 
            style={{ marginLeft: 'auto' }} 
            name='trash' 
            color='navy' 
            size={26}
            nPress={() => deleteBook(item)} />
        </View>
      </View>
    </TouchableOpacity>
  );

    return(
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 10
          }}>
            <TextInput
              style={styles.inputText}
              placeholder="Search Keyword"
              value={searchKeyword}
              autoCapitalize="words"
              onChangeText={(text) => setSearchKeyword(text)} />
            
            <Icon
              style={{
                marginLeft: 10
              }}
              name='search' 
              color='navy' 
              size={26}
              onPress={() => searchAllBooks()} />
          </View>
            
          <FlatList
            keyExtractor={(item) => {return item.id}}
            data={bookList}
            renderItem={ ({item}) => <BookItem item={item} /> }
            ListEmptyComponent={handleEmptyList} />
        </View>
    )
}

export default BookList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    mainView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'lightsteelblue',
      padding: 10,
      margin: 10,
      maxWidth: '100%'
    },
    subViewContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
    },
    subView: {
      flex: 1,
      height: '50%',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    nameText: {
      fontSize: 18,
      fontWeight: '700',
      color: 'navy'
    },
    houseText: {
      fontSize: 16,
      fontWeight: '500',
      color: 'navy'
    },
    inputText: {
      width: '50%',
      height: 50,
      borderColor: 'lightsteelblue',
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 18
    }
  });