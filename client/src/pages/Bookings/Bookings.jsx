import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import BookingItem from "../../components/BookingItem/BookingItem";
import { AuthContext } from "../../context/AuthContext";
import NotFound from "../../components/NotFound/NotFound";
import axios from "axios";

const boo = [
  {
    _id: "66780730e484cb485e80a934",
    user: "6677279991c3e78338176498",
    hotel: {
      numRatings: 0,
      name: "Helnan Royal Hotel - Montazah Gardens",
      type: "hotel",
      city: "alex",
      country: "egypt",
      address: ["\nAl Montazah Palace, 99999 Alexandria, Egypt\n"],
      rating: 8.1,
      cheapestPrice: 723,
      featured: true,
      numberOfStars: 1,
      score: 8.1,
      reviewScore: 'Very Good"',
      ownerId: "65bea8893e200fba6078f5d8",
    },
    from: "2024-06-23T00:00:00.000Z",
    to: "2024-06-24T00:00:00.000Z",
    amountPaid: 0,
    createdAt: "2024-06-23T11:28:25.177Z",
    paid: false,
    __v: 0,
    roomNumber: {
      roomId: "65df9e91d1edf62697139bb3",
      roomNumber: 520,
    },
  },
  {
    _id: "667817364b6c927dcdd70c9e",
    roomNumber: {
      roomId: "65df9e91d1edf62697139bb3",
      roomNumber: 520,
    },
    user: "6677279991c3e78338176498",
    hotel: {
      numRatings: 0,
      name: "Helnan Royal Hotel - Montazah Gardens",
      type: "hotel",
      city: "alex",
      country: "egypt",
      address: ["\nAl Montazah Palace, 99999 Alexandria, Egypt\n"],
      rating: 8.1,
      cheapestPrice: 723,
      featured: true,
      numberOfStars: 1,
      score: 8.1,
      reviewScore: 'Very Good"',
      ownerId: "65bea8893e200fba6078f5d8",
    },
    from: "2024-06-22T22:00:00.000Z",
    to: "2024-06-23T22:00:00.000Z",
    amountPaid: 0,
    createdAt: "2024-06-23T12:37:39.450Z",
    paid: false,
    __v: 0,
  },
  {
    _id: "66781a6a6127f61ab27a2250",
    roomNumber: {
      roomId: "65df9e91d1edf62697139bb3",
      roomNumber: 520,
    },
    user: "6677279991c3e78338176498",
    hotel: {
      numRatings: 0,
      name: "Helnan Royal Hotel - Montazah Gardens",
      type: "hotel",
      city: "alex",
      country: "egypt",
      address: ["\nAl Montazah Palace, 99999 Alexandria, Egypt\n"],
      rating: 8.1,
      cheapestPrice: 723,
      featured: true,
      numberOfStars: 1,
      score: 8.1,
      reviewScore: 'Very Good"',
      ownerId: "65bea8893e200fba6078f5d8",
    },
    from: "2024-06-22T22:00:00.000Z",
    to: "2024-06-23T22:00:00.000Z",
    amountPaid: 0,
    createdAt: "2024-06-23T12:51:46.061Z",
    paid: false,
    __v: 0,
  },
  {
    _id: "66780da28f85fee8f0356673",
    roomNumber: {
      roomId: "65df9e91d1edf62697139bb3",
      roomNumber: 520,
    },
    user: "6677279991c3e78338176498",
    hotel: {
      numRatings: 0,
      name: "Helnan Royal Hotel - Montazah Gardens",
      type: "hotel",
      city: "alex",
      country: "egypt",
      address: ["\nAl Montazah Palace, 99999 Alexandria, Egypt\n"],
      rating: 8.1,
      cheapestPrice: 723,
      featured: true,
      numberOfStars: 1,
      score: 8.1,
      reviewScore: 'Very Good"',
      ownerId: "65bea8893e200fba6078f5d8",
    },
    from: "2024-06-23T00:00:00.000Z",
    to: "2024-06-24T00:00:00.000Z",
    amountPaid: 0,
    createdAt: "2024-06-23T11:54:32.864Z",
    paid: false,
    __v: 0,
  },
  {
    _id: "66780e458f85fee8f035667c",
    roomNumber: {
      roomId: "65df9e91d1edf62697139bb3",
      roomNumber: 520,
    },
    user: "6677279991c3e78338176498",
    hotel: {
      numRatings: 0,
      name: "Helnan Royal Hotel - Montazah Gardens",
      type: "hotel",
      city: "alex",
      country: "egypt",
      address: ["\nAl Montazah Palace, 99999 Alexandria, Egypt\n"],
      rating: 8.1,
      cheapestPrice: 723,
      featured: true,
      numberOfStars: 1,
      score: 8.1,
      reviewScore: 'Very Good"',
      ownerId: "65bea8893e200fba6078f5d8",
    },
    from: "2024-06-23T00:00:00.000Z",
    to: "2024-06-24T00:00:00.000Z",
    amountPaid: 0,
    createdAt: "2024-06-23T11:54:32.864Z",
    paid: false,
    __v: 0,
  },

  {
    _id: "66783a9c182ea0d2856842f7",
    roomNumber: {
      roomId: "65df9e91d1edf62697139bb3",
      roomNumber: 520,
    },
    user: "6677279991c3e78338176498",
    hotel: {
      numRatings: 0,
      name: "Helnan Royal Hotel - Montazah Gardens",
      type: "hotel",
      city: "alex",
      country: "egypt",
      address: ["\nAl Montazah Palace, 99999 Alexandria, Egypt\n"],
      rating: 8.1,
      cheapestPrice: 723,
      featured: true,
      numberOfStars: 1,
      score: 8.1,
      reviewScore: 'Very Good"',
      ownerId: "65bea8893e200fba6078f5d8",
    },
    from: "2024-06-23T00:00:00.000Z",
    to: "2024-06-24T00:00:00.000Z",
    amountPaid: 0,
    createdAt: "2024-06-23T14:45:45.693Z",
    paid: false,
    __v: 0,
  },
];

const Suspense = () => {
  return (
    <div className="searchItem animate-pulse">
      <div className="siImg bg-slate-200  h-4" />
      <div className="siDesc ">
        <div className="siTitle bg-slate-200  h-4"></div>
        <div className="siSubtitle bg-slate-200 w-32 h-4 "></div>

        <div className="flex ">
          <div className="siSubtitle bg-slate-200 w-16 h-"></div>
          <div className="siDistance bg-slate-200 w-16 h-4"></div>
        </div>
        <div className="siFeatures bg-slate-200  h-24"></div>
        <div className="siCancelOp bg-slate-200 w-32 h-4"></div>
        <div className="siCancelOpSubtitle w-64 bg-slate-200  h-4"></div>
      </div>
      <div className="siDetails gap-4 ">
        <div className="siRating ">
          <div className="bg-slate-200 mr-1 w-12 h-4"></div>
          <div className="bg-slate-200  w-8  h-8 "></div>
        </div>
        <div className="siDetailTexts  ">
          <div className="siPrice bg-slate-200  h-8 "></div>
          <div className="siTaxOp bg-slate-200  h-4"></div>
          <button className=" bg-slate-200 h-12 "></button>
        </div>
      </div>
    </div>
  );
};

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const token = localStorage.getItem("user-token");
      try {
        const res = await axios.get(`api/booking/reservations`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error posting data: ", err);
      }
      setLoading(false);
    };
    if (user) fetchBookings();
  }, [user]);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="flex justify-center mt-4">
        <div className=" w-[100%] max-w-[1024px] grid grid-cols-2 gap-x-2">
          {false ? (
            <div className="flex gap-4 flex-col">
              {[...Array(3)].map((_, i) => (
                <Suspense key={i} />
              ))}
            </div>
          ) : (
            <>
              {boo && boo.length !== 0 ? (
                <>
                  {boo.map((item) => {
                    return (
                      <BookingItem
                        key={item._id}
                        item={item}
                        loading={loading}
                      />
                    );
                  })}
                </>
              ) : (
                <NotFound />
              )}
            </>
          )}
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Bookings;
