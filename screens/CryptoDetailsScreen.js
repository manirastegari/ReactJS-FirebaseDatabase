import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const CryptoDetailsScreen = ({ route }) => {
  const { cryptoId } = route.params;
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://api.coinlore.net/api/ticker/?id=${cryptoId}`)
      .then(response => response.json())
      .then(data => setCryptoDetails(data[0]))
      .catch(error => console.error(error));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [cryptoId]);

  const addToFavorites = async () => {
    if (cryptoDetails && user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'favorites', cryptoDetails.id.toString()), cryptoDetails);
        alert('Added to favorites!');
      } catch (error) {
        console.error('Error adding to favorites: ', error);
      }
    } else {
      alert('You must be logged in to add favorites.');
    }
  };

  return (
    <View style={styles.container}>
      {cryptoDetails ? (
        <>
          <Text style={styles.itemName}>{cryptoDetails.name} ({cryptoDetails.symbol})</Text>
          <Text>Rank: {cryptoDetails.rank}</Text>
          <Text>Price (USD): ${cryptoDetails.price_usd}</Text>
          <Text>Price (BTC): {cryptoDetails.price_btc}</Text>
          <Text>Market Cap (USD): ${cryptoDetails.market_cap_usd}</Text>
          <Text>24h Volume: ${cryptoDetails.volume24}</Text>
          <Text>24h Volume (Alt): ${cryptoDetails.volume24a}</Text>
          <Text>Circulating Supply: {cryptoDetails.csupply}</Text>
          <Text>Total Supply: {cryptoDetails.tsupply}</Text>
          <Text>Max Supply: {cryptoDetails.msupply}</Text>
          <Text>Change (1h): {cryptoDetails.percent_change_1h}%</Text>
          <Text>Change (24h): {cryptoDetails.percent_change_24h}%</Text>
          <Text>Change (7d): {cryptoDetails.percent_change_7d}%</Text>
          <TouchableOpacity style={styles.exchangeButton} onPress={addToFavorites}>
            <Text style={styles.exchangeButtonText}>Add to Favorites</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'crimson',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  exchangeButton: {
    marginTop: 20,
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

export default CryptoDetailsScreen;