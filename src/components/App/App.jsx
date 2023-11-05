import { useState, useEffect } from 'react';
import * as API from '../../services/PixabayApi';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    // Method for getting and adding images to the state
    async function addImages() {
      try {
        // Set boot flag
        setIsLoading(true);

        // Get the data using the API request to Pixabay
        const data = await API.getImages(searchName, currentPage);

        if (data.hits.length === 0) {
          // If no images are found, display a message
          return toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        // Normalise the obtained images
        const normalizedImages = API.normalizedImages(data.hits);
        // Add new images to existing images
        setImages(prevImages => [...prevImages, ...normalizedImages]);
        // Reset the boot flag
        setIsLoading(false);
        // Calculate the total number of pages
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch {
        // If there is an error, print a message
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchName, currentPage]);

  // Method for loading additional images by incrementing the current page number
  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  // Method for handling the submission of the search form
  const handleSubmit = query => {
    setSearchName(query); // Set the entered query to the state

    setImages([]); // Clear the array with images

    setCurrentPage(1); // Reset the current page number to the first page number
  };

  return (
    <div>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p
          style={{
            marginTop: 150,
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Image gallery is empty...
        </p>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        // Button for downloading additional images
        <Button onClick={loadMore} />
      )}
    </div>
  );
};

export default App;
