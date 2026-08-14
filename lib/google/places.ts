// src/lib/google/places.ts
interface GooglePlaceReview {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
}

interface GooglePlaceReviewsResult {
  rating: number | null;
  userRatingCount: number | null;
  reviews: GooglePlaceReview[];
  mapsUrl: string | null;
}

const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

export async function fetchGooglePlaceReviews(): Promise<GooglePlaceReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn('GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set \u2014 skipping Google reviews fetch.');
    return { rating: null, userRatingCount: null, reviews: [], mapsUrl: null };
  }

  const url = new URL(PLACES_API_URL);
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'rating,reviews,user_ratings_total,url');
  url.searchParams.set('key', apiKey);

  try {
    // 24h revalidate \u2014 do not persist review text into Sanity/your own DB;
    // Google Maps Platform ToS restricts long-term storage of Places data.
    const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
    const data = await res.json();

    if (data.status !== 'OK' || !data.result) {
      console.error('Google Places API error:', data.status, data.error_message);
      return { rating: null, userRatingCount: null, reviews: [], mapsUrl: null };
    }

    const result = data.result;

    return {
      rating: typeof result.rating === 'number' ? result.rating : null,
      userRatingCount: typeof result.user_ratings_total === 'number' ? result.user_ratings_total : null,
      // Places API returns a hard max of 5 reviews \u2014 no way around this
      // via API. mapsUrl below is the "see all reviews" link.
      reviews: (result.reviews ?? []).slice(0, 5).map((r: {
        author_name: string;
        profile_photo_url?: string;
        rating: number;
        text: string;
        relative_time_description: string;
      }) => ({
        authorName: r.author_name,
        authorPhotoUrl: r.profile_photo_url,
        rating: r.rating,
        text: r.text,
        relativeTimeDescription: r.relative_time_description,
      })),
      mapsUrl: result.url ?? null,
    };
  } catch (error) {
    console.error('Failed to fetch Google Place reviews:', error);
    return { rating: null, userRatingCount: null, reviews: [], mapsUrl: null };
  }
}