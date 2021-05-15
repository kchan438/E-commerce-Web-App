import React from 'react';
import { useDispatch } from 'react-redux';
import { setInquiries } from '../redux/actions/inquiryActions';
import { setListings } from '../redux/actions/listingActions';
import axios from 'axios';
import { Link } from 'react-router-dom'; // links to individual product pages
import './Listing.css';

// a single listing
const Listing = ({ listing, userMode }) => {
  const dispatch = useDispatch(); // alerts redux that an actions has changed
  const [message, setMessage] = React.useState(''); // from classwork 4 to change message box

  // holds listing prop variables
  let singleListing = {
    description: '',
    type: '',
    price: '',
    title: '',
    imageFile: '',
    id: '',
    mongoID: ''
  };

  // if listing is not undefined, set variable to passed in prop variables
  if (listing !== undefined) {
    singleListing = {
      description: listing.data.description,
      type: listing.data.type,
      price: listing.data.price,
      title: listing.data.title,
      imageFile: listing.data.imageFile,
      id: listing.data.id,
      mongoID: listing._id
    };
  }

  // used for rendering for admin or user
  let setMode = false;
  if (userMode === true) setMode = true;


  // sends the inquiry using api call
  const sendInquire = () => {
    const formData = {
      message: message,
      buyerID: '' // get id from logged in user
    };

    console.log(formData);

    axios.post(`/messanger/makeInquiry?listingId=${singleListing.mongoID}`, formData)
      .then(function (response) {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // if usermode is user, render text box for inquiring about listing
  const renderUser = () => {
    return (
      <div>
        <textarea
          type="text"
          id={singleListing.id}
          onChange={e => setMessage(e.target.value)}
          value={message} />
        <button className="submit" onClick={sendInquire}>Send</button>
      </div>
    );
  };

  // deletes a listing and sets the array of listings to the new array
  const deleteListing = () => {
    axios.get(`/api/deleteListing?id=${singleListing.mongoID}`)
      .then((response) => {
        console.log(response);
        dispatch(setListings(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // gets inquiries from a listing and sets it to array in reducer
  const viewInquire = () => {
    axios.get(`/messanger/getInquiries?listingId=${singleListing.mongoID}`)
      .then((response) => {
        console.log(response);
        dispatch(setInquiries(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // renders buttons for admin
  const renderAdmin = () => {
    return (
      <div>
        <button onClick={deleteListing}>Delete</button>
        <button onClick={viewInquire}>View Inquiries</button>
      </div>
    );
  };

  // formatted and added listing image
  return (
    <Link className='link' to={`/product/${singleListing.mongoID}`/* links to product page using product name */}>
      <div className="card">
        <img alt="" src={singleListing.imageFile}/>
        <table className="listing">
          <tbody>
            <tr>
              <td>Title: </td>
              <td>{singleListing.title}</td>
            </tr>
            <tr>
              <td>Description: </td>
              <td>{singleListing.description}</td>
            </tr>
            <tr>
              <td>Type: </td>
              <td>{singleListing.type}</td>
            </tr>
            <tr>
              <td>Price: </td>
              <td>{singleListing.price}</td>
            </tr>
          </tbody>
        </table>
        {setMode ? (renderUser()) : (renderAdmin())}
      </div>
    </Link>
  );
};

export default Listing;