/* eslint-disable react/prop-types */
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS_BY_PERSON_ID, REMOVE_CAR } from "../../graphql/queries";

const RemoveCarPersonId = ({ id, ownerId }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const data = cache.readQuery({
        query: GET_CARS_BY_PERSON_ID,
        variables: { personWithTheirCarsId: ownerId },
      });

      if (data) {
        cache.writeQuery({
          query: GET_CARS_BY_PERSON_ID,
          variables: { personWithTheirCarsId: ownerId },
          data: {
            personWithTheirCars: {
              ...data.personWithTheirCars,
              cars: data.personWithTheirCars.cars.filter(
                (car) => car.id !== removeCar.id
              ),
            },
          },
        });
      }
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
    window.location.reload();
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemoveCarPersonId;
