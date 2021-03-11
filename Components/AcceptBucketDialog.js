import React, { useState } from 'react';
import theme from '../styles/theme.style';
import Dialog from 'react-native-dialog';

import { View } from 'react-native';

const AcceptBucketDialog = ({
  acceptDialogVisible,
  setAcceptDialogVisible,
  handleBucketAdd,
}) => {
  return (
    <View>
      <Dialog.Container visible={acceptDialogVisible}>
        <Dialog.Title>Add this bucket?</Dialog.Title>
        <Dialog.Button
          color="red"
          bold={true}
          label="No"
          onPress={() => setAcceptDialogVisible(false)}
        />
        <Dialog.Button
          color={theme.PRIMARY_COLOR_LITE}
          bold={true}
          label="Yes"
          onPress={handleBucketAdd}
        />
      </Dialog.Container>
    </View>
  );
};

export default AcceptBucketDialog;
