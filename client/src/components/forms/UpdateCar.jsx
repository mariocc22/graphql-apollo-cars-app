/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import {
  UPDATE_CAR,
  GET_PEOPLE,
  GET_CARS_BY_PERSON_ID,
} from "../../graphql/queries";

const UpdateCar = ({ props, onButtonClick, personId }) => {
  const { id, make, model, price, year } = props;
  const { error, data } = useQuery(GET_PEOPLE);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [people, setPeople] = useState([]);

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

  const [updateCar] = useMutation(UPDATE_CAR);

  const onFinish = (values) => {
    const { make, model, price, year, personId } = values;

    updateCar({
      variables: {
        id,
        make,
        model,
        price: parseFloat(price),
        year: parseInt(year),
        personId: personId,
      },
      update: (cache, { data: { updateCar } }) => {
        const data = cache.readQuery({
          query: GET_CARS_BY_PERSON_ID,
          variables: { personId },
        });
        if (!data) return;
        cache.writeQuery({
          query: GET_CARS_BY_PERSON_ID,
          data: {
            ...data,
            cars: [...data.carsByPersonId, updateCar],
          },
        });
      },
    });
    onButtonClick();
  };

  return (
    <Form
      form={form}
      style={{ display: "flex", flexFlow: "row wrap", gap: "12px" }}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year,
        make,
        model,
        price,
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
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
