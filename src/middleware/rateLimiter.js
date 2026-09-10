import ratelimiter from "../config/upstash.js"

const rateLimit = async (req, res, next) => {
    try {
        const { success } = await ratelimiter.limit("my-rate-limit")
        if (!success) {
            return res.status(429).json({ message: "too many request try again later" });
        }
        next();
    } catch (error) {
        console.log(error);
        console.log("ratelimiter error");
        next(error);
    }
}

export default rateLimit;