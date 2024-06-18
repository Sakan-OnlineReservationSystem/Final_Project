import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import NotFound from "../../components/NotFound/NotFound";
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
        <div className="siDetailTexts  ">
          <div className="siPrice bg-slate-200  h-8 "></div>
          <div className="siTaxOp bg-slate-200  h-4"></div>
          <button className=" bg-slate-200 h-12 "></button>
        </div>
      </div>
    </div>
  );
};

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [page, SetPage] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [chosenFacilities, setChosenFacilities] = useState([]);
  const [chosenRoomFacilities, setChosenRoomFacilities] = useState([]);
  const [chosenReviewScore, setChosenReviewScore] = useState([]);
  const [stars, setStars] = useState([]);
  const [formValues, setFormValues] = useState([]);
  const handleDestination = (e) => {
    setFormValues([...formValues, e.target.value]);
    setDestination(e.target.value);
  };
  const RoomFacilities = [
    "Private pool",
    "Private bathroom",
    "Air conditioning",
    "Balcony",
    "Kitchen/Kitchenette",
    "Shower",
    "Terrace",
    "Refrigerator",
    "Hot tub",
    "TV",
    "Toilet",
    "Pool with a view",
    "Board games/puzzles",
    "Towels",
    "View",
    "Toilet paper",
    "Entire unit located on ground floor",
    "Infinity Pool",
    "Garden view",
    "Pool cover",
    "Heating",
    "Patio",
    "Coffee/Tea maker",
    "High chair",
    "Fax",
  ];
  let Facilities = [
    "Parking",
    "Free WiFi",
    "Restaurant",
    "Pet friendly",
    "Room service",
    "24-hour front desk",
    "Fitness center",
    "Non-smoking rooms",
    "Airport shuttle",
    "Family rooms",
    "Spa",
    "Electric vehicle charging station",
    "Wheelchair accessible",
    "Swimming pool",
  ];

  let ReviewScore = ["Wonderful", "Very Good", "Good", "Pleasant"];

  let PropertyRating = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  /*   const [filter, setFilter] = useState([]);
   */ const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&page=${page}&adults=${
      options.adult || 2
    }&children=${options.children || 0}&rooms=${
      options.room
    }&aminities=${chosenFacilities}&roomFacilities=${chosenRoomFacilities}&reviewScore=${chosenReviewScore}&stars=${
      stars || 7
    }`
  );

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
  const handleClick = () => {
    reFetch();
  };
  const handleChecked = (event) => {
    if (event.target.checked) {
      if (event.target.name === "Facility")
        setChosenFacilities([...chosenFacilities, event.target.id]);
      if (event.target.name === "RoomFacility")
        setChosenRoomFacilities([...chosenRoomFacilities, event.target.id]);
      if (event.target.name === "Score")
        setChosenReviewScore([...chosenReviewScore, event.target.id]);
      if (event.target.name === "Rating") setStars([...stars, event.target.id]);
    } else {
      if (event.target.name === "Facility")
        setChosenFacilities(
          chosenFacilities.filter((obj) => obj !== event.target.id)
        );
      if (event.target.name === "RoomFacility")
        setChosenRoomFacilities(
          chosenRoomFacilities.filter((obj) => obj !== event.target.id)
        );
      if (event.target.name === "Score")
        setChosenReviewScore(
          chosenReviewScore.filter((obj) => obj !== event.target.id)
        );
      if (event.target.name === "Rating")
        setStars(stars.filter((obj) => obj !== event.target.id));
    }
    SetPage(1);
    reFetch();
  };
  if (error) {
    toast.error(error.message);
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="ListSidebar">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input
                  placeholder={destination}
                  onChange={handleDestination}
                  type="text"
                />
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  dates[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                )}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      type="number"
                      min={2}
                      onChange={(e) =>
                        setOptions({ ...options, adult: e.target.value })
                      }
                      className="lsOptionInput"
                      placeholder={options.adult}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      min={0}
                      onChange={(e) =>
                        setOptions({ ...options, children: e.target.value })
                      }
                      className="lsOptionInput"
                      placeholder={options.children}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      onChange={(e) =>
                        setOptions({ ...options, room: e.target.value })
                      }
                      className="lsOptionInput"
                      placeholder={options.room}
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
            <div className="listFilter">
              <div className="filterHeader">Filter by:</div>
              <div className="filterOptions">
                <div className="filterSubHeader ">Facilities</div>
                {Facilities.map((facility, index) => {
                  return (
                    <div key={index} className="filerItem">
                      <input
                        name="Facility"
                        id={facility}
                        type="checkbox"
                        className="checkbox"
                        onChange={handleChecked}
                      ></input>
                      <p className="filterText">{facility}</p>
                    </div>
                  );
                })}
              </div>
              <div className="filterOptions">
                <div className="filterSubHeader ">Review Score</div>
                {ReviewScore.map((Score, index) => {
                  return (
                    <div key={index} className="filerItem">
                      <input
                        name="Score"
                        id={Score}
                        type="checkbox"
                        className="checkbox"
                        onChange={handleChecked}
                      ></input>
                      <p className="filterText">{Score}</p>
                    </div>
                  );
                })}
              </div>
              <div className="filterOptions">
                <div className="filterSubHeader ">Property rating</div>
                {PropertyRating.map((rating, index) => {
                  return (
                    <div key={index} className="filerItem">
                      <input
                        name="Rating"
                        id={rating}
                        type="checkbox"
                        className="checkbox"
                        onChange={handleChecked}
                      ></input>
                      <p className="filterText">
                        {rating} {rating === 1 ? "Star" : "Stars"}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="filterOptions">
                <div className="filterSubHeader ">Room facilities</div>
                {RoomFacilities.map((facility, index) => {
                  return (
                    <div key={index} className="filerItem">
                      <input
                        name="RoomFacility"
                        id={facility}
                        type="checkbox"
                        className="checkbox"
                        onChange={handleChecked}
                      ></input>
                      <p className="filterText">{facility}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="listResult">
            {loading ? (
              <div className="flex gap-4 flex-col">
                {[...Array(10)].map((_, i) => (
                  <Suspense key={i} />
                ))}
              </div>
            ) : (
              <>
                {data.length !== 0 && !error ? (
                  <>
                    {data.map((item) => (
                      <SearchItem item={item} key={item._id} />
                    ))}
                    <div className="pagination_container">
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
