import { Modal, Form, Input } from "antd"
import { useDispatch } from "react-redux";
import { save } from "../features/users/user-slicer";
import { useState } from "react";
import { isInputElement } from "react-router-dom/dist/dom";

interface iPropsModal{
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalCreateUser = ({ isModalOpen, setIsModalOpen }: iPropsModal) => {
    const [form] = Form.useForm();
    const userData = Form.useWatch([], form);
    const dispatch = useDispatch()
    // const [valueCpf, setValueCpf] = useState('')


    const handleOk = () => {
        dispatch(save(userData))
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // const mascaraCpf = (value: string) => {
    //     if(valueCpf.length === 2 || valueCpf.length === 6){
    //         setValueCpf(value + '.')
    //     }else if(valueCpf.length === 10){
    //         setValueCpf(value + '-')
    //     }else{
    //         setValueCpf(value)
    //     }
    // }

    return(
        <Modal title="Cadastrar contato" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                    <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="cpf" label="CPF" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phoneNumber" label="Telefone" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="dateOfBirth" label="Data de Nascimento" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
    )
}
