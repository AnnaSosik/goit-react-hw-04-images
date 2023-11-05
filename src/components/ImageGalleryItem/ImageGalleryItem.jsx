import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

// Stores the state of the modal window (open or closed)
const ImageItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  // Method for switching the state of the modal window
  const toggleModal = () => {
    setShowModal(prevModal => !prevModal);
  };

  return (
    <>
      <Item>
        <Img
          src={image.webformatURL} //URL of the small image
          alt={image.tags} //Image Tags
          onClick={toggleModal} //Click handler for opening a modal window
        />
        {showModal && ( //If showModal is true, display the modal window
          <Modal
            largeImageURL={image.largeImageURL} //URL of a large image
            tags={image.tags} //Image Tags
            onClose={toggleModal} //Handler for closing a modal window
          />
        )}
      </Item>
    </>
  );
};

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;
