import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Rating } from "@smastrom/react-rating";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchAllReviews()
  }, [user]);

  const fetchAllReviews = async() => {
    const {data} = await axios.get(`https://service-review-system-server.vercel.app/review/${user?.email}`)
        setReviews(data);
  }
 
  const handleDelete = id => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`https://service-review-system-server.vercel.app/review/${id}`)
            .then(res=>{
            if(res.data.deletedCount > 0){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your review has been deleted.",
                    icon: "success"
                  });
                  fetchAllReviews();
            }
            })
        }
      });
  }

  return (
    <div className="flex flex-col gap-2 items-center bg-fuchsia-400">
      <div className="space-y-4 my-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            review={review}
            className="card bg-fuchsia-100 w-96 shadow-xl"
          >
            <div className="card-body">
                <div className="flex gap-2 items-center">
                    <img className="h-10 w-10 rounded-full" src={review.photo} alt="" />
                    <h3 className="font-bold">{review.name}</h3>
                </div>
              <h2 className="card-title">Title: {review.serviceTitle}</h2>
              <p>Review: {review.review}</p>
              <label className="flex gap-2">
                Rating:{" "}
                <Rating style={{ maxWidth: 150 }} value={review.rating} />
              </label>
                <p>Date: {review.reviewDate}</p>
              <div className="card-actions justify-center mt-2">
                <button className="btn btn-primary">Update</button>
                <button onClick={()=>handleDelete(review._id)} className="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
