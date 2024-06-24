import React, { useState, useEffect, useContext } from "react";
import "./NewProperty.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import TextareaAutosize from "react-textarea-autosize";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const aminity = [
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
];

const NewProperty = () => {
  const [images, setImages] = useState([]);
  const user = useContext(AuthContext);
  const [base64Images, setBase64Images] = useState([]);

  const [propertyDetails, setPropertyDetails] = useState({
    name: "",
    type: "Hotel",
    city: "",
    country: "",
    desc: "",
    address: "",
    aminity: [],
    photos: [],
    ownerId: user.user.user._id,
  });

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    setPropertyDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setPropertyDetails((prevState) => ({
        ...prevState,
        aminity: [...prevState.aminity, id],
      }));
    } else {
      setPropertyDetails((prevState) => ({
        ...prevState,
        aminity: prevState.aminity.filter((amenity) => amenity !== id),
      }));
    }
  };

  useEffect(() => {
    const convertBlobToBase64 = async (blobUrl) => {
      try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Error converting blob to Base64:", error);
        return null;
      }
    };

    const fetchAndConvertBlobUrls = async () => {
      const base64Results = await Promise.all(
        images.map((url) => convertBlobToBase64(url))
      );
      setBase64Images(base64Results.filter((result) => result !== null));
    };

    fetchAndConvertBlobUrls();
  }, [images]);

  useEffect(() => {
    setPropertyDetails((prevState) => ({
      ...prevState,
      photos: base64Images,
    }));
  }, [base64Images]);

  const handleSubmit = async () => {
    // Handle form submission, e.g., send data to server
    console.log(propertyDetails);
    try {
      const response = await axios.post("/api/hotels", propertyDetails, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      console.log("Reservation successful:", response.data);
      // handle successful reservation
    } catch (err) {
      console.log("Error making reservation");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="NewPropertyMainContainer">
        <div className="NewPropertyInputContainer">
          <h2>Add Property Details</h2>
          <div className="LineBreak"></div>
          <div className="RoomInputHoldersHolder">
            <div className="InputHolders">
              <p>Name</p>
              <input
                placeholder="Hilton Alexandria Corniche"
                type="text"
                value={propertyDetails.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>
            <div className="InputHolders">
              <p>Type</p>
              <select
                id="options"
                value={propertyDetails.type}
                onChange={(e) => handleInputChange(e, "type")}
              >
                <option value="Hotel">Hotel</option>
                <option value="Apartment">Apartment</option>
                <option value="Resort">Resort</option>
                <option value="Villa">Villa</option>
                <option value="Cabin">Cabin</option>
              </select>
            </div>
          </div>
          <div className="RoomInputHoldersHolder">
            <div className="InputHolders">
              <p>City</p>
              <input
                placeholder="Alexandria"
                type="text"
                value={propertyDetails.city}
                onChange={(e) => handleInputChange(e, "city")}
              />
            </div>
            <div className="InputHolders">
              <p>Country</p>
              <input
                placeholder="Egypt"
                type="text"
                value={propertyDetails.country}
                onChange={(e) => handleInputChange(e, "country")}
              />
            </div>
          </div>
          <div className="InputHolders">
            <p>Address</p>
            <input
              placeholder="544 El Geish Road, Sidi Bishr, 21611 Alexandria, Egypt"
              type="text"
              value={propertyDetails.address}
              onChange={(e) => handleInputChange(e, "address")}
            />
          </div>
          <div className="InputHolders">
            <p>Description</p>
            <TextareaAutosize
              placeholder="Great room"
              minRows={2}
              value={propertyDetails.desc}
              onChange={(e) => handleInputChange(e, "desc")}
            />
          </div>
          <div className="roomFacilities">
            <p>Room Facilities</p>
            <div className="LineBreak"></div>
            <div className="RoomFacilitiesContainer">
              {aminity.map((facility, index) => (
                <div key={index} className="RoomFacilityItem">
                  <input
                    id={facility}
                    type="checkbox"
                    className="RoomFacilityCheckbox"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={facility} className="RoomFacilityLabel">
                    {facility}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="LineBreak"></div>
          <ImageUpload images={images} setImages={setImages} />
          <div className="LineBreak"></div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="RouterBtn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageUpload = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const imagesArray = Array.from(fileList).map((file) =>
      URL.createObjectURL(file)
    );
    setImages(imagesArray);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} multiple />
      <div className="NewPropertyImagesRapper">
        {images.map((image, index) => (
          <img
            className="NewPropertyImg"
            key={index}
            src={image}
            alt={`${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewProperty;
