import { Modal, Form, Input } from "antd"
import { useDispatch } from "react-redux";
import { save } from "../features/users/user-slicer";

interface iPropsModal{
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalCreateUser = ({ isModalOpen, setIsModalOpen }: iPropsModal) => {
    const [form] = Form.useForm();
    const userData = Form.useWatch([], form);
    const dispatch = useDispatch()


    const handleOk = () => {
        dispatch(save(userData))
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
