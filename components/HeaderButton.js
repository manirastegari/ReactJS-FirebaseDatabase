import React from 'react';
import { Button } from 'react-native';

const HeaderButton = ({ title, onPress }) => {
  return <Button title={title} onPress={onPress} color="black" />;
};

export default HeaderButton;