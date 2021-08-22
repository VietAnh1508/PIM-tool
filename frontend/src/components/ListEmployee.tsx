import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import API from '../api';
import { alertService } from '../service/alertService';

import { Employee } from '../model/Employee';
import DataTable from './DataTable';

const headers = ['VISA', 'First name', 'Last name', 'Birthdate'];

interface SearchType {
    text: string;
}

export interface Props {}

const ListEmployee: React.FunctionComponent<Props> = () => {
    const history = useHistory();

    const { t } = useTranslation();

    const { register, handleSubmit, setValue } = useForm<SearchType>();

    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        getEmployeeData(null);
    }, []);

    const getEmployeeData = async (searchText: string | null) => {
        let url = 'employee';
        if (searchText !== null) {
            url += `?searchText=${searchText}`;
        }

        const response = await API.get<Employee[]>(url);
        if (response.status === 200) {
            const result: Employee[] = response.data.map((item) => ({
                id: item.id,
                visa: item.visa,
                firstName: item.firstName,
                lastName: item.lastName,
                birthDate: item.birthDate
            }));

            setEmployees(result);
        }
    };

    const handleNewBtnClick = () => {
        history.push('/employee/new');
    };

    const onSearchEmployee: SubmitHandler<SearchType> = async (data) => {
        getEmployeeData(data.text);
    };

    const resetSearch = () => {
        setValue('text', '');
        getEmployeeData(null);
    };

    const handleDeleteItem = async (id: number) => {
        const response = await API.delete(`employee/${id}`);
        if (response.status === 204) {
            setEmployees(employees.filter((employee) => employee.id !== id));
            alertService.success('Delete successfully');
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-3 mb-5 border-bottom'>
                <h5 className='mb-2'>List employee</h5>
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
                        onSubmit={handleSubmit(onSearchEmployee)}
                    >
                        <div className='col'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Visa, first name, last name'
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
            <DataTable
                headers={headers}
                items={employees}
                id='id'
                editLink='/employee/edit/'
                linkColumn='visa'
                deleteItem={handleDeleteItem}
            />
        </div>
    );
};

export default ListEmployee;
