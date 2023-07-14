import axios from "axios";
import React from "react";

export default function CheckOut({
  hotelId,
  userId,
  amount,
  currency,
  userData,
  hotelData
}) {



  console.log(userData, "CHECK-OUT");
  // const loadScript = (src) => {
  //     return new Promise((resolve) => {
  //         const script = document.createElement('script')
  //         script.src = src;
  //         script.onload = () => {
  //             resolve(true);
  //         }
  //         script.onerror = () => {
  //             resolve(false);
  //         }
  //         document.body.appendChild(script);
  //     })
  // }

  const handleOpenRazorpay = (data) => {
    const options = {
      key: "rzp_test_CE1nBQFs6SwXnC",
      amount: amount * 100,
      currency: data.currency,
      // order_id: "09i3979t12ruhvqdwo7t12r2",
      handler: function (response) {
        console.log(response, "27");
      },
      //   prefill: {
      //     name: userData.name,
      //     email: userData.email,
      //     contact: userData.mobile,
      //   },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = async () => {
    // create api integration
    const data = {
      hotelId: hotelId,
      userId: userId,
      amount: amount,
      currency: currency,
    };

    console.log(userData, "CHECK-OUT");
    // console.log(data)
    axios
      .post("https://hotel-backend-tge7.onrender.com/payments", data)
      .then((res) => {
        console.log(res.data, "/api/payments");
        handleOpenRazorpay(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const initPayment = (data) => {
    // console.log("inside initPayment " , data);
    const options = {
      key: "rzp_test_CE1nBQFs6SwXnC" ,
      amount: amount ,
      currency: data.currency,
      name:  hotelData.hotelName,
      description: "Test Transaction",
      // image: img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "https://hotel-backend-tge7.onrender.com/hardik/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          // console.log("cannot reach here")
          // console.log("inside initPayment " , data);
        } catch (error) {
          // console.log("error yaha aa rhi hai "); 
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    // console.log("yahah aaay ")
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePaymentbyHardik = async () => {
    try {
      const orderUrl = `https://hotel-backend-tge7.onrender.com/hardik/api/payment/orders`;
      const { data } = await axios.post(orderUrl, { hotelId, userId, amount, currency, checkin: hotelData.startDate, checkout: hotelData.endDate, hotelname: hotelData.hotelName, city: hotelData.destination, guests: hotelData.guests });
      console.log("inside handlePayment " , data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={handlePaymentbyHardik}
        style={{
          padding: "10px 15px",
          backgroundColor: "#0056b3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        Book Now
      </button>
    </>
  );
}
