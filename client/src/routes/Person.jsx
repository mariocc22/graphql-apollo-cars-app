import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_THEIR_CARS } from "../graphql/queries";
import PersonList from "../components/lists/PersonList";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const Person = () => {
  const { ownerId } = useParams();
  const { data } = useQuery(GET_PERSON_WITH_THEIR_CARS, {
    variables: { personWithTheirCarsId: ownerId },
  });
  const styles = getStyles();

  return (
    <div className="People">
      <Link to="/" style={styles.iconContainer}>
        <ArrowLeftCircleIcon width={50} height={50} color="black" />
      </Link>
      <div style={styles.container}>
        <h1>
          {data?.personWithTheirCars.firstName}{" "}
          {data?.personWithTheirCars.lastName}
        </h1>
        <img
          style={styles.avatar}
          src={"https://picsum.photos/200"}
          alt="User Avatar"
        />
      </div>
      <PersonList cars={data?.personWithTheirCars?.cars} personId={ownerId} />
    </div>
  );
};

const getStyles = () => ({
  iconContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column-reverse",
    margin: "1rem",
    gap: "1rem",
  },
  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    margin: "1rem",
    border: "3px solid black",
  },
});

export default Person;
