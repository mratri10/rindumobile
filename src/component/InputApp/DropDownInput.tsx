import React, {useState} from 'react';
import {Control, Controller} from 'react-hook-form';
import {
  Image,
  ImageSourcePropType,
  Modal,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ColorApp} from '../../util/color';
import {arrowBelowIcon, arrowUpIcon} from '../../util/picture';

export type DropDownType = {
  name: string;
  validation?: any;
  defaultValue?: number;
  control: Control<any>;
  content: string[];
  error: any;
  viewStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
  label?: string;
  placeholder?: string;
  icon?: ImageSourcePropType;
};
function DropDownInput({
  name,
  validation,
  defaultValue,
  content,
  control,
  error,
  viewStyle,
  placeholder,
  contentStyle,
  errorStyle,
  icon,
}: DropDownType) {
  return (
    <View style={viewStyle}>
      <View style={contentStyle}>
        <Controller
          control={control}
          rules={validation}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <DropDown
                content={content}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                icon={icon}
              />
            );
          }}
          name={name}
          defaultValue={defaultValue}
        />
      </View>
      {error[name] ? (
        <Text style={errorStyle}>{error[name].message}</Text>
      ) : null}
    </View>
  );
}
type DropType = {
  content: string[];
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  icon?: ImageSourcePropType;
};
const DropDown = ({value, onChange, placeholder, icon, content}: DropType) => {
  const [show, setShow] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.main}
        onPress={() => {
          setShow(!show);
        }}>
        {icon ? (
          <View
            style={{
              backgroundColor: ColorApp.dark,
              padding: 5,
              borderRadius: 10,
            }}>
            <Image
              source={icon}
              style={{width: 20, height: 20, tintColor: ColorApp.light}}
            />
          </View>
        ) : null}
        <Text style={value >= 0 ? styles.textItem : styles.textPlaceholder}>
          {value >= 0 ? content[value] : placeholder ?? 'Masukan Data Anda'}
        </Text>
        <Image
          source={show ? arrowUpIcon : arrowBelowIcon}
          style={{tintColor: ColorApp.dark, height: 20, width: 20}}
        />
      </TouchableOpacity>
      {show ? (
        <ScrollView
          style={{
            maxHeight: 150,
            backgroundColor: ColorApp.light,
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingTop: 10,
            paddingBottom: 20,
          }}>
          {content.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={{paddingVertical: 5}}
                onPress={() => {
                  onChange(index);
                  setShow(!show);
                }}>
                <Text>{item}</Text>
              </TouchableOpacity>
              <View style={{height: 1, backgroundColor: ColorApp.dark}} />
            </View>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};

export function ConvertStringArray(data: any[], params: string): string[] {
  const dataResult: string[] = [];
  data.map((v: any) => {
    dataResult.push(v[params]);
  });
  return dataResult;
}

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    borderColor: ColorApp.dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textPlaceholder: {
    color: ColorApp.dark_input,
  },
  textItem: {
    color: ColorApp.dark,
  },
});

export default DropDownInput;
