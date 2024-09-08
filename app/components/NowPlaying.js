import { FiMusic } from 'react-icons/fi';

const NowPlaying = ({ track }) => {
  if (!track) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center h-full p-4 bg-gradient-to-b from-purple-100 to-blue-100'>
      <div className='flex items-center justify-center w-48 h-48 mb-6 bg-purple-200 rounded-full sm:w-64 sm:h-64 sm:mb-8'>
        <FiMusic className='text-purple-600' size={48} />
      </div>
      <h2 className='mb-2 text-xl font-bold text-center text-purple-800 sm:text-2xl'>
        {track.name}
      </h2>
      <p className='text-sm text-purple-600 sm:text-base'>Now Playing</p>
    </div>
  );
};

export default NowPlaying;
