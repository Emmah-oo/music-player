import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, nav, setNav }) => {
  return (
    <div className={`library ${nav ? 'nav-active' : ''}`}>
      <h2>Library</h2>
        <div className="library-songs">
          {songs.map(song => (
            <LibrarySong 
              songs = {songs}
              song = {song}
              id = {song.id}
              setCurrentSong = {setCurrentSong}
              audioRef = {audioRef}
              isPlaying = {isPlaying}
              setSongs = {setSongs}
              key={song.id}
              nav = {nav}
              setNav = {setNav}
            />
          ))}
        </div>
    </div>
  )
}

export default Library