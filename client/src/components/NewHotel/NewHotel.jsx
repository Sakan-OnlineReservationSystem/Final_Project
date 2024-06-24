import React from "react";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import "./NewHotel.css";
const hotel = {
  _id: "6672112d7cdfbb2394c6810b",
  name: "Hilton Alexandria Corniche",
  ownerId: "65bea8893e200fba6078f5d8",
  type: "hotel",
  city: "alex",
  address: ["\n544 El Geish Road , Sidi Bishr, 21611 Alexandria, Egypt\n"],
  country: "egypt",
  photos: [
    "https://res.cloudinary.com/dxnjhoovq/image/upload/v1718747942/nhd2unxq62gycg0omjmx.jpg",
  ],
  desc: "Boasting an ideal location in the heart of Alexandria, Hilton Alexandria Corniche features its own private beach and wellness facility. Guests can enjoy sea views from the panoramic pool terrace or indulge in various cuisines available at the 6 outlets.\n\nAll accommodations feature elegant and modern décor with free standard WIFI with speed up to 4MB. Each room is equipped with a flat-screen TV, a wardrobe and an electric kettle. Some includes a balcony or terrace with sea view. The suite comes with a living room.\n\nGuests can start the day with a breakfast or nutritious light bite; savor innovative dishes prepared with only the freshest ingredients from Greek, Lebanese, French, Asian to Middle Eastern cuisine, or simply relax with a cup of coffee in the hotel lounge.\n\nAfter an energizing workout at the fully equipped gym, guests have various options for relaxation such as massage treatments or hot tub, all at an added fee. For kids, the hotel offers a children’s playground in the summer by the beach.\n\nA number of restaurants, casinos and markets are situated on the Corniche, the 15 km of beachfront promenade. Al Nozha Alexandria Airport is 12 km away. A complimentary beach shuttle service is available.",
  numRatings: 7,
  rooms: [],
  featured: false,
  aminity: [
    "Outdoor swimming pool",
    "Beachfront",
    "Free WiFi",
    "Private parking",
    "Family rooms",
    "Airport shuttle",
    "Tea/coffee maker in all rooms",
    "Bar",
    "Private beach area",
    "Very good breakfast",
    "Outdoor swimming pool",
    "Beachfront",
    "Free WiFi",
    "Private parking",
    "Family rooms",
    "Airport shuttle",
    "Tea/coffee maker in all rooms",
    "Bar",
    "Private beach area",
    "Very good breakfast",
    "Toilet paper",
    "Towels",
    "Bath or shower",
    "Private bathroom",
    "Toilet",
    "Free toiletries",
    "Hairdryer",
    "Bath",
    "Shower",
    "Linen",
    "Wardrobe or closet",
    "Alarm clock",
    "Beachfront",
    "Sun terrace",
    "Private beach area",
    "BBQ facilities",
    "Balcony",
    "Terrace",
    "Tumble dryer",
    "Electric kettle",
    "Fold-up bed",
    "Live sport events (broadcast)",
    "Live music/performance",
    "Happy hour",
    "Themed dinner nights",
    "Beach",
    "Evening entertainment",
    "Water sport facilities on site",
    "Nightclub/DJ",
    "Entertainment staff",
    "Darts",
    "Karaoke",
    "Children's playground",
    "Desk",
    "Flat-screen TV",
    "Satellite channels",
    "Radio",
    "Telephone",
    "TV",
    "Coffee house on site",
    "Fruits",
    "Wine/champagne",
    "Kid meals",
    "Special diet menus (on request)",
    "Breakfast in the room",
    "Bar",
    "Minibar",
    "Restaurant",
    "Tea/Coffee maker",
    "Valet parking",
    "Parking garage",
    "Invoice provided",
    "Lockers",
    "Concierge service",
    "ATM/cash machine on site",
    "Luggage storage",
    "Tour desk",
    "Currency exchange",
    "24-hour front desk",
    "Kids' outdoor play equipment",
    "Babysitting/child services",
    "Daily housekeeping",
    "Trouser press",
    "Ironing service",
    "Dry cleaning",
    "Laundry",
    "Fax/photocopying",
    "Meeting/banquet facilities",
    "Fire extinguishers",
    "CCTV outside property",
    "CCTV in common areas",
    "Smoke alarms",
    "Security alarm",
    "Key card access",
    "24-hour security",
    "Safety deposit box",
    "Shuttle service",
    "Shared lounge/TV area",
    "Hypoallergenic",
    "Designated smoking area",
    "Air conditioning",
    "Allergy-free room",
    "Wake-up service",
    "Tile/marble floor",
    "Car hire",
    "Laptop safe",
    "Lift",
    "Heating",
    "Family rooms",
    "Barber/beauty shop",
    "Ironing facilities",
    "Facilities for disabled guests",
    "Airport shuttle",
    "Non-smoking rooms",
    "Iron",
    "Wake up service/Alarm clock",
    "Room service",
    "Toilet with grab rails",
    "Wheelchair accessible",
    "Entire unit wheelchair accessible",
    "Upper floors accessible by elevator",
    "Open all year",
    "All ages welcome",
    "Infinity pool",
    "Pool/beach towels",
    "Pool bar",
    "Sun umbrellas",
    "Fence around pool",
    "Kids' pool",
    "Fitness/spa locker rooms",
    "Personal trainer",
    "Fitness",
    "Massage chair",
    "Spa/wellness packages",
    "Spa lounge/relaxation area",
    "Steam room",
    "Spa facilities",
    "Body scrub",
    "Body treatments",
    "Waxing services",
    "Facial treatments",
    "Beauty Services",
    "Sun umbrellas",
    "Sun loungers or beach chairs",
    "Hot tub/Jacuzzi",
    "Massage",
    "Spa and wellness centre",
    "Sauna",
    "Arabic",
    "English",
  ],
  numberOfReviewers: 7,
  reviewScore: "normal",
  recommendation: [],
  numberOfStars: 7,
  __v: 0,
};

const NewHotel = () => {
  const stars = (stars) => {
    let componentsArr = [];
    for (let i = 0; i < stars; i++) {
      componentsArr.push(<IoIosStar key={i} style={{ color: "gold" }} />);
    }
    return <div style={{ display: "flex" }}>{componentsArr}</div>;
  };
  return (
    <div className="searchItem">
      <img src={hotel.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <Link to={`/hotels/${hotel._id}`}>
          <div className="siTitle">
            <h2>{hotel.name} </h2>
          </div>
        </Link>
        {stars(hotel.numberOfStars)}
        <div style={{ display: "flex" }}>
          <span className="siSubtitle">
            {hotel.city}, {hotel.country}
          </span>
        </div>
        <span className="siFeatures">{hotel.address}</span>
        <span className="siFeatures">{hotel.desc}</span>
      </div>
      <div className="siDetails NewHotelDetails">
        <span className="NewHotelType ">{hotel.type} </span>

        <Link to={`/ListProperty/NewProperty/NewRoom/${hotel._id}`}>
          <button className="siCheckButton AddHotelRoom">Add Rooms</button>
        </Link>
        <button className="siCheckButton RemoveHotel">Remove Hotel</button>
      </div>
    </div>
  );
};

export default NewHotel;
