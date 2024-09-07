import { FiMusic } from 'react-icons/fi';

const NowPlaying = ({ track }) => {
  if (!track) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center h-full p-4 bg-gradient-to-b from-purple-100 to-blue-100'>
      <div className='flex items-center justify-center w-64 h-64 mb-8 bg-purple-200 rounded-full'>
        <FiMusic className='text-purple-600' size={64} />
      </div>
      <h2 className='mb-2 text-2xl font-bold text-center text-purple-800'>
        {track.name}
      </h2>
      <p className='text-purple-600'>Now Playing</p>
    </div>
  );
};

export default NowPlaying;
