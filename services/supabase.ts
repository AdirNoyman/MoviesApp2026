import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      // Disable auth persistence since we're not using authentication
      persistSession: false,
      // Disable auto token refresh
      autoRefreshToken: false,
      // Disable URL-based session detection
      detectSessionInUrl: false,
    },
  }
);

// Track the searches made by the user
export const logSearch = async (query: string, movie: Movie) => {
  // Check if a record for this search term and movie already exists
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .eq('searchTerm', query)
    .eq('movieId', movie.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking existing search log:', error);
    return;
  }

  console.log("Data returned from db 👉", data)

  if (data) {
    // If it exists, update the count
    const { error: updateError } = await supabase
      .from('metrics')
      .update({ countSearches: data.countSearches + 1 })
      .eq('searchTerm', query)
      .eq('movieId', movie.id);

    if (updateError) {
      console.error('Error updating search log:', updateError);
    } else {
      console.log(`✓ Updated search count for "${query}" to ${data.countSearches + 1}`);
    }
  } else {
    // If it doesn't exist, insert a new record
    const { error: insertError } = await supabase.from('metrics').insert({
      searchTerm: query,
      movieId: movie.id,
      movieTitle: movie.title,
      countSearches: 1,
      posterUrl: movie.poster_path,
    });

    if (insertError) {
      console.error('Error inserting search log:', insertError);
    } else {
      console.log(`✓ Created new search log for "${query}"`);
    }
  }
};
