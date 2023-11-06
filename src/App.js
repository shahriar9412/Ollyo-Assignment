import React from 'react';
import ImageGrid from './ImageGrid';
import images from './images.json';

function App() {
  return (
    <div>
      <ImageGrid images={images} />
    </div>
  );
}

export default App;
