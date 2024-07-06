const Razorpay = require('razorpay');


// apiKey="rzp_test_kTsRSaDC8hwztX"
// apiSecret="LieoD1s9mxMIv569PcgRDMcU"

apiKey="rzp_test_2IEDRFaCoooycY"
apiSecret="FySe2f5fie9hij1a5s6clk9B"

const razorpay  = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});



module.exports = razorpay