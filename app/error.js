'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-red-100'>
      <div className='p-8 bg-white rounded-lg shadow-md'>
        <h2 className='mb-4 text-2xl font-bold text-red-600'>
          Something went wrong!
        </h2>
        <p className='mb-4'>
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={() => reset()}
          className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
          Try again
        </button>
      </div>
    </div>
  );
}
