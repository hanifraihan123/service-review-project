import { motion } from "motion/react"

const MeetOurPartner = () => {
    return (
        <div>
            <motion.h3 whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="text-center font-bold text-2xl py-4">Meet Our Partners</motion.h3>
            <p className="text-center text-sm">Monotonectally embrace interdependent technology after interdependent supply chains. <br />Credibly e-enable proactive infrastructures with team building strategic theme areas.</p>
        </div>
    );
};

export default MeetOurPartner;