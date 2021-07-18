import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '../api';
import { alertService } from '../service/alertService';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Employee from '../model/Employee';

interface ParamTypes {
    action: string;
    id?: string;
}

export interface Props {}

const EditEmployee: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const { action, id } = useParams<ParamTypes>();

    const [visa, setVisa] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    useEffect(() => {
        if (action === 'edit') {
            getEmployeeById();
        }
    }, [action, id]);

    const getEmployeeById = async () => {
        const response = await API.get<Employee>(`/employee/${id}`);
        if (response.status === 200) {
            const { data } = response;
            setVisa(data.visa);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            if (data.birthDate) {
                setBirthDate(new Date(data.birthDate));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            visa,
            firstName,
            lastName,
            birthDate
        };

        try {
            if (action === 'new') {
                const response = await API.post('employee', data);
                if (response.status === 201) {
                    alertService.success('Save successfully');
                }
            }

            if (action === 'edit') {
                const response = await API.put(`employee/${id}`, data);
                if (response.status === 200) {
                    alertService.success('Save successfully');
                }
            }

            resetFormData();
        } catch (err) {
            alertService.error(err.response.data.errors[0], {
                autoClose: false
            });
        }
    };

    const handleCancel = () => {
        resetFormData();
        history.goBack();
    };

    const resetFormData = () => {
        setVisa('');
        setFirstName('');
        setLastName('');
        setBirthDate(null);
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-3 mb-5 border-bottom'>
                <h5 className='mb-2'>
                    {action === 'new' ? 'New' : 'Edit'} Employee
                </h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='row mb-3'>
                    <label htmlFor='visa' className='col-sm-2 col-form-label'>
                        VISA
                    </label>
                    <div className='col-sm-3'>
                        <input
                            type='text'
                            className='form-control'
                            id='projectNumber'
                            value={visa}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setVisa(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label
                        htmlFor='firstName'
                        className='col-sm-2 col-form-label'
                    >
                        First name
                    </label>
                    <div className='col-sm-5'>
                        <input
                            type='text'
                            className='form-control'
                            id='firstName'
                            value={firstName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setFirstName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label
                        htmlFor='lastName'
                        className='col-sm-2 col-form-label'
                    >
                        Last name
                    </label>
                    <div className='col-sm-5'>
                        <input
                            type='text'
                            className='form-control'
                            id='lastName'
                            value={lastName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-sm-6'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <label
                                    htmlFor='birthDate'
                                    className='col-form-label'
                                >
                                    Birth date
                                </label>
                            </div>
                            <div className='col-sm-6'>
                                <DatePicker
                                    dateFormat='dd/MM/yyyy'
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode='select'
                                    selected={birthDate}
                                    onChange={(date: any) => setBirthDate(date)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                    <button
                        className='btn btn-secondary me-md-2'
                        type='button'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button className='btn btn-primary' type='submit'>
                        {action === 'new' ? 'Create' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEmployee;
