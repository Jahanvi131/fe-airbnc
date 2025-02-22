import PriceRangeInput from "./PriceRangeInput";
import SortDropdown from "./SortDropDown";

const PropertyFilter = () => {
  return (
    <div className="inline-block md:flex content-stretch justify-between items-center">
      <PriceRangeInput />
      <SortDropdown />
    </div>
  );
};

export default PropertyFilter;
