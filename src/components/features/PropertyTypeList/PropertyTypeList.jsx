import { useState, useEffect } from "react";
import { fetchPropertyTypeList } from "../../../services/api";
import { Link } from "react-router-dom";

const PropertyTypeList = () => {
  const [propertyTypeList, setpropertyTypeList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPropertyType();
  }, []);

  // get api call for PropertyTypeList
  const fetchPropertyType = async () => {
    try {
      setLoading(true);
      const { property_types } = await fetchPropertyTypeList();
      setpropertyTypeList(property_types);
      setError(null);
    } catch {
      setError("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="error">{error}</p>}
      {loading && <p>loading...</p>}
      <ul className="property-type-list">
        <Link
          to={{
            pathname: "/",
            search: `?property_type=all`,
          }}
          className="property-type-link"
          key="all"
        >
          <li className="property-type-item">All</li>
        </Link>
        {propertyTypeList.map((propType) => {
          return (
            <Link
              to={{
                pathname: "/",
                search: `?property_type=${propType.property_type}`,
              }}
              className="property-type-link"
              key={propType.property_type}
            >
              <li className="property-type-item">{propType.property_type}</li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default PropertyTypeList;
