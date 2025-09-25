import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComplaints,
  postComplaint,
  deleteComplaint,
  fetchHotelNamesByBookingId,
} from "../../redux/reducers/complaintSlice";
import { userId } from "../../utils/Unauthorized";
import { formatDateWithOrdinal } from "../../utils/_dateFunctions";
import {
  IoClose,
  IoAttach,
  IoSend,
  IoTrash,
  IoAlertCircleOutline,
  IoAddCircleOutline,
} from "react-icons/io5";

export default function Complaint() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.complaint);

  const [regarding, setRegarding] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotelEmail, setHotelEmail] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [issue, setIssue] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogImages, setDialogImages] = useState([]);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");

  useEffect(() => {
    dispatch(fetchComplaints(userId));
  }, [dispatch]);

  useEffect(() => {
    if (bookingId) {
      setLoadingHotels(true);
      dispatch(fetchHotelNamesByBookingId(bookingId))
        .unwrap()
        .then((res) => {
          setHotels(res);
          if (res.length === 1) {
            setHotelId(res[0].hotelDetails.hotelId);
            setHotelName(res[0].hotelDetails.hotelName);
            setHotelEmail(res[0].hotelDetails.hotelEmail);
          }
        })
        .finally(() => setLoadingHotels(false));
    } else {
      setHotels([]);
      setHotelId("");
      setHotelName("");
      setHotelEmail("");
    }
  }, [bookingId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("regarding", regarding);
    formData.append("hotelName", hotelName);
    formData.append("hotelId", hotelId);
    formData.append("hotelEmail", hotelEmail);
    formData.append("bookingId", bookingId);
    formData.append("issue", issue);
    images.forEach((file) => formData.append("images", file));

    try {
      await dispatch(postComplaint(formData)).unwrap();
      dispatch(fetchComplaints(userId));
      setRegarding("");
      setBookingId("");
      setHotelId("");
      setHotelName("");
      setHotelEmail("");
      setIssue("");
      setImages([]);
      setIsFormVisible(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteComplaint(id)).unwrap();
    dispatch(fetchComplaints(userId));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          <IoAddCircleOutline />
          {isFormVisible ? "Hide Form" : "Raise a Complaint"}
        </button>
      </div>

      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-6 mb-8 space-y-4"
        >
          <h3 className="text-lg font-bold text-indigo-600 mb-2">
            Submit a New Complaint
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={regarding}
              onChange={(e) => setRegarding(e.target.value)}
              className="border rounded-md px-3 py-2"
              required
            >
              <option value="">Select Regarding</option>
              <option value="Booking">Booking</option>
              <option value="Hotel">Hotel</option>
              <option value="Website">Website</option>
            </select>

            <input
              type="text"
              placeholder="Booking ID"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="border rounded-md px-3 py-2"
              required
            />

            <select
              value={hotelId}
              onChange={(e) => {
                const sel = hotels.find(
                  (h) => h.hotelDetails.hotelId === e.target.value
                );
                if (sel) {
                  setHotelId(sel.hotelDetails.hotelId);
                  setHotelName(sel.hotelDetails.hotelName);
                  setHotelEmail(sel.hotelDetails.hotelEmail);
                }
              }}
              className="border rounded-md px-3 py-2"
              disabled={!bookingId}
              required
            >
              <option value="">
                {loadingHotels ? "Fetching hotels..." : "Select Hotel"}
              </option>
              {hotels.map((h) => (
                <option key={h.hotelDetails.hotelId} value={h.hotelDetails.hotelId}>
                  {h.hotelDetails.hotelName}
                </option>
              ))}
            </select>
          </div>

          <textarea
            rows="4"
            placeholder="Describe your issue..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />

          <div>
            <label className="flex items-center gap-2 cursor-pointer border rounded-md px-3 py-2 hover:border-indigo-500">
              <IoAttach />
              Upload Attachments
              <input
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={(e) => setImages(Array.from(e.target.files))}
              />
            </label>
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {images.map((file, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs flex items-center gap-1"
                  >
                    {file.name}
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, idx) => idx !== i))
                      }
                    >
                      <IoClose />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"} <IoSend />
            </button>
          </div>
        </form>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md flex items-center gap-2">
          <IoAlertCircleOutline /> Error loading complaints
        </div>
      )}

      <h3 className="text-lg font-bold text-indigo-600 mb-4 text-center">
        Your Complaints
      </h3>

      {loading ? (
        <p className="text-gray-500 text-center">Loading complaints...</p>
      ) : data.length > 0 ? (
        <div className="space-y-4">
          {data.map((c) => (
            <div
              key={c._id}
              className="bg-white shadow-sm rounded-xl p-4 relative hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800">{c.issue}</h4>
                <span
                  className={`px-2 py-1 text-xs rounded-md ${
                    c.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : c.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Hotel:</strong> {c.hotelName} |{" "}
                <strong>Regarding:</strong> {c.regarding}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Complaint ID {c.complaintId} issued on{" "}
                {formatDateWithOrdinal(c.createdAt)}
              </p>
              <div className="flex gap-2 mt-2">
                {c.images?.length > 0 && (
                  <button
                    className="text-indigo-600 text-sm hover:underline"
                    onClick={() => {
                      setDialogImages(c.images);
                      setOpenDialog(true);
                    }}
                  >
                    See Attachment
                  </button>
                )}
                {c.feedBack && (
                  <button
                    className="text-indigo-600 text-sm hover:underline"
                    onClick={() => {
                      setFeedbackContent(c.feedBack);
                      setOpenFeedbackDialog(true);
                    }}
                  >
                    View Feedback
                  </button>
                )}
              </div>
              <button
                onClick={() => handleDelete(c._id)}
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-50 text-red-500 transition"
              >
                <IoTrash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No complaints found.</p>
      )}

      {openDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
            <h4 className="text-lg font-bold mb-4">Attachments</h4>
            {dialogImages.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {dialogImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`attachment-${i}`}
                    className="w-full rounded-md border"
                  />
                ))}
              </div>
            ) : (
              <p>No attachments found.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {openFeedbackDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h4 className="text-lg font-bold mb-4">Feedback</h4>
            <p className="text-gray-700">{feedbackContent}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setOpenFeedbackDialog(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
