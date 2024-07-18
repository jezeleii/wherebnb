'use client';

import { PuffLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="
        h-[70vh]
        flex
        flex-col
        justify-center
        items-center
    ">
        <PuffLoader color="#002B69" size={150} />
    </div>
  )
}

export default Loader;