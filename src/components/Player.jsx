import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'
import { audioPlay } from '../util'

const Player = ({ 
  currentSong,
  setCurrentSong, 
  isPlaying, 
  setIsPlaying, 
  audioRef, 
  songInfo, 
  setSongInfo,
  songs,
  setSongs,
}) => {
  useEffect(() => {
    const newSong = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song, 
          active: true,
        }
      } else {
          return {
            ...song, 
            active: false,
          }
        }
      })
      setSongs(newSong)
  }, [currentSong])
  
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
    audioPlay(isPlaying, audioRef)
    //Gets index of current song
    let currentIdx = songs.findIndex(song => song.id === currentSong.id);
    // let currentIdx = songs.indexof(currentSong)
    //sets the current index to the rem of the current index + 1 / by the length of the song array
    if (direction === 'skip-forward') {
      currentIdx = ((currentIdx + 1) % (songs.length))
      setCurrentSong(songs[currentIdx])
    }
    if (direction === 'skip-back') {
      //if the rem of currIdx - 1 / by the length of the song array is -1, perform 
      //set the currentSong to length of the song array - 1
      if ((currentIdx - 1) % (songs.length) === - 1) { 
        setCurrentSong(songs[songs.length - 1 ]) 
        return; 
      }
      //sets the current index to the rem of the current index - 1 and the length of the song array
      currentIdx = ((currentIdx -1) % (songs.length))
      setCurrentSong(songs[currentIdx])
    }
  }

  return ( 
    <div className='player'>
      <div className="time-control">
        <p>{timeFormatter(songInfo.currentTime)}</p>
        <input onChange={draggable} type="range" min={0} max={songInfo.duration || 0} value={songInfo.currentTime}/>
        <p>{songInfo.duration ? timeFormatter(songInfo.duration) : '0:00'}</p>
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