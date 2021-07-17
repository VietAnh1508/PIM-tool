import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import API from '../api';
import { alertService } from '../service/alertService';

import Employee from '../model/Employee';

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
                birthDate: item.birthDate,
                selected: false
            }));

            setEmployees(result);
        }
    };

    const handleNewBtnClick = () => {
        history.push('/employee/new');
    };

    const handleRowSelected = (e: React.FormEvent<HTMLInputElement>) => {
        const employeeId: number = Number(e.currentTarget.value);
        if (e.currentTarget.checked) {
            setEmployees(
                employees.map((employee) =>
                    employee.id === employeeId
                        ? { ...employee, selected: true }
                        : employee
                )
            );
        } else {
            setEmployees(
                employees.map((employee) =>
                    employee.id === employeeId
                        ? { ...employee, selected: false }
                        : employee
                )
            );
        }
    };

    const nbOfSelectedItem = employees.filter(
        (employee) => employee.selected
    ).length;

    const handleDeleteItem = async (id: number) => {
        const response = await API.delete(`employee/${id}`);
        if (response.status === 204) {
            setEmployees(employees.filter((employee) => employee.id === id));
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
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th></th>
                        <th>VISA</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Birthdate</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className='text-center'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    value={employee.id}
                                    onChange={handleRowSelected}
                                />
                            </td>
                            <td>{employee.visa}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.birthDate}</td>
                            <td className='text-center'>
                                <button
                                    className='btn btn-link text-danger'
                                    onClick={() =>
                                        handleDeleteItem(employee.id)
                                    }
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

export default ListEmployee;
