import Banner from "./Banner/Banner";
import ExtraSection from "./ExtraSection/ExtraSection";
import FeaturedSection from "./Featured/FeaturedSection";
import MeetOurPartner from "./MeetOurPartner/MeetOurPartner";
import Statistics from "./Statistics/Statistics";
import { Helmet } from 'react-helmet-async';

const Home = () => {


    return (
        <div>
             <Helmet>
        <title>Service Review || Home</title>
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