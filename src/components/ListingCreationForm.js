import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDescription, setType, setPrice, setTitle, setListings } from '../redux/actions/listingActions';
import axios from 'axios';
import './ListingCreationForm.css';

const ListingCreationForm = () => {
  const dispatch = useDispatch(); // alerts redux that an actions has changed
  // variables to hold reducer variables
  const description = useSelector(state => state.listingReducer.description);
  const type = useSelector(state => state.listingReducer.type);
  const price = useSelector(state => state.listingReducer.price);
  const title = useSelector(state => state.listingReducer.title);

  // runs when form is submitted
  const submit = () => {

    // form that holds listing information
    let productImage = document.getElementById("productImage");
    let formData = new FormData();
    formData.append("imageFile", productImage.files[0]);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("title", title);

    // sends the form listing to api
    axios.post('/api/createListing', formData, { headers: { 'content-type': "multipart/form-data" } })
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
    document.getElementById('input-description').value = '';
    document.getElementById('input-type').value = '';
    document.getElementById('input-price').value = '';
    document.getElementById('input-title').value = '';
  };

  return (
    <div>
      <h1>Create Listing</h1>
      <div>
        <label>Title:</label>
        <input
          id="input-title"
          type="text"
          onChange={e => dispatch(setTitle(e.target.value))}
          value={title} />
      </div>
      <div>
        <label>Description:</label>
        <input
          id="input-description"
          type="text"
          onChange={e => dispatch(setDescription(e.target.value))}
          value={description} />
      </div>
      <div>
        <label>Type:</label>
        <input
          id="input-type"
          type="text"
          onChange={e => dispatch(setType(e.target.value))}
          value={type} />
      </div>
      <div>
        <label>Price:</label>
        <input
          id="input-price"
          type="number"
          onChange={e => dispatch(setPrice(e.target.value))}
          value={price} />
      </div>
      <div>
        <input type="file" id="productImage" accept="image/jpg,image/jpeg,image/png" />
      </div>
      <div>
        <button id="submit" onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default ListingCreationForm;
