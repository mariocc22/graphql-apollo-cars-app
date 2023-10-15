/* eslint-disable react/prop-types */
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR } from "../../graphql/queries";

const RemovePerson = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });

      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: cars.filter((car) => car.id !== removeCar.id),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");

    if (result) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemovePerson;
