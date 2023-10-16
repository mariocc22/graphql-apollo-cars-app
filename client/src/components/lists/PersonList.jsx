import { Divider, List } from "antd";
import CarCard from "../listItems/CarCard";

const PersonList = ({ cars, personId }) => {
  return (
    <>
      <Divider orientation="center" style={{ fontSize: 28 }}>
        Cars
      </Divider>
      <List
        bordered={false}
        style={{ width: "100%" }}
        dataSource={cars ? cars : []}
        renderItem={(item) => (
          <List.Item key={item.id} style={{ display: "block", width: "100%" }}>
            <CarCard props={item} personId={personId} />
          </List.Item>
        )}
      />
    </>
  );
};

export default PersonList;
