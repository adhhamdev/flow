import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { Folder, Music, Pause, Play } from 'lucide-react';
import { useState } from 'react';

const MusicLibrary = ({
  audioFiles,
  onTrackSelect,
  onFileSelect,
  currentTrack,
}) => {
  const [expandedTrack, setExpandedTrack] = useState(null);

  const removeFileExtension = (filename) => {
    return filename.replace(/\.[^/.]+$/, '');
  };

  const handleTrackClick = (file) => {
    onTrackSelect(file);
    setExpandedTrack(file.name);
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-2xl font-bold text-center'>
          <Music className='inline-block mr-2' />
          My Music
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-2'>
        <Button onClick={onFileSelect} className='w-full mb-4'>
          <Folder className='w-4 h-4 mr-2' /> Add Music
        </Button>
        {audioFiles.length > 0 && (
          <ScrollArea className='h-[400px] w-full rounded-md'>
            <AnimatePresence>
              {audioFiles.map((file, index) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className='mb-2 last:mb-0'>
                  <Button
                    variant='ghost'
                    className={`justify-between w-full py-6 hover:bg-accent ${
                      currentTrack && currentTrack.name === file.name
                        ? 'bg-secondary'
                        : ''
                    }`}
                    onClick={() => handleTrackClick(file)}>
                    <div className='flex items-center'>
                      <div className='flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-muted'>
                        <Music className='w-5 h-5 text-muted-foreground' />
                      </div>
                      <div className='flex flex-col items-start'>
                        <span className='font-semibold'>
                          {removeFileExtension(file.name)}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                          Unknown Artist
                        </span>
                      </div>
                    </div>
                    {currentTrack && currentTrack.name === file.name ? (
                      <Pause className='flex-shrink-0 w-6 h-6' />
                    ) : (
                      <Play className='flex-shrink-0 w-6 h-6' />
                    )}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default MusicLibrary;
