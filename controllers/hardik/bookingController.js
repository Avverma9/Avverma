const Razorpay = require("razorpay");
const crypto = require("crypto");
const booking = require("../../models/hardik/booking.js");
const randomString = require("../../randomStringGenerator.js")


const orders = async (req, res) => {

    // console.log("reached orders api");
    try {
        const { hotelId, userId, amount, currency, checkin, checkout, hotelname, city, guests } = req.body;
        
        let newuserId = randomString(8);
        console.log(newuserId);
        console.log(hotelname);
        const fillStatus = async (data) => {
            await booking.create({
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

        //dhyan dena ispe // it can accept data directly without coverting to string 
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
            // console.log(order);

            res.status(200).json({ data: order });
        });
    } catch (error) {
        res.status(404).json({ "success": false, message: "Internal Server Error!" });
        console.log(error);
    }
}

const verify = async (req, res) => {
    // console.log("verify page par aagya hu") ; 
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

            //try it in sigle without copying 
            const update = {
                paymentId: razorpay_payment_id,
                bookingStatus: "confirmed"
            }

            let doc = await booking.findOneAndUpdate(filter, update, {
                new: true
            });

            // alert("Payment verified successfully") ;
            // console.log("Payment verified successfully");
            return res.status(200).json({ "success": true, message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ "success": true, message: "Invalid signature sent!" });
        }
    } catch (error) {
        // alert("Internal Server Error!") ; 
        res.status(500).json({ message: "Internal Server Error!" });
        // console.log(error);
    }
}

const bookingDetails = async (req, res) => {
    //booking details of the logged In user only
    const userId = req.params.id;
    // console.log("inside the new route ", userId);

    const data = await booking.find();

    // console.log(data);

    res.status(200).json({ "success": true, data });

}


const cancelBooking = async (req, res) => {

    try {

        const bookingId = req.body.newbookingId;

        const bookdata = await booking.find({newuserId : bookingId});
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

        let doc = await booking.findOneAndUpdate(filter, update, {
            new: true
        });


        res.status(200).json({ "success": true });
    } catch (error) {
        res.status(500).json({ "success": false });
    }

}

module.exports = { orders, verify, bookingDetails, cancelBooking } 