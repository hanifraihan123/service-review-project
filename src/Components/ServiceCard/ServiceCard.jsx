import { Link } from "react-router-dom";
import { motion } from "motion/react"

const ServiceCard = ({service}) => {


    return (
        <div className="card bg-violet-100 shadow-xl">
        <figure>
          <img className="h-36 w-full object-cover" src={service.image}/>
        </figure>
        <div className="space-y-2 pl-2 my-2">
          <h2 className="card-title"><span className="font-bold">Title:</span> {service.title}</h2>
          <p><span className="font-bold">Description:</span> {service.description}</p>
          <p><span className="font-bold">Category:</span> {service.category}</p>
          <p><span className="font-bold">Price:</span> {service.price}</p>
          <div className="card-actions justify-center">
            <Link to={`/service/${service._id}`}><motion.button whileHover={{ scale: 0.8 }} className="btn btn-warning">See Details</motion.button></Link>
          </div>
        </div>
      </div>
    );
};

export default ServiceCard;