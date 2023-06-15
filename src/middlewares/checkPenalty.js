const checkPenalty = async (req, res, next) => {
    try {
        const { member } = req;

        if (member && member.penalty) {
            const penaltyEndDate = new Date(member.penaltyDate);
            penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
            const today = new Date();

            if (today <= penaltyEndDate) {
                return res.status(403).json({
                    message: 'You are currently penalized. Please wait until the penalty ends.',
                });
            }

            member.penalty = false;
            member.penaltyDate = null;
            await member.save();
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = checkPenalty;
