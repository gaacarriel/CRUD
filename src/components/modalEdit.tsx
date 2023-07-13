import { Modal, Form, Input, message } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { MaskedInput } from "antd-mask-input";
import { RootState } from "../store";
import { iContact } from "../pages/dashboardPage";
import { edit } from "../features/users/user-slicer";

interface iPropsModal{
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    record: iContact | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalEditUser = ({ isModalOpen, setIsModalOpen, record, setLoading }: iPropsModal) => {
    const recordState = useSelector((state: RootState) => state.record.value)
    const dispatch = useDispatch()

    const [form] = Form.useForm();
    const userData: iContact = Form.useWatch([], form);
    
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        if(!userData.name || 
            !userData.email ||
            !userData.cpf ||
            !userData.phoneNumber ||
            !userData.dateOfBirth
        ){
            messageApi.info('Preencha todos os campos!');
        }else{
            const newUserData = {...record}
            if(record){
                newUserData.user = userData
            }
            dispatch(edit(newUserData as iContact))
            handleCancel()
            setLoading(true)
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setLoading(true)
    };

    return(
        <Modal 
        title="Editar contato" 
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
                initialValue={recordState?.name}
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
                initialValue={recordState?.email} 
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
                initialValue={recordState?.cpf} 
                rules={[{ 
                    required: true,
                    message: "CPF é obrigatório!",
                }]}>
                    <MaskedInput mask={'000.000.000-00'}/>
                </Form.Item>
                <Form.Item 
                name="phoneNumber" 
                label="Telefone" 
                initialValue={recordState?.phoneNumber}
                rules={[{ 
                    required: true, 
                    message: "Telefone é obrigatório!", 
                }]}>
                    <MaskedInput mask={'(00) 0 0000-0000'}/>
                </Form.Item>
                <Form.Item 
                name="dateOfBirth" 
                label="Data de Nascimento" 
                initialValue={recordState?.dateOfBirth}
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
