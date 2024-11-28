import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../config/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFavorites(currentUser.uid);
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchFavorites = async (uid) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users', uid, 'favorites'));
      const favs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavorites(favs);
    } catch (error) {
      console.error('Error fetching favorites: ', error);
    }
  };

  const clearFavorites = async () => {
    if (user) {
      try {
        const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'favorites'));
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setFavorites([]);
      } catch (error) {
        console.error('Error clearing favorites: ', error);
      }
    }
  };

  const removeFavorite = async (cryptoId) => {
    if (user) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'favorites', cryptoId));
        setFavorites(favorites.filter(fav => fav.id !== cryptoId));
      } catch (error) {
        console.error('Error removing favorite: ', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemTextContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('CryptoDetails', { cryptoId: item.id })}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSymbol}>{item.symbol}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFavorite(item.id)}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>No currency found</Text>
      )}
      <TouchableOpacity
        style={[styles.exchangeButton, { marginTop: 20 }]}
        onPress={clearFavorites}
        disabled={favorites.length === 0}
      >
        <Text style={styles.exchangeButtonText}>Clear Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSymbol: {
    fontSize: 14,
    color: 'gray',
    marginTop: -5,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'crimson',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  exchangeButton: {
    backgroundColor: 'crimson',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  exchangeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default FavoritesScreen;