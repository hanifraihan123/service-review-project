import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import DatePicker from "react-datepicker";
import { formatDate } from 'date-fns';
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const SingleService = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [rating, setRating] = useState(0);
  const [reviews,setReviews] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const {user} = useContext(AuthContext);

  const {title,description,category,price,image,company,date,email,website,_id} = service;

  useEffect(() => {
    fetchSingleData();
  }, []);

  const fetchSingleData = async () => {
    const { data } = await axios.get(`https://service-review-system-server.vercel.app/service/${id}`);
    setService(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    const reviewDate = formatDate(new Date(),'P');
    const serviceId = _id;
    const serviceTitle = title;
    const name = user?.displayName;
    const photo = user?.photoURL;
    const email = user?.email;
    const reviewData = {serviceId,serviceTitle,review,rating,reviewDate,name,photo,email}
    
    axios.post('https://service-review-system-server.vercel.app/allReviews',reviewData)
    .then(result=>{
        if(result.data){
            toast.success('Review Added Successfully')
            form.reset()
        }
    })
  }

    useEffect(()=>{
        axios.get(`https://service-review-system-server.vercel.app/review?id=${id}`)
        .then(result=>{
            setReviews(result.data)
        })
    },[reviews])


  return (
    <div className="px-32 items-center justify-center bg-lime-100 py-6">
        <div className="card lg:card-side bg-red-200 shadow-xl">
          <div className="card-body w-1/2 space-y-2">
          <figure>
            <img className="h-40 rounded-xl" src={image} alt="Album" />
          </figure>
          <form onSubmit={handleSubmit} className="space-y-4">
              <textarea name="review" required
                placeholder="Write Your Review Here" className="textarea textarea-bordered textarea-lg w-full">
                 </textarea>
              <br />
              <label className="flex gap-2">Posting Date:  <DatePicker 
                disabled
                selected={startDate} 
                onChange={date=>setStartDate(date)} 
              /></label>
              <label className="flex gap-2">Rating: <Rating
                style={{ maxWidth: 150 }}
                value={rating}
                onChange={setRating}
              /></label>
               <div className="card-actions justify-center">
              <button className="btn btn-primary">Add Review</button>
            </div>
            </form>   
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
            <p>Total Review: {reviews.length}</p>
          </div>
      </div>
   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-4">
     {
        reviews.map(review=><div key={review._id} review={review} className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex gap-2 items-center">
              <img className="h-10 w-10 rounded-full" src={review.photo} alt="" />
            <h2 className="font-bold">{review.name}</h2>
            </div>
            <p>Review: {review.review}</p>
            <p>Date: {review.reviewDate}</p>
            <label className="flex gap-2">Rating: <Rating
                style={{ maxWidth: 150 }}
                value={review.rating}
              /></label>
          </div>
        </div>)
      }
   </div>
    </div>
  );
};

export default SingleService;
