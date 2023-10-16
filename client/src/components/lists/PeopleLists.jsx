import { Card, Divider, List, Typography } from "antd";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../graphql/queries";
import { EditOutlined } from "@ant-design/icons";
import RemovePerson from "../buttons/RemovePerson";
import { useState } from "react";

import { Link } from "react-router-dom";

import SubListCars from "./SubListCars";
import UpdatePerson from "../forms/UpdatePerson";

const PeopleLists = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [editMode, setEditMode] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState(null);
  const { Text } = Typography;

  const handleButtonClick = (id) => {
    setEditMode(!editMode);
    setEditingPersonId(id);
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
          <List.Item key={item.id}>
            {editingPersonId === item.id ? (
              <UpdatePerson
                props={item}
                onButtonClick={() => handleButtonClick(null)}
              />
            ) : (
              <Card
                title={`${item.firstName} ${item.lastName}`}
                style={{ width: "100%" }}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => handleButtonClick(item.id)}
                  />,
                  <RemovePerson id={item.id} key={item.id} />,
                ]}
              >
                <SubListCars props={item} />
                <Link to={`people/${item.id}`}>
                  <Text
                    style={{
                      color: "blue",
                      opacity: "0.65",
                      margin: "1rem 0",
                      fontSize: "1rem",
                    }}
                  >
                    Learn More
                  </Text>
                </Link>
              </Card>
            )}
          </List.Item>
        )}
      />
    </>
  );
};

export default PeopleLists;
