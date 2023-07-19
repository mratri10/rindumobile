import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Modal,
  ScrollView,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  Image,
} from 'react-native';
import {ColorApp} from '../../util/color';
import {Control, Controller} from 'react-hook-form';

export type BaseInputType = {
  name: string;
  validation?: any;
  defaultValue?: DateItemType;
  control: Control<any>;
  error: any;
  viewStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
  label?: string;
  placeholder?: string;
  icon?: ImageSourcePropType;
};
// DateInputApp adalah dasar input date yang mengontrol perubahaan data yang dimasukkan
function DateInputApp({
  name,
  validation,
  defaultValue,
  control,
  error,
  viewStyle,
  placeholder,
  contentStyle,
  errorStyle,
  icon,
}: BaseInputType) {
  return (
    <View style={viewStyle}>
      <View style={contentStyle}>
        <Controller
          control={control}
          rules={validation}
          render={({field: {onChange, onBlur, value}}) => {
            // Lalu DateInputApp meneruskan Widget DateInput untuk mengatur Field yang akan tampil pada screen form
            return (
              <DateInput
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

type DateItemType = {
  month: number;
  day: number;
  year: number;
};
type DateType = {
  value: DateItemType;
  onChange: (v: DateItemType) => void;
  placeholder?: string;
  icon?: ImageSourcePropType;
};
const FirstYear = new Date().getFullYear() - 53;

// Pada Date Input terdapat 3 value dasar yang diperoleh dari DateInputApp
function DateInput({value, onChange, placeholder, icon}: DateType) {
  const [show, setShow] = useState(false);
  const [dateData, setDateData] = useState<DateItemType>(
    value ?? {
      day: 15,
      month: 6,
      year: 2010,
    },
  );

  // Konversi value tanggal dari Data tanggal yang disetting secara hardcode
  const convertDay = (v: number) => {
    setDateData({...dateData, day: v + 1});
  };
  const convertMonth = (v: number) => {
    setDateData({...dateData, month: v + 1});
  };
  const convertYear = (v: number) => {
    setDateData({...dateData, year: FirstYear + v});
  };
  return (
    <TouchableOpacity onPress={() => setShow(true)}>
      {icon ? (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            alignItems: 'center',
            padding: 10,
            borderColor: ColorApp.dark,
            flexDirection: 'row',
          }}>
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
          <View style={{flex: 1}} />
          {value && value.day && value.month && value.year ? (
            <Text style={styles.textMain}>
              {must2Number(value.day.toString())} {converMonthName(value.month)}{' '}
              {value.year}
            </Text>
          ) : (
            <Text style={styles.textPlaceholder}>
              {placeholder ?? 'Masukan Tanggal Anda'}
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.main}>
          {value && value.day && value.month && value.year ? (
            <Text style={styles.textMain}>
              {must2Number(value.day.toString())} {converMonthName(value.month)}{' '}
              {value.year}
            </Text>
          ) : (
            <Text style={styles.textPlaceholder}>
              {placeholder ?? 'Masukan Tanggal Anda'}
            </Text>
          )}
        </View>
      )}
      <Modal visible={show} transparent={true}>
        <View style={styles.date}>
          <View style={styles.headerDate}>
            <Text style={styles.titleDate}>Date Picker</Text>
          </View>
          <View style={styles.timeHeader}>
            <ItemDate
              name="Month"
              data={bulan}
              onChange={v => convertMonth(v)}
              value={dateData.month - 1}
            />
            <ItemDate
              name="Day"
              data={tanggal}
              onChange={v => convertDay(v)}
              value={dateData.day - 1}
            />
            <ItemDate
              name="Year"
              data={tahun}
              onChange={v => convertYear(v)}
              value={dateData.year - FirstYear}
            />
          </View>
          <View style={styles.contentBottom}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShow(false);
              }}>
              <Text style={styles.textButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShow(false);
                onChange(dateData ?? value);
              }}>
              <Text style={styles.textButton}>Oke</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}
type ItemDateType = {
  name: string;
  data: any[];
  onChange: (V: number) => void;
  value: number;
};
const ItemDate = ({name, data, value, onChange}: ItemDateType) => {
  const scrollRef = useRef<ScrollView>(null);
  const [scroll, setScroll] = useState<number>(value);
  const [set, setSet] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({y: scroll * 32});
    }
  }, []);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newindex = Math.round(offsetY / 32);

    setScroll(newindex);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({y: scroll * 32});
      onChange(scroll);
    }
  }, [set]);
  return (
    <View style={styles.coloumnTime}>
      <View style={styles.headerColumnTime}>
        <Text style={styles.columnTextHeader}>{name}</Text>
      </View>
      <ScrollView
        style={styles.contentTime}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={3000}
        onMomentumScrollEnd={() => {
          setSet(!set);
        }}
        ref={scrollRef}>
        {data.map((item, index) => (
          <View key={index} style={{height: 32, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>{item != 0 ? item : ''}</Text>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          top: 0,
          bottom: 0,
          paddingTop: 32,
        }}>
        <View style={{flex: 1}} />
        <View
          style={{
            height: 32,
            borderTopWidth: 1,
            width: '100%',
            borderBottomWidth: 1,
            borderColor: ColorApp.dark,
          }}></View>
        <View style={{flex: 1}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderColor: ColorApp.dark,
    borderRadius: 10,
    padding: 10,
  },
  textMain: {
    color: ColorApp.dark,
  },
  textPlaceholder: {
    color: ColorApp.dark_input,
  },
  date: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerDate: {
    backgroundColor: ColorApp.dark,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  titleDate: {
    color: ColorApp.light,
    fontWeight: 'bold',
    fontSize: 20,
  },
  timeHeader: {
    flexDirection: 'row',
    backgroundColor: ColorApp.light,
  },
  coloumnTime: {
    flex: 1,
  },
  columnTextHeader: {
    textAlign: 'center',
  },
  headerColumnTime: {
    height: 32,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  contentTime: {
    height: 160,
  },
  contentBottom: {
    borderTopWidth: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: ColorApp.light,
  },
  button: {
    padding: 10,
  },
  textButton: {
    color: ColorApp.dark,
    fontWeight: 'bold',
  },
});
const currentYear = new Date().getFullYear();
const tahun = [0, 0];
tahun.push(...Array.from({length: 54}, (_, index) => currentYear - 53 + index));
tahun.push(0, 0);
const tanggal = [0, 0];
tanggal.push(...Array.from({length: 31}, (_, index) => 1 + index));
tanggal.push(...[0, 0]);
const bulan = [
  '',
  '',
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'Sepetember',
  'Oktober',
  'November',
  'Desember',
  '',
  '',
];

const must2Number = (text: string) => {
  if (text.length == 1) return '0' + text;
  return text;
};
const converMonthName = (v: number) => {
  return bulan[v + 1];
};

export function convertDate(params: string): DateItemType {
  if (parseInt(params.substring(0, 4)) > 1930) {
    return {
      year: parseInt(params.substring(0, 4)),
      month: parseInt(params.substring(5, 7)),
      day: parseInt(params.substring(8, 10)),
    };
  } else {
    return {
      year: 2000,
      month: 1,
      day: 1,
    };
  }
}
export default DateInputApp;
