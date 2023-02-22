import React from 'react'
import { audioPlay } from '../util'

const LibrarySong = ({ 
    song, 
    setCurrentSong, 
    audioRef, 
    isPlaying, 
    nav,
    setNav,
    songs,
    id,
    setSongs
}) => {

    const handleSongSelect = () => {
        setCurrentSong(song)
        // const newSong = songs.map((song) => {
        //     if (song.id === id) {
        //       return {
        //         ...song, 
        //         active: true,
        //       }
        //     } else {
        //         return {
        //           ...song, 
        //           active: false,
        //         }
        //       }
        //     })
        //     setSongs(newSong)
        audioPlay(isPlaying, audioRef)
        setNav(!nav)
    }

    return (
    <div 
        onClick={handleSongSelect} 
        className={`library-song ${song.active ? 'active' : ''}`}
    >
        <img src={song.cover} alt={song.name} />
        <div className="library-details">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
    </div>
  )
}

export default LibrarySong