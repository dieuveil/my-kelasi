import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { resetPassword } from "../authService";

export default function ResetPassword() {

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    const result = await resetPassword(values.email);

    if (result.success) {
      message.success("Password reset email sent. Check your inbox.");
    } else {
      message.error(result.error);
    }

    setLoading(false);
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", marginTop:"100px" }}>

      <Card title="Reset Password" style={{ width: 400 }}>

        <Form layout="vertical" onFinish={onFinish}>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email" }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Send Reset Link
            </Button>
          </Form.Item>

        </Form>

      </Card>

    </div>
  );
}