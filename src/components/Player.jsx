import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'
import Song from './Song'

const Player = ({ 
    currentSong,
    setCurrentSong, 
    isPlaying, 
    setIsPlaying, 
    audioRef, 
    songInfo, 
    setSongInfo,
    songs 
  }) => {
  //Access the audio tag selected using useRef and access the play & pause functions
  const playSongHandler = () => {
    if (!isPlaying) {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    }
  }

  //This function formats the time to a usable form
  const timeFormatter = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    )
  }

  //This sets the current time of the song to the value of the range input
  const draggable = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  const skipHandler = (direction) => {
    let currentIdx = songs.indexOf(currentSong);
    if (direction === 'skip-forward') {
      currentIdx = ((currentIdx + 1) % (songs.length))
      setCurrentSong(songs[currentIdx])
    }
    if (direction === 'skip-back' && currentIdx > 0) {
      currentIdx = ((currentIdx -1) % (songs.length))
      setCurrentSong(songs[currentIdx])
    }
  }

  return ( 
    <div className='player'>
      <div className="time-control">
        <p>{timeFormatter(songInfo.currentTime)}</p>
        <input onChange={draggable} type="range" min={0} max={songInfo.duration} value={songInfo.currentTime}/>
        <p>{timeFormatter(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon 
          className='skip-back' 
          size='2x' 
          icon={faAngleLeft} 
          onClick={() => skipHandler('skip-back')}
        />
        <FontAwesomeIcon 
          onClick={playSongHandler} 
          className='play' 
          size='2x' 
          icon={isPlaying ? faPause : faPlay} 
        />
        <FontAwesomeIcon 
          className='skip-forward' 
          size='2x' 
          icon={faAngleRight} 
          onClick={() => skipHandler('skip-forward')}
        />
      </div>
      
    </div>
  )
}

export default Player