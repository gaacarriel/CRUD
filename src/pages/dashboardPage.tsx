import { UserAddOutlined, EditOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Table } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove,update } from "../features/users/user-slicer"
import { RootState } from '../store';
import { ModalCreateUser } from '../components/modalCreate';
import { ModalEditUser } from '../components/modalEdit';

export interface iContact{
    id?: number;
    cpf: string;
    dateOfBirth: string;
    email: string;
    name: string;
    phoneNumber: string;
    user?: iContact;
}

export const DashboardPage = () => {
    const [isModalOpenCreate, setIsModalCreateOpen] = useState(false);
    const [isModalOpenEdit, setIsModalEditOpen] = useState(false);
    const [recordEdit, setRecordEdit] = useState<iContact | null>(null)
    
    const users = useSelector((state: RootState) => state.users.value);
    const dispatch = useDispatch();
    const { confirm } = Modal;

    useEffect(() => {
        const usersList: iContact[] = JSON.parse(localStorage.getItem("@Users") as any)
        dispatch(update(usersList))
    }, [])

    const showDeleteConfirm = (record: iContact) => {
        confirm({
            title: 'Quer mesmo deletar este contato?',
            icon: <ExclamationCircleFilled />,
            content: 'Esse contato será deletado PERMANENTEMENTE!',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                dispatch(remove(record))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };
    
    const showModalEdit = (record: iContact) => {
        setRecordEdit(record)
        setIsModalEditOpen(true);
    };

    const columns = [
        {
            key: '1',
            title: "ID",
            dataIndex: 'id'
        },
        {
            key: '2',
            title: "Nome",
            dataIndex: 'name'
        },
        {
            key: '3',
            title: "Email",
            dataIndex: 'email'
        },
        {
            key: '4',
            title: "CPF",
            dataIndex: 'cpf'
        },
        {
            key: '5',
            title: "Telefone",
            dataIndex: 'phoneNumber'
        },
        {
            key: '6',
            title: "Data de Nascimento",
            dataIndex: 'dateOfBirth'
        },
        {
            key: '7',
            title: "Actions",
            render: (record: iContact) => {
                return <>
                    <EditOutlined onClick={() => showModalEdit(record)} />
                    <UserDeleteOutlined 
                    onClick={() => showDeleteConfirm(record)} 
                    style={{color: "red", margin: 12}} />
                </>
            }
        },
    ]

    return (
        <main>
            <div className='boxTable'>
                <div className='boxInfo'>
                    <p>Usuários</p>
                    <button onClick={showModalCreate}>
                        <UserAddOutlined />
                    </button>
                </div>
                <Table columns={columns} dataSource={users}></Table>
            </div>
            <ModalCreateUser isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalCreateOpen}/>
            <ModalEditUser isModalOpen={isModalOpenEdit} setIsModalOpen={setIsModalEditOpen} record={recordEdit}/>
        </main>
    )
}