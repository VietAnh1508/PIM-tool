import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '../api';
import { alertService } from '../service/alertService';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Employee, EmployeeError } from '../model/Employee';
// import FormField from '../model/FormField';
// import FormElement from './FormElements/FormElement';

interface ParamTypes {
    action: string;
    id?: string;
}

export interface Props {}

const EditEmployee: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const { action, id } = useParams<ParamTypes>();

    // const [formFields, setFormFields] = useState<FormField[]>([]);

    const [visa, setVisa] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [errors, setErrors] = useState<EmployeeError>({
        visa: '',
        firstName: '',
        lastName: ''
    });
    const [formInvalid, setFormInvalid] = useState<boolean>(false);

    // useEffect(() => {
    //     getEmployeeForm();
    // }, []);

    // const getEmployeeForm = async () => {
    //     const response = await API.get<FormField[]>(`/employee/form-fields`);
    //     if (response.status === 200) {
    //         const { data } = response;
    //         console.log(data);
    //         setFormFields(data);
    //     }
    // };

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

    const validateValue = () => {
        let clonedErrors = { ...errors };

        clonedErrors.visa = visa.length > 0 ? '' : 'VISA is required';
        clonedErrors.firstName =
            firstName.length > 0 ? '' : 'First name is required';
        clonedErrors.lastName =
            lastName.length > 0 ? '' : 'Last name is required';

        setErrors(clonedErrors);

        let isFormInvalid = Object.values(clonedErrors).some(
            (field) => field.length > 0
        );
        setFormInvalid(isFormInvalid);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formInvalid) {
            return;
        }

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
                {/* {(formFields || []).map((field) => {
                    return (
                        <div className='row mb-3' key={field.id}>
                            <FormElement
                                id={field.id}
                                type={field.type}
                                label={field.label}
                                mandatory={field.mandatory}
                                width={field.width}
                            />
                        </div>
                    );
                })} */}
                <div className='row mb-3'>
                    <label htmlFor='visa' className='col-sm-2 col-form-label'>
                        VISA <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-3'>
                        <input
                            type='text'
                            className={`form-control ${
                                errors.visa.length > 0 ? 'is-invalid' : ''
                            }`}
                            id='visa'
                            value={visa}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setVisa(e.target.value)}
                            onBlur={validateValue}
                            required
                        />
                        {errors.visa.length > 0 && (
                            <small className='text-danger'>{errors.visa}</small>
                        )}
                    </div>
                </div>
                <div className='row mb-3'>
                    <label
                        htmlFor='firstName'
                        className='col-sm-2 col-form-label'
                    >
                        First name <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-5'>
                        <input
                            type='text'
                            className={`form-control ${
                                errors.firstName.length > 0 ? 'is-invalid' : ''
                            }`}
                            id='firstName'
                            value={firstName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setFirstName(e.target.value)}
                            onBlur={validateValue}
                            required
                        />
                        {errors.firstName.length > 0 && (
                            <small className='text-danger'>
                                {errors.firstName}
                            </small>
                        )}
                    </div>
                </div>
                <div className='row mb-3'>
                    <label
                        htmlFor='lastName'
                        className='col-sm-2 col-form-label'
                    >
                        Last name <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-5'>
                        <input
                            type='text'
                            className={`form-control ${
                                errors.lastName.length > 0 ? 'is-invalid' : ''
                            }`}
                            id='lastName'
                            value={lastName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setLastName(e.target.value)}
                            onBlur={validateValue}
                            required
                        />
                        {errors.lastName.length > 0 && (
                            <small className='text-danger'>
                                {errors.lastName}
                            </small>
                        )}
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
                                    className='form-control'
                                    dateFormat='dd/MM/yyyy'
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode='select'
                                    selected={birthDate}
                                    onChange={(date: Date) =>
                                        setBirthDate(date)
                                    }
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
