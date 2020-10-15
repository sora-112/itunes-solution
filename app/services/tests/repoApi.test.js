import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getResults } from '../repoApi';

describe('RepoApi tests', () => {
  const query = 'aaaaaaaaaaaaaaaaa';
  it('should make the api call to "/search?term=', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        "resultCount": 1,
        "results": [
          {
            "wrapperType": "track", "kind": "song", "artistId": 1500214725, "collectionId": 1509510044, "trackId": 1509510177, "artistName": "Brzosko", "collectionName": "Byś - EP", "trackName": "Aaaaaaaaaaaaaaaaa", "collectionCensoredName": "Byś - EP", "trackCensoredName": "Aaaaaaaaaaaaaaaaa", "artistViewUrl": "https://music.apple.com/us/artist/brzosko/1500214725?uo=4", "collectionViewUrl": "https://music.apple.com/us/album/aaaaaaaaaaaaaaaaa/1509510044?i=1509510177&uo=4", "trackViewUrl": "https://music.apple.com/us/album/aaaaaaaaaaaaaaaaa/1509510044?i=1509510177&uo=4",
            "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/24/0c/c4/240cc464-7291-0f4c-aefc-daf86092c79a/mzaf_9169250274577450902.plus.aac.p.m4a", "artworkUrl30": "https://is3-ssl.mzstatic.com/image/thumb/Music113/v4/7e/45/fb/7e45fbc4-4228-d886-8627-8c3b010eaab4/source/30x30bb.jpg", "artworkUrl60": "https://is3-ssl.mzstatic.com/image/thumb/Music113/v4/7e/45/fb/7e45fbc4-4228-d886-8627-8c3b010eaab4/source/60x60bb.jpg", "artworkUrl100": "https://is3-ssl.mzstatic.com/image/thumb/Music113/v4/7e/45/fb/7e45fbc4-4228-d886-8627-8c3b010eaab4/source/100x100bb.jpg", "collectionPrice": 4.95, "trackPrice": 0.99, "releaseDate": "2020-05-02T12:00:00Z", "collectionExplicitness": "explicit", "trackExplicitness": "notExplicit", "discCount": 1, "discNumber": 1, "trackCount": 5, "trackNumber": 5, "trackTimeMillis": 114931, "country": "USA", "currency": "USD", "primaryGenreName": "Hip-Hop/Rap", "isStreamable": true
          }]
      }
    ];
    mock.onGet(`search?term=${query}`).reply(200, data);
    const res = await getResults(query);
    expect(res.data).toEqual(data);
  });
});
