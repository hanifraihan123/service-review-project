import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Rating } from "@smastrom/react-rating";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook/useAxiosSecure";
import ReviewModal from "../Modal/ReviewModal";

const MyReviews = () => {
  const { user,loading,setLoading } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [review,setReview] = useState({});

  useEffect(() => {
    fetchAllReviews()
    setLoading(false)
  }, [user]);

  const axiosSecure = useAxiosSecure()

  const fetchAllReviews = async() => {

    const {data} = await axiosSecure.get(`/review/${user?.email}`)
        setReviews(data)
        setLoading(false);
  }

  const handleUpdate = async(id) => {
    document.getElementById("reviewModal").showModal()
    const {data} = await axios.get(`https://service-review-system-server.vercel.app/update/review/${id}`,{withCredentials: true})
    setReview(data)
    setLoading(false)
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
            axiosSecure.delete(`/review/${id}`)
            .then(res=>{
            if(res.data.deletedCount > 0){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your review has been deleted.",
                    icon: "success"
                  });
                  fetchAllReviews();
                  setLoading(false)
            }
            })
        }
      });
  }

  return (
    <div className="flex flex-col gap-2 items-center bg-fuchsia-400">
      <Helmet>
        <title>My Reviews</title>
      </Helmet>
      <div className="space-y-4 my-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            review={review}
            className="card bg-fuchsia-100 lg:w-96 shadow-xl"
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
            <button className="btn btn-primary" onClick={()=>handleUpdate(review._id)}>Update</button>
                <button onClick={()=>handleDelete(review._id)} className="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReviewModal review={review} fetchAllReviews={fetchAllReviews}></ReviewModal>
    </div>
  );
};

export default MyReviews;
