import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

// Close the modal window by pressing Escape key
const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose(); ; // Close the modal window when the Escape key is pressed
      }
    };

    // Add key press event handler
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';


    // Delete the keystroke event handler
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

// Handler for clicking on the modal window background
const handleBackdropClick = event => {
  if (event.currentTarget === event.target) {
    onClose(); 
  }
};

return createPortal(
  <Overlay onClick={handleBackdropClick}>
    <ModalWindow>
      <img src={largeImageURL} alt={tags} />
    </ModalWindow>
  </Overlay>,
  modalRoot
);
};
 
  Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  
  export default Modal;