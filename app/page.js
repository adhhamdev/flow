'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import FloatingControls from './components/FloatingControls';
import MusicLibrary from './components/MusicLibrary';
import NowPlaying from './components/NowPlaying';

export default function Home() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [view, setView] = useState('library');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const handleFileSelect = useCallback(async () => {
    try {
      const files = [];
      if (window.showDirectoryPicker) {
        const dirHandle = await window.showDirectoryPicker();
        for await (const entry of dirHandle.values()) {
          if (entry.kind === 'file' && entry.name.match(/\.(mp3|wav|ogg)$/i)) {
            const file = await entry.getFile();
            files.push({
              name: file.name,
              url: URL.createObjectURL(file),
            });
          }
        }
        setAudioFiles(files);
      } else {
        const inputEl = document.createElement('input');
        inputEl.type = 'file';
        inputEl.multiple = true;
        inputEl.accept = 'audio/*';
        inputEl.click();
        inputEl.onchange = (ev) => {
          for (const entry of ev.target.files) {
            const file = entry;
            files.push({
              name: file.name,
              url: URL.createObjectURL(file),
            });
          }
          setAudioFiles(files);
        };
      }
    } catch (error) {
      console.error('Error selecting directory:', error);
      throw new Error('Failed to select directory. Please try again.');
    }
  }, []);

  const handleTrackSelect = useCallback((track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNextTrack = useCallback(() => {
    if (isShuffleOn) {
      const randomIndex = Math.floor(Math.random() * audioFiles.length);
      setCurrentTrack(audioFiles[randomIndex]);
    } else {
      const currentIndex = audioFiles.findIndex(
        (file) => file.name === currentTrack.name
      );
      const nextIndex = (currentIndex + 1) % audioFiles.length;
      setCurrentTrack(audioFiles[nextIndex]);
    }
    setIsPlaying(true);
    setCurrentTime(0);
  }, [audioFiles, currentTrack, isShuffleOn]);

  const handlePrevTrack = useCallback(() => {
    if (isShuffleOn) {
      const randomIndex = Math.floor(Math.random() * audioFiles.length);
      setCurrentTrack(audioFiles[randomIndex]);
    } else {
      const currentIndex = audioFiles.findIndex(
        (file) => file.name === currentTrack.name
      );
      const prevIndex =
        (currentIndex - 1 + audioFiles.length) % audioFiles.length;
      setCurrentTrack(audioFiles[prevIndex]);
    }
    setIsPlaying(true);
    setCurrentTime(0);
  }, [audioFiles, currentTrack, isShuffleOn]);

  const handleSeek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleToggleRepeat = useCallback(() => {
    setIsRepeatOn((prev) => !prev);
  }, []);

  const handleToggleShuffle = useCallback(() => {
    setIsShuffleOn((prev) => !prev);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
      };

      const handleEnded = () => {
        if (isRepeatOn) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        } else {
          handleNextTrack();
        }
      };

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener(
            'loadedmetadata',
            handleLoadedMetadata
          );
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [handleNextTrack, isRepeatOn]);

  return (
    <main className='flex flex-col h-screen bg-gradient-to-b from-blue-100 to-purple-100'>
      <div className='flex-grow overflow-y-auto'>
        {view === 'library' ? (
          <MusicLibrary
            audioFiles={audioFiles}
            onTrackSelect={handleTrackSelect}
            onFileSelect={handleFileSelect}
            currentTrack={currentTrack}
          />
        ) : (
          <NowPlaying track={currentTrack} />
        )}
      </div>
      {currentTrack && (
        <>
          <audio ref={audioRef} src={currentTrack.url} />
          <FloatingControls
            track={currentTrack}
            onViewChange={setView}
            currentView={view}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNextTrack={handleNextTrack}
            onPrevTrack={handlePrevTrack}
            onSeek={handleSeek}
            duration={duration}
            currentTime={currentTime}
            onToggleRepeat={handleToggleRepeat}
            onToggleShuffle={handleToggleShuffle}
            isRepeatOn={isRepeatOn}
            isShuffleOn={isShuffleOn}
            onVolumeChange={handleVolumeChange}
          />
        </>
      )}
    </main>
  );
}
