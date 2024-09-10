import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Folder, Music } from 'lucide-react';

const MusicLibrary = ({
  audioFiles,
  onTrackSelect,
  onFileSelect,
  currentTrack,
}) => {
  const removeFileExtension = (filename) => {
    return filename.replace(/\.[^/.]+$/, '');
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>
          <Music className='inline-block mr-2' />
          Offline Music Player
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onFileSelect} className='w-full mb-4'>
          <Folder className='w-4 h-4 mr-2' /> Select Music Directory
        </Button>
        {audioFiles.length > 0 && (
          <ScrollArea className='h-[300px] w-full rounded-md border p-4'>
            {audioFiles.map((file, index) => (
              <Button
                key={index}
                variant={
                  currentTrack && currentTrack.name === file.name
                    ? 'secondary'
                    : 'ghost'
                }
                className='justify-start w-full mb-2'
                onClick={() => onTrackSelect(file)}>
                <Music className='w-4 h-4 mr-2' />
                <span className='truncate'>
                  {removeFileExtension(file.name)}
                </span>
              </Button>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default MusicLibrary;
