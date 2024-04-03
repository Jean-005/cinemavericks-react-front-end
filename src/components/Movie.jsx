import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating'; 
import ReviewList from './ReviewList';
import pic from "../assets/images/Whiplash.jpg";

const Movie = ( {postReview} ) => {
  const movie = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [rating, setRating] = useState(0); 
  const [stateReview, setStateReview] = useState(
    {
        "title": "",
        "content": "",
        "rating": "",
        "movieId": movie.id,
        "userId": 1
    }
  );

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
    const copiedStateReview = {...stateReview};
    copiedStateReview.content = event.target.value;
    setStateReview(copiedStateReview);
  };

  const handleReviewTitleChange = (event) => {
    setReviewTitle(event.target.value);
    const copiedStateReview = {...stateReview};
    copiedStateReview.title = event.target.value;
    setStateReview(copiedStateReview);
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
    const copiedStateReview = {...stateReview};
    copiedStateReview.rating = newRating;
    setStateReview(copiedStateReview);
  };

  const handleModalSubmit = (event) => {
    event.preventDefault();
    console.log(stateReview);
    postReview(stateReview);
    handleModalClose();
  };

  const imageFileName = movie.title.split(" ").join("");
  const pathToImage = require(`../assets/images/${imageFileName}.jpg`);

  return (
    <div>
      {movie ? (
        <div>
          <img className='picture' src={pathToImage} alt="picture" />
          <h2>{movie.title}</h2>
          <p>Duration: {movie.duration} minutes</p>
          <p>Director: {movie.director}</p>
          <p>Genre: {movie.genres.map(genre => genre.genreEnum).join(', ')}</p>
          <p>Release Year: {movie.year}</p>
          <ReviewList reviews={movie.reviews}/>
          <Button variant="outlined" onClick={handleModalOpen}>
            Add New Review
          </Button>
          <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="md">
            <DialogTitle>Add New Review</DialogTitle>
            <IconButton aria-label="close" onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <TextField
                label="Review Title"
                value={reviewTitle}
                onChange={handleReviewTitleChange}
                fullWidth
              />
              <TextField
                label="Write your review here"
                multiline
                rows={4}
                value={reviewText}
                onChange={handleReviewChange}
                fullWidth
              />
              <Rating
                name="rating"
                value={rating}
                onChange={handleRatingChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button onClick={handleModalSubmit}>Submit Review</Button>
            </DialogActions>
          </Dialog>
        </div>
        
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Movie;
