/* eslint-disable react/prop-types */
import { Card, List } from "antd";
import { useQuery } from "@apollo/client";
import { GET_CARS_BY_PERSON_ID } from "../../graphql/queries";
import CarCard from "../listItems/CarCard";

const SubListCars = ({ props }) => {
  const { id, firstName, lastName } = props;
  const { loading, error, data } = useQuery(GET_CARS_BY_PERSON_ID, {
    variables: { personId: id },
  });

  console.log("data", data);

  return (
    <List
      style={{ width: "100%" }}
      bordered={false}
      dataSource={!data ? [] : data.carsByPersonId}
      renderItem={(item) => (
        <List.Item style={{ display: "block", width: "100%" }}>
          <CarCard props={item} />
        </List.Item>
      )}
    />
  );
};

export default SubListCars;
