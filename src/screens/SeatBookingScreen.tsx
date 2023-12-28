import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Image,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
// import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { getAllTimeshows } from '../redux/reducer/timeshows/timeshowAsyncs';
import { Showtime } from '../utils/types/timeshow.type';
import { Booking } from '../utils/types/booking.type';
import { addBookings } from '../redux/reducer/booking/bookingAsyncs';
// import EncryptedStorage from 'react-native-encrypted-storage';

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
    let formattedDate = {
      year: tempDate.getFullYear(),
      month: tempDate.getMonth() + 1,
      date: tempDate.getDate(),
      day: weekday[tempDate.getDay()],
      showtime: `${tempDate.getFullYear()}-${(tempDate.getMonth() + 1).toString().padStart(2, '0')}-${tempDate.getDate().toString().padStart(2, '0')}`,
    };
    weekdays.push(formattedDate);
  }
  // console.log(weekdays)
  return weekdays;
};

const generateSeats = (timeshowList: Showtime[]) => {
  const numRow = 8;
  const numColumn = 8;
  const rowArray = [];

  const colLabels = Array.from({ length: numColumn }, (_, index) => (index + 1).toString());
  const maxNumCol = Math.max(...colLabels.map(Number)); // Get the maximum number of columns
  const rowLabels = Array.from({ length: numRow }, (_, rowIndex) => String.fromCharCode(65 + rowIndex));

  for (let i = 0; i < numRow; i++) {
    const columnArray = [];
    for (let j = 0; j < maxNumCol; j++) {
      const seatObject = {
        number: `${rowLabels[i]}-${colLabels[j]}`,
        taken: false,
        selected: false,
      };

      // Check if the seat is taken based on timeshowList data
      timeshowList.forEach((data) => {
        const seatTaken = data.available_seats;
        seatTaken.forEach((seat) => {
          const taken = seat.is_available;
          const number = seat.seatNo;

          if (number === seatObject.number && taken) {
            seatObject.taken = true;
          }
        });
      });

      columnArray.push(seatObject);
    }
    rowArray.push(columnArray);
  }

  return rowArray;
};

const SeatBookingScreen = ({ navigation, route }: any) => {
  const { timeshowList } = useSelector(
    (state: RootState) => state.showtimes
  )
  const { bookingList } = useSelector(
    (state: RootState) => state.bookings
  )
  const { auth } = useSelector(
    (state: RootState) => state.user
  )
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [timeArray, setTimeArray] = useState<any>();
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[string][]>(generateSeats(timeshowList));
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(getAllTimeshows({ idMovie: route.params?.idMovie }));
    return () => {
      promise.abort
    }
  }, [dispatch]);

  // const user = auth ? route.params.user : ''
  // const fullname = auth ? '' : route.params.fullname
  // const email = auth ? '' : route.params.email
  // const number = auth ? '' : route.params.number
  const tmsh = timeshowList.filter(data => data.showtime === dateArray[selectedDateIndex]?.showtime).map(data => data.available_seats);
  const seatId = tmsh.flat().filter(s => selectedSeatArray.includes(s.seatNo)).map(ss => ss.id)
  // console.log(route.params.fullname)
  const initialState: Booking = {
    // id: '',
    user: route.params.user,
    fullname: route.params.fullname,
    email: route.params.email,
    number: route.params.number,
    titleMovie: route.params.titleMovie,
    seat: seatId,
    bookedAt: '',
    totalPrice: price,
    expiresIn: 210,
    paypal_payment_id: '',
    voucher: '',
    snacks: '',
    status: 'Pending'
  }

  useEffect(() => {
    const filteredTimes = timeshowList
      .filter(data => data.showtime === dateArray[selectedDateIndex]?.showtime)
      .map(data => data.time);

    setTimeArray(filteredTimes.flat());
  }, [selectedDateIndex, timeshowList, dateArray]);

  const selectSeat = (index: number, subindex: number, num: number) => {
    if (dateArray[selectedDateIndex] !== undefined) {
      if (!twoDSeatArray[index][subindex].taken) {
        let array: any = [...selectedSeatArray];
        let temp = [...twoDSeatArray];
        temp[index][subindex].selected = !temp[index][subindex].selected;
        if (!array.includes(num)) {
          array.push(num);
          setSelectedSeatArray(array);
        } else {
          const tempindex = array.indexOf(num);
          if (tempindex > -1) {
            array.splice(tempindex, 1);
            setSelectedSeatArray(array);
          }
        }
        setPrice(array.length * 5.0);
        setTwoDSeatArray(temp);
      }
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Date of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const BookSeats = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        await dispatch(addBookings(initialState)).unwrap()
        console.log('success')
      } catch (e: any) {
        // console.log(e)
        throw e
      }
      setTimeout(() => {
        navigation.push('PaymentDetail', {
          seatArray: selectedSeatArray,
          time: timeArray[selectedTimeIndex],
          date: dateArray[selectedDateIndex].showtime,
          ticketImage: route.params.imageTicket,
          price: price,
          username: route.params.name,
          titleMovie: route.params.titleMovie,
        })

      }, 5000);
      ToastAndroid.showWithGravity(
        'Please Waiting...',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );

    } else {
      ToastAndroid.showWithGravity(
        'Please Select Seats, Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{ uri: route.params?.imageTicket }}
          style={styles.ImageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name={require('~/assets/icons/close.png')}
                header={''}
                action={() => navigation.navigate('MovieDetails')}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
      </View>

      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {twoDSeatArray?.map((item, index) => {
            return (
              <View key={index} style={styles.seatRow}>
                {item?.map((subitem: any | null, subindex: number) => {
                  return (
                    <TouchableOpacity
                      key={subitem.number}
                      onPress={() => {
                        selectSeat(index, subindex, subitem.number);
                      }}
                    >
                      <Image
                        source={require('~/assets/icons/arm-chair.png')}
                        style={[
                          styles.seatIcon,
                          subitem.taken ? { tintColor: COLORS.Grey } : {},
                          subitem.selected ? { tintColor: COLORS.Orange } : {},
                        ]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <Image source={require('~/assets/icons/radio.png')} style={styles.radioIcon} />
            <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
            <Image
              source={require('~/assets/icons/radio.png')}
              style={[styles.radioIcon, { tintColor: COLORS.Grey }]}
            />
            <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
            <Image
              source={require('~/assets/icons/radio.png')}
              style={[styles.radioIcon, { tintColor: COLORS.Orange }]}
            />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
      </View>

      <View>
        <FlatList
          data={dateArray}
          keyExtractor={item => item.date}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? { marginLeft: SPACING.space_24 }
                      : index == dateArray.length - 1
                        ? { marginRight: SPACING.space_24 }
                        : {},
                    index == selectedDateIndex
                      ? { backgroundColor: COLORS.Orange }
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.OutterContainer}>
        <FlatList
          data={timeArray}
          keyExtractor={item => item.starttime}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => {
            return (
              !item.starttime ? (
                <View style={{ backgroundColor: 'red', alignItems: "center", justifyContent: "center", height: 20, width: 100 }}>
                  <Text style={styles.timeText}> No showtimes </Text>
                </View>
              ) : (
                <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                  <View
                    style={[
                      styles.timeContainer,
                      index == 0
                        ? { marginLeft: SPACING.space_24 }
                        : index == dateArray.length - 1
                          ? { marginRight: SPACING.space_24 }
                          : {},
                      index == selectedTimeIndex
                        ? { backgroundColor: COLORS.Orange }
                        : {},
                    ]}>
                    <Text style={styles.timeText}>{item.starttime}</Text>
                  </View>
                </TouchableOpacity>
              )
            );
          }}
        />
      </View>

      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>$ {price}.00</Text>
        </View>
        <TouchableOpacity onPress={BookSeats}>
          <Text style={styles.buttonText}>Book now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  ImageBG: {
    width: '100%',
    aspectRatio: 2200 / 2000,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  screenText: {
    textAlign: 'center',
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
    // paddingHorizontal: SPACING.space_20,
    // backgroundColor:'red'
  },
  containerGap20: {
    gap: SPACING.space_15,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_15,
    justifyContent: 'center',
  },
  seatIcon: {
    padding: 0
    // fontSize: FONTSIZE.size_20,
    // color: COLORS.White,
    // tintColor: 'red'
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    // fontSize: FONTSIZE.size_20,
    tintColor: COLORS.Yellow,
  },
  radioText: {
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  OutterContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    // fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
  },
});

export default SeatBookingScreen;
