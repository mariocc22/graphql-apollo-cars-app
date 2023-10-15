import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, InputNumber, Select, Divider } from "antd";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { GET_PEOPLE, ADD_CAR, GET_CARS } from "../../graphql/queries";

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const { error, data } = useQuery(GET_PEOPLE);
  const [people, setPeople] = useState([]);

  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    if (data && data.people) {
      const options = data.people.map((person) => ({
        value: person.id,
        label: `${person.firstName} ${person.lastName}`,
      }));
      setPeople(options);
    }
    forceUpdate({});
  }, [data]);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        if (!data) return;
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
    form.resetFields();
  };

  return (
    <div>
      <Divider orientation="center" style={{ fontSize: 28 }}>
        Add Car
      </Divider>
      <Form
        name="add-car-form"
        layout="inline"
        size="large"
        form={form}
        onFinish={onFinish}
        className="carForm"
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
        <Form.Item
          name="personId"
          label="Person"
          rules={[{ required: true, message: "Please select a person" }]}
        >
          <Select placeholder="Select a person" options={people} />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length ||
                !people.length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCar;
