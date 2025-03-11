import { useState, useEffect } from "react";
import { fetchPropertyTypeList } from "../../../services/api";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const PropertyTypeList = () => {
  const loc = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const property_typeFromQuery = searchParams.get("property_type");
  const [propertyTypeList, setpropertyTypeList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllItemStyle = () => {
    console.log(loc.search);
    if (property_typeFromQuery === "all" || loc.search === "") {
      return "property-type-selected";
    }
  };
  const getItemStyle = (prop_Type) => {
    const isSelectedPropertyType = propertyTypeList.findIndex(
      (prop) =>
        prop.property_type === property_typeFromQuery &&
        prop_Type === property_typeFromQuery
    );

    return isSelectedPropertyType !== -1 ? "property-type-selected" : "";
  };

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

  const updateURL = (value) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("property_type", value);
    return searchParams.toString();
  };
  return (
    <>
      {error && <p className="error">{error}</p>}
      <ul className="property-type-list">
        {!loading && (
          <Link
            to={{
              pathname: "/properties",
              search: `?property_type=all`,
            }}
            className="property-type-link"
            key="all"
          >
            <li className={`property-type-item ${getAllItemStyle()}`}>All</li>
          </Link>
        )}
        {propertyTypeList.map((propType) => {
          return (
            <Link
              to={{
                pathname: "/properties",
                search: `${updateURL(propType.property_type)}`,
              }}
              className="property-type-link"
              key={propType.property_type}
            >
              <li
                className={`property-type-item ${getItemStyle(
                  propType.property_type
                )}`}
              >
                {propType.property_type}
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default PropertyTypeList;
