import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

type CustomMsgBoxProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

const CustomMsgBox = ({visible, message, onClose}: CustomMsgBoxProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
        <View style={tw`w-75 p-5 bg-white rounded-lg items-center`}>
          <Text style={tw`text-lg font-bold`}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={tw`mt-5`}>
            <Text style={tw`text-lg text-blue-500`}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleOpenModal = () => {
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <View style={tw`flex-1 justify-center items-center`}>
//       <TouchableOpacity onPress={handleOpenModal} style={tw`p-3 bg-blue-500 rounded-lg`}>
//         <Text style={tw`text-white`}>Show Message</Text>
//       </TouchableOpacity>

//       <CustomMsgBox
//         visible={modalVisible}
//         message="This is a customizable message!"
//         onClose={handleCloseModal}
//       />
//     </View>
//   );
// };

export default CustomMsgBox;
