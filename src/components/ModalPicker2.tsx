import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, Picker, Animated, TouchableOpacity } from 'react-native';
import ThemeColors from '../shared/ThemeColors';
import RoundedButton from './RoundedButton';
import { Icon, Badge } from 'react-native-elements';

// tslint:disable-next-line: max-line-length
const ModalPicker2 = <T extends string>({ label, modalHeader, onModalClose, data, onSelect, modalStyles }: ModalPicker2Props<T>) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [overlayValue] = useState(new Animated.Value(0));
  const [value, setValue] = useState<T>(data[0].value);

  const getLabelByValue = (value: string) => data.find(el => el.value === value)?.label;

  const onValueChange = (value: T) => {
    setValue(value);
    onSelect(value);
  };

  const onOpen = () => {
    setModalVisible(true);
    startOverlayAnimationOnOpen();
  };

  const onClose = () => {
    setModalVisible(!modalVisible);
    overlayValue.setValue(0);
  };

  const startOverlayAnimationOnOpen = () => {
    overlayValue.setValue(0);

    Animated.timing(
      overlayValue,
      {
        toValue: 1,
        duration: 800,
      },
    ).start();
  };

  const backgroundColorOnOpen = overlayValue.interpolate(
    {
      inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.8, 1],
      outputRange: ['rgba(0,0,0,0.0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)'],
    },
  );

  const animatedStyleOverlay = {
    ...styles.overlay,
    backgroundColor: backgroundColorOnOpen,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity onPress={onOpen}>
        <View style={styles.containerField}>
          <View style={styles.selectContainer}>
            <Badge status={value} badgeStyle={styles.badge} />
            <Text style={styles.select}>{getLabelByValue(value)}</Text>
            <Icon type='font-awesome' name='chevron-down' style={styles.chevronDown} />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={onModalClose}
        presentationStyle={'overFullScreen'}
      >
        <Animated.View style={animatedStyleOverlay}>
          <View style={[styles.modalView, modalStyles]}>

            <View style={styles.modalHeader}>
              <Text style={styles.headerText}>{modalHeader}</Text>
            </View>

            <View style={styles.modalContent}>
              <Picker
                selectedValue={value}
                onValueChange={onValueChange}
                style={styles.picker}
                mode='dropdown'
                itemStyle={styles.itemStyle}
              >
                {
                  data.map((item: DataItem<T>, index: number) => (
                    <Picker.Item key={index} label={item.label} value={item.value} />
                  ))
                }
              </Picker>
            </View>

            <View style={styles.modalFooter}>
              <RoundedButton
                text='Hide'
                type='error'
                onPress={onClose}
              />
            </View>

          </View>
        </Animated.View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  label: {
    fontSize: 20,
    color: ThemeColors.black,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  containerField: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  selectContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: ThemeColors.black,
  },
  badge: {
    height: 18,
    width: 18,
    borderRadius: 20,
    marginTop: 2,
    marginRight: 10,
  },
  select: {
    width: '84%',
    fontSize: 18,
    color: ThemeColors.black,
  },
  chevronDown: {
    width: '10%',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  inputContainer: {
    marginBottom: 20,
    maxHeight: 180,
  },
  inputLabel: {
    fontSize: 20,
    color: ThemeColors.black,
  },
  inputText: {
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeader: {

  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  modalFooter: {

  },
  headerText: {
    fontSize: 24,
    color: ThemeColors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemStyle: {
    fontSize: 20,
    height: 75,
    color: ThemeColors.black,
    textAlign: 'center',
  },
  picker: {
    width: 200,
  },
});

type ModalPicker2Props<T> = {
  label: string,
  data: DataItem<T>[],
  modalHeader: string,
  onModalClose?(): any,
  onSelect(value: T): any,
  modalStyles?: { width: string | number, height: string | number },
};

type DataItem<T> = {
  label: string,
  value: T,
};

export default ModalPicker2;
