import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, nav, setNav, setSongs }) => {
  return (
    <div className={`library ${nav ? 'nav-active' : ''}`}>
      <h2>Library</h2>
        <div className="library-songs">
          {songs.map(song => (
            <LibrarySong 
              song = {song}
              setCurrentSong = {setCurrentSong}
              audioRef = {audioRef}
              isPlaying = {isPlaying}
              key={song.id}
              nav = {nav}
              setNav = {setNav}
              songs = {songs}
              id = {songs.id}
              setSongs = {setSongs}
            />
          ))}
        </div>
    </div>
  )
}

export default Library