import { Modal, Form, Input } from "antd"
import { useDispatch } from "react-redux";
import { edit } from "../features/users/user-slicer";
import { iContact } from "../pages/dashboardPage";

interface iPropsModal{
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    record: iContact | null;
}

export const ModalEditUser = ({ isModalOpen, setIsModalOpen, record }: iPropsModal) => {
    const [form] = Form.useForm();
    const userData = Form.useWatch([], form);
    const dispatch = useDispatch()


    const handleOk = () => {
        const newRecord = {...record}
        if(record){
            newRecord.user = userData
        }
        dispatch(edit(newRecord as iContact))
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return(
        <Modal title="Editar contato" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                    <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                        <Input placeholder={record?.name} />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input placeholder={record?.email} />
                    </Form.Item>
                    <Form.Item name="cpf" label="CPF" rules={[{ required: true }]}>
                        <Input placeholder={record?.cpf} />
                    </Form.Item>
                    <Form.Item name="phoneNumber" label="Telefone" rules={[{ required: true }]}>
                        <Input placeholder={record?.phoneNumber} />
                    </Form.Item>
                    <Form.Item name="dateOfBirth" label="Data de Nascimento" rules={[{ required: true }]}>
                        <Input placeholder={record?.dateOfBirth} />
                    </Form.Item>
                </Form>
            </Modal>
    )
}
