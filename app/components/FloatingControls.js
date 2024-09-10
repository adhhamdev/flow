import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  ChevronUp,
  List,
  Music,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const FloatingControls = ({
  track,
  onViewChange,
  currentView,
  isPlaying,
  onPlayPause,
  onNextTrack,
  onPrevTrack,
  onSeek,
  duration,
  currentTime,
  onToggleRepeat,
  onToggleShuffle,
  isRepeatOn,
  isShuffleOn,
}) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  useEffect(() => {
    setSeekValue(currentTime);
  }, [currentTime]);

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    setIsMuted(newVolume[0] === 0);
    // You might want to propagate this change to the parent component
    // onVolumeChange(newVolume[0]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // You might want to propagate this change to the parent component
    // onMute(!isMuted);
  };

  const toggleView = () => {
    onViewChange(currentView === 'library' ? 'nowPlaying' : 'library');
  };

  const handleSeek = (value) => {
    setSeekValue(value[0]);
    onSeek(value[0]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className='fixed bottom-0 left-0 right-0 p-4 shadow-lg sm:p-6'>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm'>{formatTime(currentTime)}</span>
          <Slider
            min={0}
            max={duration}
            step={1}
            value={[seekValue]}
            onValueChange={handleSeek}
            className='w-full mx-4'
          />
          <span className='text-sm'>{formatTime(duration)}</span>
        </div>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center mb-4 sm:mb-0'>
            <div className='flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-primary/10'>
              <Music className='text-primary' size={24} />
            </div>
            <div className='flex-grow'>
              <h4 className='text-base font-semibold truncate text-primary'>
                {track.name}
              </h4>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Button variant='ghost' size='icon' onClick={onToggleShuffle}>
              <Shuffle
                size={20}
                className={isShuffleOn ? 'text-primary' : ''}
              />
            </Button>
            <Button variant='ghost' size='icon' onClick={onPrevTrack}>
              <SkipBack size={24} />
            </Button>
            <Button
              variant='default'
              size='icon'
              className='mx-2'
              onClick={onPlayPause}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
            <Button variant='ghost' size='icon' onClick={onNextTrack}>
              <SkipForward size={24} />
            </Button>
            <Button variant='ghost' size='icon' onClick={onToggleRepeat}>
              <Repeat size={20} className={isRepeatOn ? 'text-primary' : ''} />
            </Button>
          </div>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <Button variant='ghost' size='icon' onClick={toggleView}>
            {currentView === 'library' ? (
              <ChevronUp size={24} />
            ) : (
              <List size={24} />
            )}
          </Button>
          <div className='flex items-center'>
            <Button variant='ghost' size='icon' onClick={toggleMute}>
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </Button>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={[isMuted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              className='w-24 ml-2'
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FloatingControls;
