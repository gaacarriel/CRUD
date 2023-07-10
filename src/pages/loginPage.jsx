import { Button, Form, FormInstance, Input, Space } from 'antd';
import React from 'react';


const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);

    const saveLogin = (arg: any) => {
        console.log(arg)
    }

    // Watch all values
    const values = Form.useWatch([], form);
    // console.log(values);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
        },
            () => {
                setSubmittable(false);
        },
        );
    }, [values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable} onClick={() => saveLogin(values)}>
            Login
        </Button>
        );
    };

export const LoginPage = () => {
    const [form] = Form.useForm();

    return (
        <main>
            <div className="boxForm">
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Space>
                    <SubmitButton form={form} />
                    <Button htmlType="reset">Reset</Button>
                    </Space>
                </Form.Item>
                </Form>
            </div>
        </main>
    )
}