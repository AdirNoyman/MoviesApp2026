import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch movies with empty query to show all movies
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchTerm }), false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard {...item} keyExtractor={(item) => item.id.toString()} />
        )}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className='my-5'>
              <SearchBar
                placeholder='Search movies...'
                value={searchTerm}
                onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
              />
            </View>
            {loading && (
              <ActivityIndicator size='large' color='#000ff' className='my-3' />
            )}
            {error && (
              <Text className='text-red-500 px-5 my-3'>
                Error fetching movies: {error.message}
              </Text>
            )}
            {!loading && !error && searchTerm.trim() && movies?.length > 0 && (
              <Text className='text-md text-white font-bold'>
                Search results for{' '}
                <Text className='text-accent'>{searchTerm}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchTerm.trim()
                  ? `No results found for "${searchTerm}".`
                  : 'Start typing to search for movies.'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};
export default Search;
