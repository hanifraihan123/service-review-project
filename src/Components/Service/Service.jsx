import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";


const Service = () => {

    const [services, setServices] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/services',{withCredentials: true})
        .then(res=>setServices(res.data))
    },[]) 

    return (
        <div className="bg-violet-300">
            <h3 className="font-bold text-2xl text-center pt-4">Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-6 py-6 space-y-2">
            {
                services.map(service=><ServiceCard key={service._id} service={service}></ServiceCard>)
            }
            </div>
        </div>
    );
};

export default Service;