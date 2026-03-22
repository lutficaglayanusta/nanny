import { useDispatch, useSelector } from "react-redux";
import { selectPerson } from "../../redux/persons/selector";
import { selectFavorites } from "../../redux/favorites/selector";
import { addFavorite, removeFavorite } from "../../redux/favorites/slice";
import styles from "./CardSection.module.css";
import { useEffect, useState } from "react";

const CardSection = () => {


  const [part, setPart] = useState(0)
  

  

  const products = useSelector(selectPerson);

  const newProducts = products.slice(0,part+3)


  const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();

  useEffect(() => {
    setPart(0)
  },[products])

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

  const loadMore = (e) => {
    setPart(part + 3)
    if (part + 4 >= products.length) {
      e.target.style.display = "none"
    }
  }


  return (
    <div>
      <div className="container">
        <div>
          {newProducts.map((product, index) => (
            <div className={styles.card} key={index}>
              <img src={product.avatar_url} width={96} height={96} alt="" />
              <div className={styles.cardItem}>
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
                      {product.characters}{" "}
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
                  <button className={styles.make}>Make an appointment</button>
                </div>

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
              </div>
            </div>
          ))}
        </div>
        {
          products.length > 3 && newProducts.length < products.length && <button onClick={loadMore} className={styles.load}>Load More</button>
        }
        
      </div>

    </div>
  );
};

export default CardSection;
