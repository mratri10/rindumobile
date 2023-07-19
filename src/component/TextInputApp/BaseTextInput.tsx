import React from 'react';
import {Control, Controller} from 'react-hook-form';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../store';
import {ColorApp} from '../../util/color';

export type BaseInputTextType = {
  name: string;
  validation?: any;
  defaultValue?: string;
  control: Control<any>;
  error: any;
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
  icon?: ImageSourcePropType;
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
  icon,
}: BaseInputTextType) {
  const appStore = useStore('appStore');
  return (
    <View style={viewStyle}>
      <View style={contentStyle}>
        {icon ? (
          <View
            style={{
              backgroundColor: ColorApp.dark,
              padding: 5,
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <Image
              source={icon}
              style={{height: 20, width: 20, tintColor: ColorApp.light}}
            />
          </View>
        ) : null}
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
