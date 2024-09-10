import { Card, CardContent } from '@/components/ui/card';
import { Music } from 'lucide-react';

const NowPlaying = ({ track }) => {
  if (!track) {
    return null;
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardContent className='flex flex-col items-center justify-center p-6'>
        <div className='flex items-center justify-center w-48 h-48 mb-6 rounded-full bg-secondary sm:w-64 sm:h-64'>
          <Music className='text-secondary-foreground' size={64} />
        </div>
        <h2 className='mb-2 text-2xl font-bold text-center text-foreground'>
          {track.name}
        </h2>
        <p className='text-sm text-muted-foreground'>Now Playing</p>
      </CardContent>
    </Card>
  );
};
export default NowPlaying;
