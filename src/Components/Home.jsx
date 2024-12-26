import CountUp from "react-countup";
import Banner from "./Banner/Banner";
import ExtraSection from "./ExtraSection/ExtraSection";
import FeaturedSection from "./Featured/FeaturedSection";
import MeetOurPartner from "./MeetOurPartner/MeetOurPartner";
import Statistics from "./Statistics/Statistics";
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {


    return (
        <div>
             <Helmet>
        <title>Home</title>
      </Helmet>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <MeetOurPartner></MeetOurPartner>
            <Statistics></Statistics>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;