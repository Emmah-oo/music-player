import { useState, useRef } from "react";
//IMPORT COMPONENTS
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

//IMPORT STYLES
import './styles/app.scss'

//IMPORT DATA
import data from './util'

function App() {
  //useRef to select the audio tag
  const audioRef = useRef(null)

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })

  //This runs everytime the songs time is moving and it gets the current time and duration
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({...songInfo, currentTime, duration})
  }

  return (
    <div className="App">
      <Song currentSong = {currentSong} />
      <Player
        audioRef = {audioRef} 
        songInfo = {songInfo}
        setSongInfo = {setSongInfo}
        isPlaying = {isPlaying} 
        setIsPlaying = {setIsPlaying} 
        currentSong = {currentSong} 
      />
      <Library 
        songs = {songs}
        setSongs = {setSongs} 
        setCurrentSong = {setCurrentSong} 
        audioRef = {audioRef}
        isPlaying = {isPlaying}
      />
      <audio 
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef} 
        src= {currentSong.audio}>
      </audio>
    </div>
  );
}

export default App;
