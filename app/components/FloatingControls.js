import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
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
  onVolumeChange,
}) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  useEffect(() => {
    setSeekValue(currentTime);
  }, [currentTime]);

  const handleVolumeChange = (newVolume) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    setIsMuted(volumeValue === 0);
    onVolumeChange(volumeValue);
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    onVolumeChange(newMutedState ? 0 : volume);
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
    <Card className='fixed bottom-0 left-0 right-0 p-4 shadow-lg'>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-xs text-muted-foreground sm:text-sm'>
            {formatTime(currentTime)}
          </span>
          <Slider
            min={0}
            max={duration}
            step={1}
            value={[seekValue]}
            onValueChange={handleSeek}
            className='w-full mx-2 sm:mx-4'
          />
          <span className='text-xs text-muted-foreground sm:text-sm'>
            {formatTime(duration)}
          </span>
        </div>

        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center flex-1 mr-2'>
            <div className='flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-secondary sm:w-12 sm:h-12'>
              <Music className='text-secondary-foreground' size={20} />
            </div>
            <div className='flex-grow max-w-[150px] sm:max-w-none'>
              <h4 className='text-sm font-semibold truncate text-foreground sm:text-base'>
                {track.name}
              </h4>
            </div>
          </div>

          <div className='flex items-center justify-end flex-1'>
            <Button
              variant='ghost'
              size='icon'
              onClick={onToggleShuffle}
              className='hidden sm:inline-flex'>
              <Shuffle
                size={20}
                className={cn(
                  isShuffleOn ? 'text-primary' : 'text-muted-foreground'
                )}
              />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              onClick={onPrevTrack}
              className='mx-1'>
              <SkipBack size={24} />
            </Button>
            <Button
              variant='default'
              size='icon'
              className='mx-2'
              onClick={onPlayPause}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>

            <Button
              variant='ghost'
              size='icon'
              onClick={onNextTrack}
              className='mx-1'>
              <SkipForward size={24} />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              onClick={onToggleRepeat}
              className='hidden sm:inline-flex'>
              <Repeat
                size={20}
                className={cn(
                  isRepeatOn ? 'text-primary' : 'text-muted-foreground'
                )}
              />
            </Button>
          </div>
        </div>

        <div className='flex items-center justify-between'>
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
              className='w-20 ml-2 sm:w-28'
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
export default FloatingControls;
