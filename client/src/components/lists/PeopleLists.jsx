import { Card, Divider, List } from "antd";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../graphql/queries";
import { EditOutlined } from "@ant-design/icons";
import RemovePerson from "../buttons/RemovePerson";
import { useState } from "react";

import SubListCars from "./SubListCars";

const PeopleLists = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <Divider orientation="center" style={{ fontSize: 28 }}>
        Records
      </Divider>
      <List
        bordered={false}
        style={{ width: "100%" }}
        dataSource={data ? data.people : []}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={`${item.firstName} ${item.lastName}`}
              style={{ width: "100%" }}
              actions={[
                <EditOutlined key="edit" onClick={handleButtonClick} />,
                <RemovePerson id={item.id} key={item.id} />,
              ]}
            >
              <SubListCars props={item} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default PeopleLists;
