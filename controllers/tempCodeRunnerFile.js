  const { user } = req.params;

    const reviews = await reviewModel.find({ user: user }).sort({createdAt: -1});

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    const hotelIds = reviews.map((review) => review.hotel);
    const hotels = await hotelModel.find({ _id: { $in: hotelIds } }).select(["hotelName", "images"]);

    const reviewData = reviews.map((review) => {
      const hotel = hotels.find((hotel) => hotel._id.toString() === review.hotel.toString());
      return {
        review,
        hotelName: hotel.hotelName,
        hotelImages: hotel.images[0]
      };
    });

    res.status(200).json({ reviews: reviewData });