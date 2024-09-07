'use client';

import { useCallback, useState } from 'react';
import FloatingControls from './components/FloatingControls';
import MusicLibrary from './components/MusicLibrary';
import NowPlaying from './components/NowPlaying';

export default function Home() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [view, setView] = useState('library'); // 'library' or 'nowPlaying'

  const handleFileSelect = useCallback(async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const files = [];
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file' && entry.name.endsWith('.mp3')) {
          const file = await entry.getFile();
          files.push({
            name: file.name,
            url: URL.createObjectURL(file),
          });
        }
      }
      setAudioFiles(files);
    } catch (error) {
      console.error('Error selecting directory:', error);
      throw new Error('Failed to select directory. Please try again.');
    }
  }, []);

  return (
    <main className='flex flex-col h-screen bg-gradient-to-b from-blue-100 to-purple-100'>
      <div className='flex-grow overflow-y-auto'>
        {view === 'library' ? (
          <MusicLibrary
            audioFiles={audioFiles}
            onTrackSelect={setCurrentTrack}
            onFileSelect={handleFileSelect}
          />
        ) : (
          <NowPlaying track={currentTrack} />
        )}
      </div>
      {currentTrack && (
        <FloatingControls
          track={currentTrack}
          onViewChange={setView}
          currentView={view}
        />
      )}
    </main>
  );
}
