import { publishToQueue } from "../config/rabbitmq.js";
import TryCatch from "../config/try-catch.js";
import { redisClient } from "../index.js";

export const loginUser = TryCatch(async (req, res) => {
  const { email } = req.body;

  const rateLimitKey = `otp:ratelimit:${email}`;
  const rateLimit = await redisClient.get(rateLimitKey);
  if (rateLimit) {
    res.status(429).json({
      message: "Too many requests.Please wait before requesting new OTP",
    });
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpKey = `otp:${email}`;
  await redisClient.set(otpKey, otp, {
    EX: 300,
  });

  await redisClient.set(rateLimitKey, "true", {
    EX: 60,
  });

  const message = {
    to: email,
    subject: "Your OTP code",
    body: `Your OTP is ${otp}.It is valid For 5 Mins`,
  };

  await publishToQueue("send-otp", message);

  res.status(200).json({
    message: "OTP Sent To Your Mail",
  });
});
