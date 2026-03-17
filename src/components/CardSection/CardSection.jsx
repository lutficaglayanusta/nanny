import { useSelector } from "react-redux";
import { selectPerson } from "../../redux/persons/selector";
import styles from "./CardSection.module.css";

const CardSection = () => {
  const products = useSelector(selectPerson);

  console.log(products);

  return (
    <div>
      <div className="container">
        <div>
          {products.map((product, index) => (
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
                    <li><span className={styles.color}>Experience:</span> {product.experience}</li>
                    <li><span className={styles.color}>Kids Age:</span> {product.kids_age}</li>
                    <li><span className={styles.color}>Characters:</span> {product.characters} </li>

                    <li><span className={styles.color}>Education:</span> {product.education}</li>
                  </ul>
                  <p className={styles.about}>{product.about}</p>
                  <ul className={styles.item}>
                    {product.reviews.map((item) => (
                      <li>
                        <div className={styles.review}>
                          <p className={styles.title}>{item.reviewer[0].toUpperCase()}</p>
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
