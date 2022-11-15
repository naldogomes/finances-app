import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const Profile: React.FC = () => {
  return (
    <View>
      <Text testID="text-title">Profile</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Naldo"
      ></TextInput>

      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Gomes"
      ></TextInput>

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
};

export default Profile;
