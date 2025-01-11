import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";

const FeaturedSection = () => {

    const [services, setServices] = useState([])
    useEffect(()=>{
        axios.get('https://service-review-system-server.vercel.app/some-services')
        .then(res=>setServices(res.data))
    },[]) 

    return (
        <div className="bg-rose-200">
            <h3 className="text-center font-bold text-2xl pt-4">Our Featured Services</h3>
            <p className="text-center pt-2 text-sm">Rapidiously synthesize multimedia based infomediaries without team building testing procedures. <br /> Energistically customize focused value through customer directed value.  <br />Appropriately simplify prospective information for sticky solutions. <br /> Continually provide access to.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto py-3 lg:py-6 px-6">
            {
                services.map(service=><ServiceCard key={service._id} service={service}></ServiceCard>)
            }
            </div>
        </div>
    );
};

export default FeaturedSection;