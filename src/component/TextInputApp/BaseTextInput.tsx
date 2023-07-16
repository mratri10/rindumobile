import React from 'react';
import {Control, Controller, FieldValues, useForm} from 'react-hook-form';
import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../store';

export type BaseInputType = {
  name: string;
  validation?: any;
  defaultValue?: string;
  control: Control<any>;
  error?: any;
  inputStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
  content?: React.ReactNode;
  placeHolder?: string;
  placeHolderColor?: string;
  label?: string;
  isSecure?: boolean;
  onSecure?: () => void;
  setSecure?: boolean;
};
function BaseTextInput({
  name,
  validation,
  defaultValue,
  control,
  error,
  inputStyle,
  viewStyle,
  content,
  contentStyle,
  errorStyle,
  placeHolder,
  placeHolderColor,
  isSecure,
}: BaseInputType) {
  const appStore = useStore('appStore');
  return (
    <View style={viewStyle}>
      <View style={contentStyle}>
        <Controller
          control={control}
          rules={validation}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              onFocus={() => {
                appStore.setFocus(name);
              }}
              value={value}
              style={inputStyle}
              placeholder={placeHolder}
              placeholderTextColor={placeHolderColor}
              secureTextEntry={isSecure}
            />
          )}
          name={name}
          defaultValue={defaultValue ?? ''}
        />
        {content}
      </View>
      {error[name] ? (
        <Text style={errorStyle}>{error[name].message}</Text>
      ) : null}
    </View>
  );
}

export default observer(BaseTextInput);
