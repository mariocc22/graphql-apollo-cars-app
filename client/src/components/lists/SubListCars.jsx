/* eslint-disable react/prop-types */
import { Card, List } from "antd";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../graphql/queries";
import CarCard from "../listItems/CarCard";

const SubListCars = ({ props }) => {
  const { id } = props;
  const { loading, error, data } = useQuery(GET_CARS);

  return (
    <List
      style={{ width: "100%" }}
      bordered={false}
      dataSource={!data ? [] : data.cars.filter((car) => car.personId === id)}
      renderItem={(item) => (
        <List.Item style={{ display: "block", width: "100%" }}>
          <CarCard props={item} personId={id} />
        </List.Item>
      )}
    />
  );
};

export default SubListCars;
