import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import API from '../api';
import { alertService } from '../service/alertService';

import { Employee } from '../model/Employee';

interface ParamTypes {
    action: string;
    id?: string;
}

export interface Props {}

const EditEmployee: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const { action, id } = useParams<ParamTypes>();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue
    } = useForm<Employee>();

    useEffect(() => {
        if (action === 'edit') {
            getEmployeeById();
        }
    }, [action, id]);

    const getEmployeeById = async () => {
        const response = await API.get<Employee>(`/employee/${id}`);
        if (response.status === 200) {
            const { data } = response;
            setValue('visa', data.visa);
            setValue('firstName', data.firstName);
            setValue('lastName', data.lastName);
            if (data.birthDate) {
                setValue('birthDate', new Date(data.birthDate));
            }
        }
    };

    const onSubmit: SubmitHandler<Employee> = async (data) => {
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
        } catch (err) {
            alertService.error(err.response.data.errors[0], {
                autoClose: false
            });
        }
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-3 mb-5 border-bottom'>
                <h5 className='mb-2'>
                    {action === 'new' ? 'New' : 'Edit'} Employee
                </h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row mb-3'>
                    <label htmlFor='visa' className='col-sm-2 col-form-label'>
                        VISA <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-3'>
                        <input
                            type='text'
                            className={`form-control ${
                                errors.visa ? 'is-invalid' : ''
                            }`}
                            {...register('visa', {
                                required: 'VISA is required'
                            })}
                        />
                        {errors.visa && (
                            <small className='text-danger'>
                                {errors.visa.message}
                            </small>
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
                                errors.firstName ? 'is-invalid' : ''
                            }`}
                            {...register('firstName', {
                                required: 'First name is required'
                            })}
                        />
                        {errors.firstName && (
                            <small className='text-danger'>
                                {errors.firstName.message}
                            </small>
                        )}
                    </div>
                </div>
                <div className='row mb-3'>
                    <label
                        htmlFor='firstName'
                        className='col-sm-2 col-form-label'
                    >
                        Last name <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-5'>
                        <input
                            type='text'
                            className={`form-control ${
                                errors.lastName ? 'is-invalid' : ''
                            }`}
                            {...register('lastName', {
                                required: 'Last name is required'
                            })}
                        />
                        {errors.lastName && (
                            <small className='text-danger'>
                                {errors.lastName.message}
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
                                <Controller
                                    control={control}
                                    name='birthDate'
                                    render={({ field }) => (
                                        <DatePicker
                                            className='form-control'
                                            dateFormat='dd/MM/yyyy'
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode='select'
                                            selected={field.value}
                                            onChange={(date: Date) =>
                                                field.onChange(date)
                                            }
                                        />
                                    )}
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
