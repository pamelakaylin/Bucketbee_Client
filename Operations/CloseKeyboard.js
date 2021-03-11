import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const CloseKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default CloseKeyboard;
