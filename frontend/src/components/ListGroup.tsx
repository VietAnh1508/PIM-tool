import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import API from '../api';
import { alertService } from '../service/alertService';

import { Group } from '../model/Group';

export interface Props {}

const ListGroup: React.FunctionComponent<Props> = () => {
    const history = useHistory();

    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        getGroupData();
    }, []);

    const getGroupData = async () => {
        const response = await API.get<Group[]>('group');
        if (response.status === 200) {
            const result: Group[] = response.data.map((item) => ({
                id: item.id,
                name: item.name,
                leader: item.leader,
                selected: false
            }));

            setGroups(result);
        }
    };

    const handleNewBtnClick = () => {
        history.push('/group/new');
    };

    const handleRowSelected = (e: React.FormEvent<HTMLInputElement>) => {
        const groupId: number = Number(e.currentTarget.value);
        if (e.currentTarget.checked) {
            setGroups(
                groups.map((group) =>
                    group.id === groupId ? { ...group, selected: true } : group
                )
            );
        } else {
            setGroups(
                groups.map((group) =>
                    group.id === groupId ? { ...group, selected: false } : group
                )
            );
        }
    };

    const nbOfSelectedItem = groups.filter((group) => group.selected).length;

    const handleDeleteItem = async (id: number) => {
        const response = await API.delete(`group/${id}`);
        if (response.status === 204) {
            setGroups(groups.filter((group) => group.id !== id));
            alertService.success('Delete successfully');
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-3 mb-5 border-bottom'>
                <h5 className='mb-2'>List Group</h5>
            </div>
            <div className='row mb-3'>
                <div className='col'>
                    <button
                        className='btn btn-primary'
                        onClick={handleNewBtnClick}
                    >
                        New
                    </button>
                </div>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Leader</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr key={group.id}>
                            <td className='text-center'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    value={group.id}
                                    onChange={handleRowSelected}
                                />
                            </td>
                            <td>
                                <Link
                                    to={`/group/edit/${group.id}`}
                                    className='nav-link'
                                >
                                    {group.name}
                                </Link>
                            </td>
                            <td>
                                {`${group.leader.firstName} ${group.leader.lastName}`}
                            </td>
                            <td className='text-center'>
                                <button
                                    className='btn btn-link text-danger'
                                    onClick={() => handleDeleteItem(group.id)}
                                >
                                    <i className='bi bi-trash'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6}>
                            <div className='row justify-content-between'>
                                <div className='col-3 ms-3'>
                                    {nbOfSelectedItem} item
                                    {nbOfSelectedItem > 1 ? 's' : ''} selected
                                </div>
                                <div className='col-3'>
                                    <button className='btn btn-link text-danger text-decoration-none'>
                                        Delete selected item
                                        {nbOfSelectedItem > 1 ? 's' : ''}
                                        <i className='bi bi-trash ms-2'></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ListGroup;
