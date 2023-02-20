import React from 'react'

const LibrarySong = ({ 
    songs, 
    song, 
    setCurrentSong, 
    audioRef, 
    isPlaying, 
    setSongs, 
    id 
}) => {
    const handleSongSelect = () => {
        setCurrentSong(song)
        // const newSong = songs.map((song) => {
        //     if (song.id === id) {
        //         return {
        //             ...song, 
        //             active: true,
        //         }
        //     } else {
        //         return {
        //             ...song, 
        //             active: false,
        //         }
        //     }
        // })
        // setSongs(newSong)

        if (isPlaying) {
            const playPromise = audioRef.current.play()
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play()
                })
            }
        }    
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