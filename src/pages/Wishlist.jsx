import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../src/contexts/UserContext";
import { fetchFavouritesByUserId } from "../services/api";
import WishlistPropertyCard from "../components/features/WishList/WishlistPropertyCard";
import NoPropertyFound from "../components/features/NoPropertyFound";

const Wishlist = () => {
  const { user } = useContext(UserContext);
  const [wishList, setWishList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(0);

  const removeFavorite = (favoriteId) => {
    setWishList((prevFavorites) =>
      prevFavorites.filter((fav) => fav.favourite_id !== favoriteId)
    );
  };

  useEffect(() => {
    if (user?.user) {
      setUserId(user.user.user_id);
      fetchWishlist(user);
    }
  }, [user]);

  // get api call for favourites
  const fetchWishlist = async () => {
    try {
      setIsLoading(true);
      const response = await fetchFavouritesByUserId(user?.user.user_id);
      if (response.success) {
        setWishList(response.data.favourites);
        setError("");
      } else {
        switch (response.status) {
          case 404:
            setError("No favourites were found");
            break;
          case 400:
            setError("Bad request");
            break;
          case 500:
            setError("Server error occurred. Please try again later");
            break;
          default:
            setError("An error occurred while fetching favourites");
        }
        setWishList([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {error && <p className="error">{error}</p>}
      {isLoading && <p>loading...</p>}
      <h1 className="title">Wishlists</h1>
      {wishList.length === 0 && <NoPropertyFound pageName={"wishlist"} />}
      <ul className="property-grid">
        {wishList.map((prop) => {
          return (
            <WishlistPropertyCard
              key={prop.favourite_id}
              prop={prop}
              userId={userId}
              onDelete={removeFavorite}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Wishlist;
