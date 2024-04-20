import { useEffect, useState } from 'react'

import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const api = SpotifyApi.withUserAuthorization(
  import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  "http://localhost:5173/callback",
  ["user-read-playback-state", "user-read-currently-playing"]
)

function formatTime(milliseconds) {
  const seconds = milliseconds / 1000;

  const minutes = Math.floor(seconds / 60);

  const remainder = Math.floor(seconds - minutes * 60);
  const seconds_str = (""+ remainder).padStart(2, "0");


  return `${minutes}:${seconds_str}`;
}

async function getCurrentlyPlayingTrack() {
  console.log("tick - getCurrentlyPlayingTrack");

  const now_playing = await api.player.getCurrentlyPlayingTrack();
  if(!now_playing.is_playing) {
    return false;
  }
  const output = {
    "track": now_playing.item.name,
    "album": now_playing.item.album.name,
    "artist": now_playing.item.artists.map(obj => obj.name).join(", "),
    "cover": now_playing.item.album["images"][0].url,
    "time": {
      "current": now_playing.progress_ms,
      "total": now_playing.item.duration_ms,
    }
  }
  return output;
}

function LoadingScreen() {
  return (
    <>
      <h1 id="track">Loading...</h1>
    </>
  )
}

function NowPlaying(props) {
  
  document.body.style.background = "#000 url(" + props.cover + ")";

  const progressWidth = (props.time.current / props.time.total) * 100;

  return (
    <>
      <div id="cover">
        <img src={props.cover} />
      </div>
      <div id="now-playing">
        <h1 id="track">{props.track}</h1>
        <h2 id="album">{props.album}</h2>
        <h2 id="artist">{props.artist}</h2>

        <div id="progress-bar">
          <div id="progress-percent" style={{ width: progressWidth + "%" }}>
          </div>
        </div>
        <div id="progress-time">
          <div id="progress-time-current">
            {formatTime(props.time.current)}
          </div>
          <div id="progress-time-total">
            {formatTime(props.time.total)}
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState({});


  useEffect(() => {
    // console.log("App::useEffect() called");

    const intervalId = setInterval(async () => {
      setNowPlaying(
        await getCurrentlyPlayingTrack()
      );
      if(isLoading) {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);

  }, []);


  if(isLoading) {
    return <LoadingScreen />
  }

  return <NowPlaying {...nowPlaying} />

}

export default App
