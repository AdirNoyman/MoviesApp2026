import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

type Props = {
  onPress?: () => void;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image
        source={icons.search}
        className='size-5'
        resizeMode='contain'
        tintColor='#ab8bff'
      />
      <TextInput
        className='flex-1 ml-2 text-white'
        placeholder={placeholder}
        placeholderTextColor='#a8b5db'
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
