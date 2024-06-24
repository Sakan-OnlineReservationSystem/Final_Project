import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecommendedProperties from "../../components/RecommendedProperties/RecommendedProperties";
import Reviews from "../../components/Reviews/Reviews";
import PhotoAlbum from "react-photo-album";
import { Rating } from "react-simple-star-rating";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import ReserveRooms from "../../components/ReserveRooms/ReserveRooms";
import Review from "../../components/Reviews/ReviewCard/ReviewCard";
import "../../output.css";
import "./hotel.css";

const Suspense = () => (
  <div className="hotelWrapper animate-pulse mt-4 w-[100%]">
    <div className=" absolute top-2 right-3 bg-slate-200 h-16 w-40"></div>
    <div className="hotelTitle bg-slate-200 w-80 h-8"></div>
    <div className="hotelAddress">
      <FontAwesomeIcon icon={faLocationDot} />
      <div className="bg-slate-200 h-4 w-96"></div>
    </div>
    <span className="hotelDistance bg-slate-200 h-6 w-72"></span>
    <div className="hotelPriceHighlight bg-slate-200 h-6 w-96"></div>
    <div className="grid grid-cols-3 gap-4">
      {[...Array(9)].map((_, i) => (
        <div className="w-full h-64 bg-slate-200" key={i} />
      ))}
    </div>
    <div className="hotelDetails">
      <div className="hotelDetailsTexts">
        <div className="hotelTitle bg-slate-200 w-20 h-8"></div>
        <div className="hotelDesc bg-slate-200 h-56 w-[36vw]"></div>
      </div>
      <div className="flex gap-4 flex-col items-center bg-slate-50">
        <div className="bg-slate-200 w-56 h-8"></div>
        <div className="bg-slate-200 w-56 h-24"></div>
        <div className="bg-slate-200 w-56 h-8"></div>
        <div className="bg-slate-200 h-16 w-40"></div>
      </div>
    </div>
  </div>
);

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(`/api/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);
  const [userReview, setUserReview] = useState(null);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  };

  const days = options.room
    ? dayDifference(dates[0].endDate, dates[0].startDate) + 1
    : 1;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    setSlideNumber((prev) =>
      direction === "l"
        ? prev === 0
          ? 5
          : prev - 1
        : prev === 5
        ? 0
        : prev + 1
    );
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (user && !loading && data && data.length !== 0) {
      const token = localStorage.getItem("user-token");
      axios
        .get(
          `/api/reviews/findUserReview?reviewee=${user.user._id}&hotelId=${data._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setUserReview(res.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }, [user, data, loading]);

  // Scroll to top when component mounts or updates
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (error) {
    return <div>Error loading Hotel Information.</div>;
  }

  return (
    <div className="hotel-container">
      <Navbar />
      <Header type="list" />
      <div className="flex flex-col items-center">
        {loading ? (
          <Suspense />
        ) : (
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img
                    src={data.photos[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <button onClick={handleClick} className="bookNow ActionBtn">
                Reserve or Book Now!
              </button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location – {data.distance}m from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over ${data.cheapestPrice} at this property and get
                a free airport taxi
              </span>
              <div>
                <PhotoAlbum layout="rows" photos={data.photos} />
              </div>
              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <img
                    loading="lazy"
                    key={i}
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <div className="HotelAminityRapper">
                    <p className=" font-bold text-2xl">Description</p>
                    <div className="HotelAminity">{data.desc}</div>
                  </div>
                </div>
              </div>
              <div className="HotelAminityRapper">
                <p>Amenities</p>
                <div className="HotelAminity">
                  {data.aminity?.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-1 justify-items-end">
                {user && (
                  <>
                    {userReview ? (
                      <MyReview userReview={userReview} deleteCard={false} />
                    ) : (
                      <Review
                        deleteCard={false}
                        review=""
                        hotelId={id}
                        reviewee={user}
                        rating={0}
                        edit={false}
                        newReview={true}
                        {...user}
                      />
                    )}
                  </>
                )}
                <div className="hotelDetailsPrice w-2/4">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data.cheapestPrice}</b> ({days} nights)
                  </h2>
                  <button className="ActionBtn" onClick={handleClick}>
                    Reserve or Book Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {openModal && <ReserveRooms setOpen={setOpenModal} hotelId={id} />}
        <br />
        <div className="break"></div>
        <br />
        <h1 className="homeTitle">Similar destinations</h1>
        <br />
        <RecommendedProperties hotels={data.recommendation} />
        <Reviews {...data} />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;

const MyReview = ({ deleteCard, userReview }) => {
  return (
    <div className="review-card-container">
      <div className="review-card-details">
        <p>
          <span className="  text-6xl">‟</span> {userReview.review}{" "}
          <span className=" text-6xl">„</span>
        </p>
        <div className="rating-container">
          <Rating
            className="rating"
            initialValue={userReview.rating}
            allowFraction
            readOnly
            size={20}
          />
        </div>
        <h1 className="reviewee">
          {userReview.reviewee.username || userReview.username || "ayman"}
        </h1>
      </div>
    </div>
  );
};
