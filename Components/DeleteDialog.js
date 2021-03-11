import React, { useState } from 'react';
import theme from '../styles/theme.style';
import Dialog from 'react-native-dialog';

import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
  Pressable,
} from 'react-native';

const DeleteDialog = ({
  deleteVisible,
  setDeleteVisible,
  handleDelete,
  typeOf,
}) => {
  return (
    <View>
      <Dialog.Container visible={deleteVisible}>
        <Dialog.Title>Delete {typeOf}?</Dialog.Title>
        <Dialog.Description>You cannot undo this action.</Dialog.Description>
        <Dialog.Button
          color={theme.PRIMARY_COLOR_LITE}
          bold={true}
          label="Cancel"
          onPress={() => setDeleteVisible(false)}
        />
        <Dialog.Button
          color="red"
          bold={true}
          label="Delete"
          onPress={handleDelete}
        />
      </Dialog.Container>
    </View>
  );
};

export default DeleteDialog;
