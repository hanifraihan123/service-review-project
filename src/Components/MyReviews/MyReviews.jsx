import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyReviews = () => {

    const {user} = useContext(AuthContext);
    const [reviews,setReviews] = useState([]);

      useEffect(()=>{
         axios.get(`http://localhost:5000/review/${user?.email}`)
        .then(result=>{
        setReviews(result.data)
       })
      },[])
   
      console.log(reviews)
    return (
        <div>
            <h3 className="font-bold text-2xl text-center py-4">I m My Reviews</h3>
        </div>
    );
};

export default MyReviews;