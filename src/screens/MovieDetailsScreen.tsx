import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import { LinearGradient } from 'expo-linear-gradient';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const MovieDetailsScreen = ({ navigation }: any) => {
  const { getIdMovie, loading, isSuccess, error } = useSelector(
    (state: RootState) => state.movies
  )

  if (
    getIdMovie == undefined &&
    getIdMovie == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name={require('~/assets/icons/left-arrow.png')}
            header={''}
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <StatusBar hidden />

        <View>
          <ImageBackground
            source={{
              uri: getIdMovie?.posterImage,
            }}
            style={styles.imageBG}>
            <LinearGradient
              colors={[COLORS.BlackRGB10, COLORS.Black]}
              style={styles.linearGradient}>
              <View style={styles.appHeaderContainer}>
                <AppHeader
                  name={require('~/assets/icons/left-arrow.png')}
                  header={''}
                  action={() => navigation.goBack()}
                />
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.imageBG}></View>
          <Image
            source={{ uri: getIdMovie?.posterImage }}
            style={styles.cardImage}
          />
        </View>

        <View style={styles.timeContainer}>
          <Image source={require('~/assets/icons/clock-circular-outline.png')} style={{ width: 20, height: 20, marginEnd: 10 }} />
          <Text style={styles.runtimeText}>
            {Math.floor(getIdMovie?.durationInMinutes / 60)}h{' : '}
            {Math.floor(getIdMovie?.durationInMinutes % 60)}m
          </Text>
        </View>

        <View>
          <Text style={styles.title}>{getIdMovie?.title}</Text>
          <View style={styles.genreContainer}>
            {getIdMovie.genre.split(',').map((item: any, index: number) => {
              const trimmedGenre = item.trim(); // Trim spaces around the genre
              return (
                <View key={index + 1} style={styles.genreBox}>
                  <Text style={styles.genreText}>{trimmedGenre}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.tagline}>{getIdMovie?.tagline}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.rateContainer}>
            <Image source={require('~/assets/icons/star.png')} style={{ width: 20, height: 20 }} />
            <Text style={styles.runtimeText}>
              {getIdMovie?.rating} ({getIdMovie?.views})
            </Text>
            <Text style={styles.runtimeText}>{getIdMovie?.release_date}
            </Text>
          </View>
          <Text style={styles.descriptionText}>{getIdMovie?.description}</Text>
        </View>

        <View>
          <CategoryHeader title="Top Cast" />
          <FlatList
            data={getIdMovie.actors}
            keyExtractor={(item: any) => item.id}
            horizontal
            contentContainerStyle={styles.containerGap24}
            renderItem={({ item, index }) => (
              <CastCard
                shouldMarginatedAtEnd={true}
                cardWidth={80}
                isFirst={index == 0}
                isLast={index == getIdMovie.actors?.length - 1}
                imagePath={item.image}
                title={item.name}
                subtitle={item.character}
              />
            )}
          />

        </View>
      </ScrollView>
      <View style={styles.buyTicket}>
        <TouchableOpacity style={styles.buttonBG}>
          <Text style={[styles.buttonText, { backgroundColor: COLORS.Grey }]}>See Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonBG}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={[styles.buttonText, { paddingHorizontal: 70 }]}>Buy Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
    marginBottom: SPACING.space_36 * 2
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  buyTicket: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.Black,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runtimeText: {
    // fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  title: {
    // fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    // fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  tagline: {
    // fontFamily: FONTFAMILY.thin,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  descriptionText: {
    // fontFamily: FONTFAMILY.light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
    paddingBottom: SPACING.space_28
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
    // fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});

export default MovieDetailsScreen;
