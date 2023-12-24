import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { getAllMovies } from '../redux/reducer/movies/movieAsyncs';
import { RootState, useAppDispatch } from '../redux/store';

const { width, height } = Dimensions.get('window');

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      ' Something went wrong in getUpcomingMoviesList Function',
      error,
    );
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      ' Something went wrong in getPopularMoviesList Function',
      error,
    );
  }
};


const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()

  const { movieList, loading, isSuccess, error } = useSelector(
    (state: RootState) => state.movies
  )
  // console.log(movieList)

  // const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(movieList);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);


  console.log(movieList)

  useEffect(() => {
    const promise = dispatch(getAllMovies());

    (async () => {
        // let tempNowPlaying = await getNowPlayingMoviesList();
        // setNowPlayingMoviesList([
        //   movieList
        // ]);

        let tempPopular = await getPopularMoviesList();
        setPopularMoviesList(tempPopular.results);

        let tempUpcoming = await getUpcomingMoviesList();
        setUpcomingMoviesList(tempUpcoming.results);
      })();
    return () => {
      promise.abort
    }
  }, [dispatch]);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  if (
    loading == false &&
    movieList == undefined &&
    movieList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <LinearGradient style={{ flex: 1 }} colors={[COLORS.Black, COLORS.Orange]}>
        <ScrollView
          style={styles.container}
          bounces={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <StatusBar hidden />

          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={searchMoviesFunction} />
          </TouchableOpacity>

          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={COLORS.Orange} />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.Black, COLORS.DarkGrey, COLORS.Orange, COLORS.DarkGrey]}>
      <ScrollView style={styles.container} bounces={false}>
        <StatusBar hidden />

        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} disable={false} />
        </TouchableOpacity>

        <CategoryHeader title={'Now Playing'} />
        <FlatList
          data={movieList}
          keyExtractor={(item) => item.id}
          bounces={false}
          snapToInterval={width * 0.7 + SPACING.space_36}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          contentContainerStyle={styles.containerGap36}
          renderItem={({ item, index }) => {
            if (!item.title) {
              return (
                <View
                  style={{
                    width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                  }}></View>
              );
            }
            return (
              <MovieCard
                shoudlMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('MovieDetails', { movieid: item.id });
                }}
                cardWidth={width * 0.7}
                isFirst={index == 0 ? true : false}
                isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                title={item.title}
                imagePath={item.posterImage}
                genre={item.genre.slice(1, 4)}
                vote_average={item.rating}
                vote_count={item.views}
              />
            );
          }}
        />
        <CategoryHeader title={'Popular'} />
        <FlatList
          data={popularMoviesList}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.containerGap36}
          renderItem={({ item, index }) => (
            <SubMovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', { movieid: item.id });
              }}
              cardWidth={width / 3}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
        <CategoryHeader title={'Upcoming'} />
        <FlatList
          data={upcomingMoviesList}
          keyExtractor={(item: any) => item.id}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap36}
          renderItem={({ item, index }) => (
            <SubMovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', { movieid: item.id });
              }}
              cardWidth={width / 3}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;
