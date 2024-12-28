import { Rating } from "@smastrom/react-rating";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ReviewModal = ({review,fetchAllReviews}) => {
    
    const {_id} = review;
    const [rating,setRating] = useState(review.rating)

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    const updatedData = { review,rating };
    
    axios.patch(`https://service-review-system-server.vercel.app/review/${_id}`,updatedData,{withCredentials: true})
    .then(res=>{
      if(res.data.modifiedCount > 0) {
        toast.success('Review Updated Successfully')
        fetchAllReviews()
      }
    })

  };

    return (
        <div>
                  <dialog id="reviewModal" className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col gap-2 justify-center"
          >
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Service Title</span>
              </label>
              <input
                type="text"
                name="title"
                disabled
                className="input input-bordered"
                defaultValue={review.serviceTitle}
              />
            </div>
            <textarea name="review" defaultValue={review.review}
                placeholder="Write Your Review Here" className="textarea textarea-bordered textarea-lg w-full">
                 </textarea>
             { review.rating &&  <label className="flex gap-2">Rating: <Rating
                                 style={{ maxWidth: 150 }}
                                 value={review.rating}
                                 onChange={setRating}
                               /></label>}
            <button className="btn justify-center">Update</button>
          </form>
          <p className="py-4 text-center">Press ESC key to close modal</p>
        </div>
      </dialog>
        </div>
    );
};

export default ReviewModal;