import React from 'react';
import animationData from '../animations/login.animation.json'
import Lottie from 'react-lottie';
import { Button, Form, FormInstance, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    
    const SubmitButton = ({ form }: {form: FormInstance}) => {
        const [submittable, setSubmittable] = React.useState(false);
    
        const saveLogin = (arg: any) => {
            console.log(arg)
            navigate("/dashboard")
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

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

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
                <Lottie 
                    options={defaultOptions}
                    height={400}
                    width={400}
                />
            </div>
        </main>
    )
}