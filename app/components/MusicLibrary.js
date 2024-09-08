import { motion } from 'framer-motion';
import { FiFolder, FiMusic } from 'react-icons/fi';

const MusicLibrary = ({
  audioFiles,
  onTrackSelect,
  onFileSelect,
  currentTrack,
}) => {
  return (
    <div className='p-4'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-6 text-3xl font-bold text-center text-purple-800'>
        <FiMusic className='inline-block mr-2' />
        Offline Music Player
      </motion.h1>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onFileSelect}
        className='flex items-center justify-center w-full p-3 mb-6 text-white transition-colors bg-purple-600 rounded-lg shadow-md hover:bg-purple-700'>
        <FiFolder className='mr-2' />
        Select Music Directory
      </motion.button>
      {audioFiles.length > 0 && (
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mb-4 text-2xl font-semibold text-purple-700'>
            Your Music
          </motion.h2>
          <ul className='space-y-2'>
            {audioFiles.map((file, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, backgroundColor: '#F3E8FF' }}
                onClick={() => onTrackSelect(file)}
                className={`flex items-center p-3 transition-colors bg-white rounded-lg shadow-sm cursor-pointer ${
                  currentTrack && currentTrack.name === file.name
                    ? 'bg-purple-100'
                    : ''
                }`}>
                <FiMusic className='mr-3 text-purple-600' />
                <span className='text-gray-800 truncate'>{file.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MusicLibrary;
