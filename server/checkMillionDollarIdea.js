const checkMillionDollarIdea = (req, res, next) => {
    const idea = req.body
    const ideaValue = Number(idea.numWeeks) * Number(idea.weeklyRevenue);
    if(ideaValue >= 1000000) {
        next();
    } else {
        res.status(400).send('That idea is good enough, go think of a better one!');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
