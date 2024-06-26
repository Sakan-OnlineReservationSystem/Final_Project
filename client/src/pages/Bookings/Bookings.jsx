import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import BookingItem from "../../components/BookingItem/BookingItem";
import { AuthContext } from "../../context/AuthContext";
import NotFound from "../../components/NotFound/NotFound";
import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;
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
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchBookings = async () => {
      let id = toast.loading("Fetching your Reservations...");
      setLoading(true);
      const token = localStorage.getItem("user-token");
      try {
        const res = await axios.get(`${apiUrl}/api/booking/reservations`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        toast.update(id, {
          render: "Fetched successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        setBookings(res.data);
      } catch (err) {
        toast.update(id, {
          render: err.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      setLoading(false);
      setReload(false);
    };
    if (user) fetchBookings();
  }, [user, reload]);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="flex justify-center mt-4">
        <div>
          {loading ? (
            <div className=" w-[100%] max-w-[1024px] grid grid-cols-2 gap-x-2">
              {[...Array(2)].map((_, i) => (
                <Suspense key={i} />
              ))}
            </div>
          ) : (
            <>
              {bookings && bookings.length !== 0 ? (
                <div className=" w-[100%] max-w-[1024px] grid grid-cols-2 gap-x-2">
                  {bookings.map((item) => {
                    return (
                      <BookingItem
                        setReload={setReload}
                        key={item._id}
                        item={item}
                        loading={loading}
                      />
                    );
                  })}
                </div>
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
