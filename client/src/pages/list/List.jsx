import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import AppLoader from "../../components/Loading/AppLoader";

const List = () => {
  const location = useLocation();
  const [destination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [page, SetPage] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [filter, setFilter] = useState([]);
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&page=${page}&min=${min || 0}&max=${max || 999}`
  );
  const nextPage = () => {
    SetPage(page + 1);
    console.log(page);
  };
  const prevPage = () => {
    if (page > 1) {
      SetPage(page - 1);
    }
    console.log(page);
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
  if (error) {
    console.error(error);
    return <div>Error loading property list.</div>;
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div>
            <div className="listFilter">
              <div className="filterHeader">Filter by:</div>
              <div className="filterOptions">
                <div className="filerItem">
                  <input type="checkbox" className="checkbox"></input>
                  <p className="filterText">Stars</p>
                </div>
                <div className="filerItem">
                  <input type="checkbox" className="checkbox"></input>
                  <p className="filterText">Rating</p>
                </div>
                <div className="filerItem">
                  <input type="checkbox" className="checkbox"></input>
                  <p className="filterText">Price</p>
                </div>
              </div>
            </div>
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input placeholder={destination} type="text" />
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
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.adult}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      placeholder={options.children}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.room}
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
          </div>
          <div className="listResult">
            {loading ? (
              <AppLoader />
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
