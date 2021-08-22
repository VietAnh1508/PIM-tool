import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import API from '../api';
import { alertService } from '../service/alertService';

import { Group } from '../model/Group';

interface SearchType {
    text: string;
}

export interface Props {}

const ListGroup: React.FunctionComponent<Props> = () => {
    const history = useHistory();

    const { t } = useTranslation();

    const { register, handleSubmit, setValue } = useForm<SearchType>();

    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        getGroupData(null);
    }, []);

    const getGroupData = async (searchText: string | null) => {
        let url = 'group';
        if (searchText !== null) {
            url += `?searchText=${searchText}`;
        }

        const response = await API.get<Group[]>(url);
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

    const onSearchGroup: SubmitHandler<SearchType> = async (data) => {
        getGroupData(data.text);
    };

    const resetSearch = () => {
        setValue('text', '');
        getGroupData(null);
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
                        {t('label.new')}
                    </button>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-8'>
                    <form
                        className='row'
                        onSubmit={handleSubmit(onSearchGroup)}
                    >
                        <div className='col'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Group name, leader'
                                {...register('text')}
                            />
                        </div>
                        <div className='col'>
                            <button className='btn btn-primary' type='submit'>
                                {t('label.search')}
                            </button>
                        </div>
                    </form>
                </div>
                <div className='col-4'>
                    <button
                        className='btn btn-link text-decoration-none shadow-none'
                        onClick={resetSearch}
                    >
                        {t('label.resetSearch')}
                    </button>
                </div>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Leader</th>
                        <th>{t('label.delete')}</th>
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
                                    {t('label.itemSelected', {
                                        count: nbOfSelectedItem
                                    })}
                                </div>
                                <div className='col-3'>
                                    <button className='btn btn-link text-danger text-decoration-none'>
                                        {t('label.deleteSelectedItem', {
                                            count: nbOfSelectedItem
                                        })}
                                        <i className='bi bi-trash ms-2'></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            {/* <DataTable
                headers={headers}
                items={groups}
                id='id'
                editLink='/group/edit/'
                linkColumn='name'
                deleteItem={handleDeleteItem}
            /> */}
        </div>
    );
};

export default ListGroup;
