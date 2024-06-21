import React from "react";
import "./NewProperty.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import TextareaAutosize from "react-textarea-autosize";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NewProperty = () => {
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

  const { register, control } = useForm({
    defaultValues: {
      HotelPhotos: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "HotelPhotos",
    control,
  });

  function Render(control) {
    const photos = useWatch({
      control,
      name: "HotelPhotos",
    });

    console.log("co", photos);
  }

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
              <input placeholder="Hilton Alexandria Corniche" type="text" />
            </div>
            <div className="InputHolders">
              <p>Type</p>
              <input placeholder="Hotel" type="text" />
            </div>
          </div>
          <div className="RoomInputHoldersHolder">
            <div className="InputHolders">
              <p>City</p>
              <input placeholder="alex" type="text" />
            </div>
            <div className="InputHolders">
              <p>Country</p>
              <input placeholder="Egypt" type="text" />
            </div>
          </div>

          <div className="InputHolders">
            <p>Address</p>
            <input
              placeholder="\n544 El Geish Road , Sidi Bishr, 21611 Alexandria, Egypt"
              type="text"
            />
          </div>
          <div className="InputHolders">
            <p>Description</p>
            <TextareaAutosize placeholder="Great room" minRows={2} />
          </div>
          <div className="roomFacilities">
            <p>roomFacilities</p>
            <div className="LineBreak"></div>
            <div className="RoomFacilitiesContainer">
              {aminity.map((facility, index) => {
                return (
                  <div key={index} className="RoomFacilityItem">
                    <input
                      id={facility}
                      type="checkbox"
                      className="RoomFacilityCheckbox"
                    ></input>
                    <p className="RoomFacilityLabel">{facility}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="LineBreak"></div>

          <div className="NewRoomNumbersHolder">
            <div className="NewRoomNumbersInputs">
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <input
                      type="file"
                      {...register(`HotelPhotos.${index}.name`)}
                    />
                    <button type="button" onClick={() => remove(index)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  append();
                }}
              >
                Append
              </button>
            </div>
          </div>
          <div className="LineBreak"></div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="RouterBtn" onClick={Render}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProperty;
