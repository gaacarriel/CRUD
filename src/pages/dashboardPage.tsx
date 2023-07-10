import { UserAddOutlined, EditOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from "../features/users/user-slicer"
import { RootState } from '../store';
import { ModalCreateUser } from '../components/modalCreate';
import { ModalEditUser } from '../components/modalEdit';


export interface iContact{
    cpf: string;
    dateOfBirth: string;
    email: string;
    name: string;
    phoneNumber: string;
}

/**
 * 1- Criar lista de contatos
 * 2- UseEffect pra ver se tem no LS
 */

export const DashboardPage = () => {
    const users = useSelector((state: RootState) => state.users.value);
    const dispatch = useDispatch();

    const [isModalOpenCreate, setIsModalCreateOpen] = useState(false);
    const [isModalOpenEdit, setIsModalEditOpen] = useState(false);
    const { confirm } = Modal;

    useEffect(() => {
        const contacts = localStorage.getItem("@ContactList")
        // dispatch(update())
    }, [])

    const showDeleteConfirm = () => {
        confirm({
            title: 'Quer mesmo deletar este contato?',
            icon: <ExclamationCircleFilled />,
            content: 'Esse contato será deletado PERMANENTEMENTE!',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                dispatch(remove())
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };
    
    const showModalEdit = () => {
        setIsModalEditOpen(true);
    };

    return (
        <main>
            <div>
                <div>
                    <p>contatos</p>
                    <button onClick={showModalCreate}>
                        <UserAddOutlined />
                    </button>
                </div>
                <ul>
                    {users?.map((user) => <li>
                        <div>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.phoneNumber}</p>
                        </div>
                        <div>
                            <button onClick={showModalEdit}>
                                <EditOutlined />
                            </button>
                            <button onClick={showDeleteConfirm}>
                                <UserDeleteOutlined />
                            </button>
                        </div>
                    </li>)}
                </ul>
            </div>
            <ModalCreateUser isModalOpen={isModalOpenCreate} setIsModalOpen={setIsModalCreateOpen}/>
            <ModalEditUser isModalOpen={isModalOpenEdit} setIsModalOpen={setIsModalEditOpen}/>
        </main>
    )
}