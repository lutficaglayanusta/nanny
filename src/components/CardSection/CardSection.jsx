import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPerson } from "../../redux/persons/selector";
import { fetchAllPersons } from "../../redux/persons/operations";
import styles from "./CardSection.module.css";

const CardSection = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectPerson);

  useEffect(() => {
    dispatch(fetchAllPersons());
  }, [dispatch]);

  console.log(products);

  return (
    <div>
      <div className="container">
        <div>
          {products.map((product, index) => (
            <div className={styles.card} key={index}>
              <img src={product.avatar_url} width={96} height={96} alt="" />
              <div className={styles.cardItem}>
                <div>
                  <h2>{product.name}</h2>
                  <ul className={styles.all}>
                    <li>
                      Age:{" "}
                      {new Date().getFullYear() -
                        new Date(product.birthday).getFullYear()}
                    </li>
                    <li>Experience: {product.experience}</li>
                    <li>Kids Age: {product.kids_age}</li>
                    <li>Characters: {product.characters} </li>

                    <li>Education: {product.education}</li>
                  </ul>
                  <p className={styles.about}>{product.about}</p>
                  <ul>
                    {product.reviews.map((item) => (
                      <li>
                        <p>{item.reviewer[0].toUpperCase()}</p>
                        <div>
                          <p>{item.reviewer}</p>
                          <p>{item.rating}</p>
                        </div>

                        <p>{item.comment}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className={styles.info}>
                  <li>{product.location}</li>
                  <li>{product.rating}</li>
                  <li>{product.price_per_hour}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSection;
