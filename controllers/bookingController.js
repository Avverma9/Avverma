const Razorpay = require("razorpay");
const crypto = require("crypto");
const bookingModel = require("../models/bookingModel");
const randomString = require("../controllers/randomStringGenerator")


const orders = async (req, res) => {

    // console.log("reached orders api");
    try {
        const { hotelId, userId, amount, currency, checkin, checkout, hotelname, city, guests } = req.body;
        
        let newuserId = randomString(8);
        console.log(newuserId);
        console.log(hotelname);
        const fillStatus = async (data) => {
            await bookingModel.create({
                userId,
                newuserId, 
                hotelId,
                hotelname,
                city,
                checkin,
                checkout,
                guests,
                amount,
                currency,
                bookingStatus: "failed",
                orderId: data.id
            });
        }

        const instance = new Razorpay({
            key_id: "rzp_test_CE1nBQFs6SwXnC",
            key_secret: "PTYR3RDbVaNrpkmRqMhX7CKA"
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }

            fillStatus(order);
            

            res.status(200).json({ data: order });
        });
    } catch (error) {
        res.status(404).json({ "success": false, message: "Internal Server Error!" });
        console.log(error);
    }
}

const verify = async (req, res) => {
  
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", "PTYR3RDbVaNrpkmRqMhX7CKA")
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {

            const filter = { orderId: razorpay_order_id };

           
            const update = {
                paymentId: razorpay_payment_id,
                bookingStatus: "confirmed"
            }

            let doc = await bookingModel.findOneAndUpdate(filter, update, {
                new: true
            });

           
            return res.status(200).json({ "success": true, message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ "success": true, message: "Invalid signature sent!" });
        }
    } catch (error) {
      
        res.status(500).json({ message: "Internal Server Error!" });
       
    }
}

// const bookingDetails = async (req, res) => {
//     const id = req.params.id;
//     const data = await bookingModel.find();
//     res.status(200).json(data) ;

// }
const bookingDetails = async (req,res)=>{
    const { userId } = req.params;

    try {
      const bookings = await bookingModel.find({id : userId }).exec();
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for the user.' });
      }
  
      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
}
const cancelBooking = async (req, res) => {

    try {

        const bookingId = req.body.newbookingId;

        const bookdata = await bookingModel.find({newuserId : bookingId});
        if (bookdata.bookingStatus === "failed") {
            return res.json({ "success": false, "status": "failed" });
        }

        if (bookdata.bookingStatus === "cancelled") {
            return res.json({ "success": false, "status": "cancelled" });
        }


        const filter = { _id: bookingId };
        const update = {
            bookingStatus: "cancelled"
        }

        let doc = await bookingModel.findOneAndUpdate(filter, update, {
            new: true
        });


        res.status(200).json({ "success": true });
    } catch (error) {
        res.status(500).json({ "success": false });
    }

}

module.exports = { orders, verify, bookingDetails, cancelBooking } 