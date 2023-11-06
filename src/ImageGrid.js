import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './styles.css';

const ImageGrid = ({ images }) => {
  const [imageList, setImageList] = useState(images);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedImages = [...imageList];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

    setImageList(updatedImages);
  };

  const handleToggleMark = (id) => {
    const updatedImages = imageList.map((image) =>
      image.id === id ? { ...image, marked: !image.marked } : image
    );
    setImageList(updatedImages);
  };

  const handleDeleteMarked = () => {
    const updatedImages = imageList.filter((image) => !image.marked);
    setImageList(updatedImages);
  };

  return (
    <div>
      <h3>Gallery</h3><hr />
      <button className='delete-button' onClick={handleDeleteMarked}>Delete Marked Images</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="image-grid" direction="horizontal">
          {(provided) => (
            <div className='grid-container' {...provided.droppableProps} ref={provided.innerRef}>
              {imageList.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      className='item'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={image.src} alt='img' />
                      <button className='select-button' onClick={() => handleToggleMark(image.id)}>
                        {image.marked ? 'Unmark' : 'Mark'}
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <input type='file' id='file' />
              <label for='file'>Add Images</label>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGrid;