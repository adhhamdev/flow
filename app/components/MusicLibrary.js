import { FiFolder, FiMusic } from 'react-icons/fi';

const MusicLibrary = ({ audioFiles, onTrackSelect, onFileSelect }) => {
  return (
    <div className='p-4'>
      <h1 className='mb-6 text-3xl font-bold text-center text-purple-800'>
        <FiMusic className='inline-block mr-2' />
        Offline Music Player
      </h1>
      <button
        onClick={onFileSelect}
        className='flex items-center justify-center w-full p-3 mb-6 text-white transition-colors bg-purple-600 rounded-lg shadow-md hover:bg-purple-700'>
        <FiFolder className='mr-2' />
        Select Music Directory
      </button>
      {audioFiles.length > 0 && (
        <div>
          <h2 className='mb-4 text-2xl font-semibold text-purple-700'>
            Your Music
          </h2>
          <ul className='space-y-2'>
            {audioFiles.map((file, index) => (
              <li
                key={index}
                onClick={() => onTrackSelect(file)}
                className='flex items-center p-3 transition-colors bg-white rounded-lg shadow-sm cursor-pointer hover:bg-purple-50'>
                <FiMusic className='mr-3 text-purple-600' />
                <span className='text-gray-800 truncate'>{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MusicLibrary;
