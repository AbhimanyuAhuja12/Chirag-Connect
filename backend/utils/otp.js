export function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export async function sendOTPSMS(mobile, otp) {
  // Development mode: Log OTP to console
  if (process.env.NODE_ENV !== "production") {
    console.log(`🔐 DEVELOPMENT OTP for ${mobile}: ${otp}`)
    console.log(`📱 Use this OTP to login: ${otp}`)
    return true
  }

  // Production mode: Integrate with actual SMS service
  console.log(`Sending OTP ${otp} to mobile ${mobile}`)

  // In production, integrate with actual SMS service:
  // const twilio = require('twilio')(accountSid, authToken)
  // await twilio.messages.create({
  //   body: `Your Chirag Connect OTP is: ${otp}`,
  //   from: '+1234567890',
  //   to: `+91${mobile}`
  // })

  return true
}
