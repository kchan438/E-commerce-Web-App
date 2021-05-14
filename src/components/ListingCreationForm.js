import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDescription, setType, setPrice, setTitle, setListings } from '../redux/actions/listingActions';
import axios from 'axios';

const ListingCreationForm = () => {
  const dispatch = useDispatch(); // alerts redux that an actions has changed
  // variables to hold reducer variables
  const description = useSelector(state => state.listingReducer.description);
  const type = useSelector(state => state.listingReducer.type);
  const price = useSelector(state => state.listingReducer.price);
  const title = useSelector(state => state.listingReducer.title);

  // runs when form is submitted
  const submit = () => {
    // holds data from text files
    const formData = {
      description: description,
      type: type,
      price: price,
      title: title
    };

    // sends the form listing to api
    axios.post('/api/createListing', formData)
      .then((response) => {
        console.log(response);
        const itemsArray = response;
        dispatch(setListings(itemsArray));
      })
      .catch((error) => {
        console.log(error);
      });

    // gets the listing from api
    axios.get('/api/viewListings')
      .then((response) => {
        console.log(response);
        const itemsArray = response.data;
        dispatch(setListings(itemsArray));
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div>
      <h1>Create Listing</h1>
      <div>
        Description:
        <input
          id="input-description"
          type="text"
          onChange={e => dispatch(setDescription(e.target.value))}
          value={description} />
      </div>
      <div>
        Type:
        <input
          id="input-type"
          type="text"
          onChange={e => dispatch(setType(e.target.value))}
          value={type} />
      </div>
      <div>
        Price:
        <input
          id="input-price"
          type="number"
          onChange={e => dispatch(setPrice(e.target.value))}
          value={price} />
      </div>
      <div>
        Title:
        <input
          id="input-title"
          type="text"
          onChange={e => dispatch(setTitle(e.target.value))}
          value={title} />
      </div>
      <div>
        <button id="submit" onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default ListingCreationForm;
