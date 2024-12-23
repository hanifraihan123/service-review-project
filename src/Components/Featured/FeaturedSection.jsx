import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";
import { motion } from "motion/react"


const FeaturedSection = () => {

    const [services, setServices] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/some-services')
        .then(res=>setServices(res.data))
    },[]) 

    return (
        <div className="bg-rose-200">
            <motion.h3 whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="text-center font-bold text-2xl pt-4">Our Featured Services</motion.h3>
            <p className="text-center pt-2 text-sm">Rapidiously synthesize multimedia based infomediaries without team building testing procedures. <br /> Energistically customize focused value through customer directed value.  <br />Appropriately simplify prospective information for sticky solutions. <br /> Continually provide access to.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-6 py-6 space-y-2">
            {
                services.map(service=><ServiceCard key={service._id} service={service}></ServiceCard>)
            }
            </div>
        </div>
    );
};

export default FeaturedSection;