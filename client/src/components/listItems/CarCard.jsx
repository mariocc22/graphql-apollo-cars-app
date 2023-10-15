/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Card, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const CarCard = ({ props }) => {
  const { id, make, model, year, price } = props;
  const styles = getStyles();
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdateCar props={props} onButtonClick={handleButtonClick} />
      ) : (
        <Card
          headStyle={{ backgroundColor: "#D9D9D9" }}
          size="small"
          bordered={false}
          style={styles.card}
          title={`${year} ${make} ${model} >> $  ${price}`}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
        ></Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "100%",
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#808080	",
  },
});

export default CarCard;
