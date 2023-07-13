import { Modal, Form, Input, message } from "antd"
import { useDispatch } from "react-redux";
import { save } from "../features/users/user-slicer";
import { MaskedInput } from "antd-mask-input";
import React from "react";

interface iPropsModal{
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalCreateUser = ({ isModalOpen, setIsModalOpen }: iPropsModal) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const userData = Form.useWatch([], form);

    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = async () => {
        if(!userData.name || 
            !userData.email ||
            !userData.cpf ||
            !userData.phoneNumber ||
            !userData.dateOfBirth
        ){
            messageApi.info('Preencha todos os campos!');
        }else{
            dispatch(save(userData))
            form.resetFields();
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return(
        <Modal 
        title="Cadastrar contato" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}>
            {contextHolder}
            <Form 
            form={form} 
            name="validateOnly" 
            layout="vertical" 
            autoComplete="off">
                <Form.Item 
                name="name" 
                label="Nome" 
                rules={[{ 
                    required: true, 
                    message: "Nome é obrigatório!",
                },{
                    min: 2,
                    message: "Nome deve conter mais de 2 caracteres!"
                },{
                    whitespace: true,
                    message: "Nome não pode ser vazio!"
                }]}>
                    <Input />
                </Form.Item>
                <Form.Item 
                name="email" 
                label="Email"
                rules={[{ 
                    required: true, 
                    message: "Email é obrigatório!"
                },{
                    type: "email",
                    message: "Deve ser um email valido!"
                }]}>
                    <Input />
                </Form.Item>
                <Form.Item 
                name="cpf" 
                label="CPF"
                rules={[{ 
                    required: true,
                    message: "CPF é obrigatório!",
                }]}>
                    <MaskedInput mask={'000.000.000-00'}/>
                </Form.Item>
                <Form.Item 
                name="phoneNumber" 
                label="Telefone"
                rules={[{ 
                    required: true, 
                    message: "Telefone é obrigatório!", 
                }]}>
                    <MaskedInput mask={'(00) 0 0000-0000'}/>
                </Form.Item>
                <Form.Item 
                name="dateOfBirth" 
                label="Data de Nascimento"
                rules={[{ 
                    required: true, 
                    message: "Data de nascimento é obrigatório!", 
                }, {
                    type: "date",
                    message: "Data de nascimento deve ser válida!"
                }]}>
                    <MaskedInput mask={'00/00/0000'}/>
                </Form.Item> 
            </Form>
        </Modal>
    )
}
