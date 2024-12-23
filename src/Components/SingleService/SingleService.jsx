import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import DatePicker from "react-datepicker";

const SingleService = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [rating, setRating] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
// console.log(rating)
  const {
    title,
    description,
    category,
    price,
    image,
    company,
    date,
    email,
    website,
  } = service;

  useEffect(() => {
    fetchSingleData();
  }, []);

  const fetchSingleData = async () => {
    const { data } = await axios.get(`http://localhost:5000/service/${id}`);
    setService(data);
  };

  return (
    <div className="flex gap-4 mx-auto items-center justify-center bg-lime-100 py-6">
        <div className="card lg:card-side bg-red-200 shadow-xl">
          <div className="card-body w-1/2 space-y-2">
          <figure>
            <img className="h-40 rounded-xl" src={image} alt="Album" />
          </figure>
          <form className="space-y-4">
              <textarea
                name="review"
                placeholder="Write Your Review Here"
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
              <br />
              <label className="flex gap-2">Posting Date:  <DatePicker 
                disabled
                selected={startDate} //when day is clicked
                onChange={date=>setStartDate(date)} //only when value has changed
              /></label>
              <label className="flex gap-2">Rating: <Rating
                style={{ maxWidth: 150 }}
                value={rating}
                onChange={setRating}
              /></label>
            </form>   
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Add Review</button>
            </div>
            </div>
            <div className="w-1/2 space-y-4 pt-6">
            <h2 className="card-title">Title: {title}</h2>
            <p>Description: {description}</p>
            <p>Category: {category}</p>
            <p>Company: {company}</p>
            <p>Price: {price}</p>
            <p>Website: {website}</p>
            <p>Date: {date}</p>
            <p>Email: {email}</p>
          </div>
      </div>
    </div>
  );
};

export default SingleService;
