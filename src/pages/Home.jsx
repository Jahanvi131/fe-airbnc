import PropertyTypeList from "../components/features/PropertyTypeList/PropertyTypeList";
import PropertyList from "../components/features/PropertyList/PropertyList";
import PropertyFilter from "../components/features/PropertyList/PropertyFilter";

const Home = () => {
  return (
    <div>
      <PropertyTypeList />
      <PropertyFilter />
      <PropertyList />
    </div>
  );
};

export default Home;
