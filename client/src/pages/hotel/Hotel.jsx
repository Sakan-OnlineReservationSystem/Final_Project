import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Reviews from "../../components/Reviews/Reviews";
import PhotoAlbum from "react-photo-album";
import { Rating } from "react-simple-star-rating";
import { MdDelete } from "react-icons/md";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import Review from "../../components/Reviews/ReviewCard/ReviewCard";
import "../../output.css";
import axios from "axios";

const Suspense = () => {
  return (
    <div className="hotelWrapper animate-pulse mt-4">
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
          <div className="w-full h-64 bg-slate-200 " key={i} />
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
};

const Hotel = () => {
  // Catch Rating value

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const [userReview, SetUserReview] = useState();

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let days = 1;
  if (options.room == null) {
    options.room = 1;
  }
  try {
    days = dayDifference(dates[0].endDate, dates[0].startDate) + 1;
  } catch ({ name, message }) {}

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  if (error) {
    return <div>Error loading Hotel Information.</div>;
  }

  const fetchReview = () => {
    axios({
      method: "get",
      url: `https://sakan-api.onrender.com/api/reviews/findUserReview?reviewee=${user.user._id}&hotelId=${data._id}`,
    })
      .then((response) => {
        console.log("review", response.data);
        SetUserReview(response.data);
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
      });
  };
  if (user && !loading && data) {
    fetchReview();
  }

  return (
    <div>
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
              <button onClick={handleClick} className="bookNow">
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
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                    nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>

              {user &&
                (userReview ? (
                  <div style={{ width: "90%" }}>
                    <MyReview userReview={userReview} deleteCard={false} />
                  </div>
                ) : (
                  <div style={{ width: "90%" }}>
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
                  </div>
                ))}
            </div>
          </div>
        )}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        <br />
        <div className="break"></div>
        <br />
        <h1 className="homeTitle">Similar destinations</h1>
        <br />
        <FeaturedProperties />
        <Reviews {...data} />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;

const MyReview = ({ deleteCard, userReview }) => {
  console.log();
  const HandelDelete = async () => {
    console.log("delete");
    axios({
      method: "delete",
      url: "https://sakan-api.onrender.com/api/reviews/" + userReview._id,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
      });
  };
  return (
    <div className="review-card-container">
      <div className="review-card-details">
        <p>{userReview.review}</p>

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

      <div className="user-edit">
        {deleteCard && <MdDelete onClick={HandelDelete} className="delete" />}
      </div>
    </div>
  );
};
