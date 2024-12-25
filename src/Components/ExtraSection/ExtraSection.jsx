import Lottie from "lottie-react";
import animate from "../../assets/animation.json"
import animate2 from "../../assets/animation2.json"

const ExtraSection = () => {
    return (
        <div className="flex gap-2 bg-emerald-200 items-center justify-center">
            
            <div>
            <h3 className="text-center pt-6 font-bold text-2xl">Our New Feature Is Coming Soon</h3>
                <Lottie animationData={animate}></Lottie>
            </div>
            <div>
            <div className="flex w-52 flex-col gap-4">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
            </div>
            <div>
            <h3 className="text-center pt-6 font-bold text-2xl">Long Way To Go</h3>
            <Lottie animationData={animate2}></Lottie>
            </div>
        </div>
    );
};

export default ExtraSection;