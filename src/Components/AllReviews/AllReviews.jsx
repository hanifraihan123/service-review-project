import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { Rating } from "@smastrom/react-rating";

const AllReviews = () => {

    const axiosSecure = useAxiosSecure();
    const {data: reviews=[]} = useQuery({
        queryKey: ['reviews'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/reviews')
            return data
        }
    })

    return (
        <div className="bg-purple-300">
            <h3 className="font-bold text-center text-2xl py-4">Our All Well Wishers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 px-4">
                {
                    reviews.map(review=><div key={review._id} review={review} className="card bg-violet-100 shadow-xl">
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
                                   </div>
                      </div>)
                }
            </div>
        </div>
    );
};

export default AllReviews;