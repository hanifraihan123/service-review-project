import Banner from "./Banner/Banner";
import ExtraSection from "./ExtraSection/ExtraSection";
import FeaturedSection from "./Featured/FeaturedSection";
import MeetOurPartner from "./MeetOurPartner/MeetOurPartner";
import Statistics from "./Statistics/Statistics";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <MeetOurPartner></MeetOurPartner>
            <Statistics></Statistics>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;