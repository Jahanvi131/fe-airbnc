import kitchenicon from "../../../assets/kitchen-icon.svg";
import parkingicon from "../../../assets/parking-icon.svg";
import hottubicon from "../../../assets/hot-tub-icon.svg";
import peticon from "../../../assets/pets-icon.svg";
import bathicon from "../../../assets/bath-icon.svg";
import wifiicon from "../../../assets/wifi-icon.svg";
import hairdryericon from "../../../assets/hair-dryer-icon.svg";
import firpiticon from "../../../assets/firepit-icon.svg";
import smokealaramicon from "../../../assets/smokealaram-icon.svg";
import firstaidkiticon from "../../../assets/firstaidkit-icon.svg";

const PropertyAmenities = () => {
  return (
    <div className="amenities-section">
      <h3>What this place offers</h3>
      <div className="amenities-grid">
        <div className="amenity-item">
          <img src={kitchenicon} alt="" className="amenity-icon" />
          <span className="amenity-text">Kitchen</span>
        </div>
        <div className="amenity-item">
          <img src={parkingicon} alt="" className="amenity-icon" />
          <span className="amenity-text">Free parking on premises</span>
        </div>
        <div className="amenity-item">
          <img src={hottubicon} alt="" className="amenity-icon" />
          <span className="amenity-text">Private hot tub</span>
        </div>
        <div className="amenity-item">
          <img src={peticon} alt="" className="amenity-icon" />
          <span className="amenity-text">Pets allowed</span>
        </div>
        <div className="amenity-item">
          <img src={bathicon} alt="" className="amenity-icon" />
          <span className="amenity-text">Bath</span>
        </div>
        <div className="amenity-item">
          <img src={wifiicon} alt="" className="amenity-icon" />
          <span className="amenity-text">Wifi – 48 Mbps</span>
        </div>
        <div className="amenity-item">
          <img src={hairdryericon} alt="" className="amenity-icon" />
          <span className="amenity-text">Hair dryer</span>
        </div>
        <div className="amenity-item">
          <img src={firpiticon} alt="" className="amenity-icon" />
          <span className="amenity-text">Firepit</span>
        </div>
        <div className="amenity-item">
          <img src={smokealaramicon} alt="" className="amenity-icon" />
          <span className="amenity-text">Smoke alarm</span>
        </div>
        <div className="amenity-item">
          <img src={firstaidkiticon} alt="" className="amenity-icon" />
          <span className="amenity-text">First aid kit</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyAmenities;
