import React, { useState } from "react";
import axios from "axios";

const PincodeToCoordinates = (funData) => {
    // funData.map(())
  console.log(funData.pincode);
  const [postcode, setPostcode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            format: "json",
            postalcode: postcode,
            country: "GB", // United Kingdom country code
          },
        }
      );

      if (response.data.length > 0) {
        setLatitude(response.data[0].lat);
        setLongitude(response.data[0].lon);
      } else {
        setLatitude("");
        setLongitude("");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Enter UK postcode"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
      />
      <button onClick={getCoordinates}>Get Coordinates</button>
      {latitude && longitude && (
        <div>
          Latitude: {latitude}, Longitude: {longitude}
        </div>
      )} */}
    </div>
  );
};

export default PincodeToCoordinates;
