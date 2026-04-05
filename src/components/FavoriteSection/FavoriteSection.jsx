import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import styles from "./FavoriteSection.module.css";
import { selectFavorites } from "../../redux/favorites/selector";
import { addFavorite, removeFavorite } from "../../redux/favorites/slice";
import ApplyForm from "../../ApplyForm/ApplyForm";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    backdropFilter: "blur(4px)",
    zIndex: 200,
  },
  content: {
    padding: 0,
    border: "none",
    borderRadius: "30px",
    maxHeight: "90vh",
    inset: "50% auto auto 50%",
    transform: "translate(-50%, -50%)",
  },
};

const FavoriteSection = () => {
  const favorites = useSelector(selectFavorites);
  const [sourceProducts, setSourceProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [product, setProduct] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (product) => {
    setIsOpen(true);
    setProduct(product);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    setSourceProducts(favorites);
    setVisibleCount(3);
  }, [favorites]);

  const handleToggleFavorite = (product) => {
    const isExist = favorites.some(
      (favorite) => favorite.name === product.name,
    );
    if (isExist) {
      dispatch(removeFavorite(product));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const handleSort = (e) => {
    const value = e.target.value;
    let result = [...favorites];

    if (value === "Z to A") {
      result.reverse();
    } else if (value === "Less than 10$") {
      result = result.filter((p) => p.price_per_hour < 10);
    } else if (value === "Greater than 10$") {
      result = result.filter((p) => p.price_per_hour > 10);
    } else if (value === "Popular") {
      result = result.filter((p) => p.rating >= 4.5);
    } else if (value === "Not popular") {
      result = result.filter((p) => p.rating < 4.5);
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    setSourceProducts(result);
    setVisibleCount(3);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const displayProducts = sourceProducts.slice(0, visibleCount);
  const showLoadMore = visibleCount < sourceProducts.length;

  return (
    <div>
      <div className="container">
        <p className={styles.filters}>Filters</p>
        <select onChange={handleSort} className={styles.sort}>
          <option value="A to Z">A to Z</option>
          <option value="Z to A">Z to A</option>
          <option value="Less than 10$">Less than 10$</option>
          <option value="Greater than 10$">Greater than 10$</option>
          <option value="Popular">Popular</option>
          <option value="Not popular">Not popular</option>
          <option value="">Show all</option>
        </select>
        <div>
          {displayProducts.map((product, index) => (
            <div className={styles.card} key={index}>
              <img src={product.avatar_url} width={96} height={96} alt="" />
              <div className={styles.cardItem}>
                <ul className={styles.info}>
                  <li>
                    <img src="../../../map-pin.svg" alt="location" />
                    {product.location}
                  </li>
                  <li>
                    <img src="../../../star.svg" alt="" />
                    {product.rating}
                  </li>
                  <li>Price / 1 hour: {product.price_per_hour}</li>
                  <li>
                    <button
                      className={styles.heartBtn}
                      onClick={() => handleToggleFavorite(product)}
                    >
                      {favorites.some(
                        (favorite) => favorite.name === product.name,
                      )
                        ? "♥"
                        : "♡"}
                    </button>
                  </li>
                </ul>
                <div className={styles.cardinfo}>
                  <h2 className={styles.heading}>{product.name}</h2>
                  <ul className={styles.all}>
                    <li>
                      <span className={styles.color}>Age:</span>{" "}
                      {new Date().getFullYear() -
                        new Date(product.birthday).getFullYear()}
                    </li>
                    <li>
                      <span className={styles.color}>Experience:</span>{" "}
                      {product.experience}
                    </li>
                    <li>
                      <span className={styles.color}>Kids Age:</span>{" "}
                      {product.kids_age}
                    </li>
                    <li>
                      <span className={styles.color}>Characters:</span>{" "}
                      {product.characters.map(char => char.charAt(0).toUpperCase() + char.slice(1)).join(", ")}
                    </li>
                    <li>
                      <span className={styles.color}>Education:</span>{" "}
                      {product.education}
                    </li>
                  </ul>
                  <p className={styles.about}>{product.about}</p>
                  <ul className={styles.item}>
                    {product.reviews.map((item, index) => (
                      <li key={index}>
                        <div className={styles.review}>
                          <p className={styles.title}>
                            {item.reviewer[0].toUpperCase()}
                          </p>
                          <div>
                            <p>{item.reviewer}</p>
                            <div className={styles.star}>
                              <img src="../../../star.svg" alt="" />
                              <p>{item.rating}</p>
                            </div>
                          </div>
                        </div>
                        <p className={styles.comment}>{item.comment}</p>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal(product)}
                    className={styles.make}
                  >
                    Make an appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showLoadMore && (
          <button onClick={loadMore} className={styles.load}>
            Load More
          </button>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ApplyForm product={product} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

export default FavoriteSection;
