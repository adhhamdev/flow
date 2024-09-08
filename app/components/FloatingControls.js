import { useState } from 'react';
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

const FloatingControls = ({
  track,
  onViewChange,
  currentView,
  isPlaying,
  onPlayPause,
  onNextTrack,
  onPrevTrack,
}) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    // You might want to propagate this change to the parent component
    // onVolumeChange(newVolume);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // You might want to propagate this change to the parent component
    // onMute(!isMuted);
  };

  const toggleView = () => {
    onViewChange(currentView === 'library' ? 'nowPlaying' : 'library');
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg sm:p-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center mb-4 sm:mb-0'>
          <div className='flex items-center justify-center w-12 h-12 mr-4 bg-purple-100 rounded-full'>
            <FiMusic className='text-purple-600' size={24} />
          </div>
          <div className='flex-grow'>
            <h4 className='text-base font-semibold text-purple-800 truncate'>
              {track.name}
            </h4>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <button
            onClick={onPrevTrack}
            className='p-3 text-purple-800 rounded-full hover:bg-purple-100'>
            <FiSkipBack size={28} />
          </button>
          <button
            onClick={onPlayPause}
            className='p-4 mx-3 text-white bg-purple-600 rounded-full hover:bg-purple-700'>
            {isPlaying ? <FiPause size={32} /> : <FiPlay size={32} />}
          </button>
          <button
            onClick={onNextTrack}
            className='p-3 text-purple-800 rounded-full hover:bg-purple-100'>
            <FiSkipForward size={28} />
          </button>
        </div>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <button
          onClick={toggleView}
          className='text-purple-800 hover:text-purple-600'>
          {currentView === 'library' ? (
            <FiChevronUp size={28} />
          ) : (
            <FiList size={28} />
          )}
        </button>
        <div className='flex items-center'>
          <button
            onClick={toggleMute}
            className='p-3 text-purple-800 rounded-full hover:bg-purple-100'>
            {isMuted ? <FiVolumeX size={28} /> : <FiVolume2 size={28} />}
          </button>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className='w-24 ml-2'
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingControls;
