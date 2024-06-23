import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import BookingItem from "../../components/BookingItem/BookingItem";
import { AuthContext } from "../../context/AuthContext";
import NotFound from "../../components/NotFound/NotFound";
import axios from "axios";

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
        const res = await axios.get(
          `api/booking/reservations/${user.user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
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
      <div className="ListPropertyContainer">
        <div className="innerContainer">
          {loading ? (
            <div className="flex gap-4 flex-col">
              {[...Array(3)].map((_, i) => (
                <Suspense key={i} />
              ))}
            </div>
          ) : (
            <>
              {bookings.length === 0 ? (
                <NotFound />
              ) : (
                <>
                  {bookings.map((item) => {
                    return (
                      <BookingItem
                        key={item._id}
                        item={item.hotel}
                        loading={loading}
                      />
                    );
                  })}
                </>
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
