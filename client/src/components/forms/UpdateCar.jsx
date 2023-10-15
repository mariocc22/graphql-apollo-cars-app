/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { Button, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_CAR } from "../../graphql/queries";

const UpdateCar = (props) => {
  const { id, make, model, price, year } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [updateCar] = useMutation(UPDATE_CAR);

  const onFinish = (values) => {
    const { make, model, price, year } = values;

    updateCar({
      variables: {
        id,
        make,
        model,
        price: parseFloat(price),
        year: parseInt(year),
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      style={{ display: "flex", flexFlow: "row wrap", gap: "12px" }}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        make,
        model,
        price,
        year,
      }}
    >
      <Form.Item
        name="year"
        label="Year"
        rules={[{ required: true, message: "Please enter a year" }]}
      >
        <InputNumber min={1} max={2023} placeholder="Year" />
      </Form.Item>
      <Form.Item
        name="make"
        label="Make"
        rules={[{ required: true, message: "Please enter the Make Company" }]}
      >
        <Input placeholder="Make" />
      </Form.Item>
      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please enter the Car Model" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <InputNumber prefix="$" min={1} />
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
