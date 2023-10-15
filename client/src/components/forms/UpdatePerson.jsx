/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { GET_PEOPLE, UPDATE_PERSON } from "../../graphql/queries";

const UpdatePerson = ({ props, onButtonClick }) => {
  const { id, firstName, lastName } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [updatePerson] = useMutation(UPDATE_PERSON);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    onButtonClick();
  };

  return (
    <Form
      form={form}
      style={{ display: "flex", flexFlow: "row wrap", gap: "12px" }}
      name={`update-person-form-${id}`}
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName,
      }}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please enter a first name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please enter a last name" }]}
      >
        <Input placeholder="Last Name" />
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
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdatePerson;
