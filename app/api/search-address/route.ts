import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';  // Import UUID function

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get('searchQuery'); // Get search query from query parameters
  const accessToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN; // Mapbox access token
  const sessionToken = uuidv4();
//https://api.mapbox.com/geocoding/v5/mapbox.places/Kalutara%20railway%20station.json?access_token=pk.eyJ1Ijoia3VzYWwxOTk0IiwiYSI6ImNtOGoxa2dlODBpbDUyanE5YXMwczlpdHQifQ.aKWNY-BPKG34svkAedxRXg&country=A
  if (!searchQuery) {
    return NextResponse.json({ error: 'No search query provided' }, { status: 400 });
  }
//https://api.mapbox.com/geocoding/v5/mapbox.places/{searchQuery}.json?access_token={accessToken}&limit=10
//`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${accessToken}&types=place&limit=10`,

//
// ``,
//https://api.mapbox.com/search/searchbox/v1/suggest?q=kalutara&access_token=pk.eyJ1Ijoia3VzYWwxOTk0IiwiYSI6ImNtOGoxa2dlODBpbDUyanE5YXMwczlpdHQifQ.aKWNY-BPKG34svkAedxRXg
  try {
    const response = await fetch(
       `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(searchQuery)}&access_token=${accessToken}&session_token=${sessionToken}&country=AU`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Mapbox API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error:any) {
    return NextResponse.json({ error: error.message || 'Error fetching autocomplete suggestions' }, { status: 500 });
  }
}
