import React from 'react'
import { View, Text, Modal, Image, Alert, Pressable } from 'react-native'
import styles from './styles'

export default ImageView = (props) => {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        visible={props?.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{"Id : " + props.item?.id}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props?.hideModal(false)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}
