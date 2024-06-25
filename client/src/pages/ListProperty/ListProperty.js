import React, { useContext, useEffect, useState } from "react";
import "./ListProperty.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import NotFound from "../../components/NotFound/NotFound.jsx";
import { Link } from "react-router-dom";
import NewHotel from "../../components/NewHotel/NewHotel";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";
import { toast } from "react-toastify";

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
        <div className=" contents">
          <div className="w-32 h-16 bg-slate-200"></div>
          <div className="w-32 h-16 bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

const ListProperty = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [verification, setVerification] = useState([]);
  const [haveWallet, setHaveWallet] = useState(true);
  const [actionURL, setActionURL] = useState("");
  const [page, SetPage] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/onboardSeller/isPaymentVerified`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      })
      .then((res) => {
        setVerification(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setHaveWallet(verification.paymentVerified);
  }, [verification]);

  useEffect(() => {
    if (user && haveWallet) {
      setLoading(true);
      axios
        .get(`/api/hotels/ownerHotels?page=${page}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, haveWallet, page]);

  const toggleModal = () => {
    if (user && !haveWallet) {
      let id = toast.loading("Fetching paypal token...");
      axios
        .get(`/api/onboardSeller`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        })
        .then((res) => {
          setActionURL(res.data);
          toast.update(id, {
            render: "You are being redirected...",
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
        })
        .catch((err) => {
          toast.update(id, {
            render: err.response.data.message || err,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        });
    }
  };

  useEffect(() => {
    if (actionURL) window.open(actionURL.action_url);
  }, [actionURL]);

  const nextPage = () => {
    SetPage(page + 1);
    window.scrollTo(0, 0);
  };
  const prevPage = () => {
    if (page > 1) {
      SetPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (page > 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [disabled, page]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="ListPropertyPageContainer">
        {loading ? (
          <div className="flex gap-4 flex-col max-w-[1024px] w-full mt-7">
            {[...Array(10)].map((_, i) => (
              <Suspense key={i} />
            ))}
          </div>
        ) : (
          <div className="ListPropertyContainer">
            <div className="innerContainer">
              <div className="w-full flex justify-center mb-7">
                {haveWallet ? (
                  <Link
                    to="/ListProperty/NewProperty"
                    className="ListPropertyButtonContainer RouterBtn"
                  >
                    <button>Add New Property</button>
                  </Link>
                ) : (
                  <button
                    onClick={toggleModal}
                    className="ListPropertyButtonContainer RouterBtn "
                  >
                    Add Wallet
                  </button>
                )}
              </div>
              <div>
                {data && data.length !== 0 ? (
                  <>
                    {data.map((item) => {
                      return <NewHotel key={item._id} hotel={item} />;
                    })}
                    <div className="pagination_container w-full">
                      <button
                        onClick={prevPage}
                        className={disabled ? "disabled" : "prev_button"}
                      >
                        ❮
                      </button>
                      <button onClick={nextPage} className="next_button">
                        ❯
                      </button>
                    </div>
                  </>
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          </div>
        )}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default ListProperty;
