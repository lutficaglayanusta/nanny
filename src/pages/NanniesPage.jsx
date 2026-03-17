import { useEffect } from "react";
import CardSection from "../components/CardSection/CardSection";
import { useDispatch } from "react-redux";
import { fetchAllPersons } from "../redux/persons/operations";

const NanniesPage = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllPersons())
  },[dispatch])

  return (
    <section>
         <CardSection/>
    </section>
  );
};

export default NanniesPage;
