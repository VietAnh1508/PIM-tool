import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import API from '../api';
import { alertService } from '../service/alertService';

import { Employee } from '../model/Employee';
import DataTable from './DataTable';

const headers = ['VISA', 'First name', 'Last name', 'Birthdate'];

export interface Props {}

const ListEmployee: React.FunctionComponent<Props> = () => {
    const history = useHistory();

    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        getEmployeeData();
    }, []);

    const getEmployeeData = async () => {
        const response = await API.get<Employee[]>('employee');
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
                        New
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
