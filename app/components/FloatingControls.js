import { useEffect, useRef, useState } from 'react';
import {
  FiChevronUp,
  FiList,
  FiMusic,
  FiPause,
  FiPlay,
  FiSkipBack,
  FiSkipForward,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi';

const FloatingControls = ({ track, onViewChange, currentView }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.load();
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 10,
      0
    );
  };

  const skipForward = () => {
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 10,
      duration
    );
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleView = () => {
    onViewChange(currentView === 'library' ? 'nowPlaying' : 'library');
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white shadow-lg'>
      <audio ref={audioRef} />
      <div className='flex items-center justify-between p-2'>
        <div className='flex items-center flex-grow'>
          <div className='flex items-center justify-center w-12 h-12 mr-3 bg-purple-100 rounded-full'>
            <FiMusic className='text-purple-600' size={24} />
          </div>
          <div className='flex-grow mr-2'>
            <h4 className='font-semibold text-purple-800 truncate'>
              {track.name}
            </h4>
            <div className='flex items-center'>
              <span className='mr-2 text-xs text-gray-500'>
                {formatTime(currentTime)}
              </span>
              <div className='flex-grow h-1 bg-gray-200 rounded-full'>
                <div
                  className='h-1 bg-purple-600 rounded-full'
                  style={{ width: `${(currentTime / duration) * 100}%` }}></div>
              </div>
              <span className='ml-2 text-xs text-gray-500'>
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <button
            onClick={skipBackward}
            className='p-2 text-purple-800 rounded-full hover:bg-purple-100'>
            <FiSkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className='p-3 mx-2 text-white bg-purple-600 rounded-full hover:bg-purple-700'>
            {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
          </button>
          <button
            onClick={skipForward}
            className='p-2 text-purple-800 rounded-full hover:bg-purple-100'>
            <FiSkipForward size={20} />
          </button>
        </div>
      </div>
      <div className='flex items-center justify-between p-2 bg-purple-50'>
        <button
          onClick={toggleView}
          className='text-purple-800 hover:text-purple-600'>
          {currentView === 'library' ? (
            <FiChevronUp size={24} />
          ) : (
            <FiList size={24} />
          )}
        </button>
        <div className='flex items-center'>
          <button
            onClick={toggleMute}
            className='p-2 text-purple-800 rounded-full hover:bg-purple-100'>
            {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
          </button>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className='w-20 input-range'
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingControls;
