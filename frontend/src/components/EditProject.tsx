import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import API from '../api';
import { alertService } from '../service/alertService';

import UrlParamsType from '../model/UrlParams';
import { Project, ProjectStatus } from '../model/Project';
import { GroupSimple } from '../model/GroupSimple';

export interface Props {}

const EditProject: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const { action, id } = useParams<UrlParamsType>();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue
    } = useForm<Project>();

    const [groupList, setGroupList] = useState<GroupSimple[]>([]);
    const [projectStatusList, setProjectStatusList] = useState<ProjectStatus[]>(
        []
    );

    const DATE_FORMAT = 'dd/MM/yyyy';

    useEffect(() => {
        getGroups();
        getPreDefinedStatus();
    }, []);

    const getGroups = async () => {
        const response = await API.get<GroupSimple[]>('group/simple');
        if (response.status === 200) {
            const result: GroupSimple[] = response.data.map((item) => ({
                id: item.id,
                name: item.name
            }));

            result.unshift({
                id: -1,
                name: '-- Please select group --'
            });

            setGroupList(result);
            setValue('group.id', result[0].id);
        }
    };

    const getPreDefinedStatus = async () => {
        const response = await API.get<ProjectStatus[]>(
            'project/pre-defined-status'
        );
        if (response.status === 200) {
            const result: ProjectStatus[] = response.data.map((item) => ({
                key: item.key,
                label: item.label
            }));
            setProjectStatusList(result);
            setValue('status', result[0].key);
        }
    };

    useEffect(() => {
        if (action === 'edit') {
            getProjectById();
        }
    }, [action, id]);

    const getProjectById = async () => {
        const response = await API.get<Project>(`/project/${id}`);
        if (response.status === 200) {
            const { data } = response;
            setValue('projectNumber', data.projectNumber);
            setValue('name', data.name);
            setValue('customer', data.customer);
            setValue('group', data.group);
            setValue('members', data.members);
            setValue('status', data.status);
            setValue('startDate', new Date(data.startDate));
            if (data.endDate) {
                setValue('endDate', new Date(data.endDate));
            }
        }
    };

    const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue('members', value.split(','));
    };

    const onSubmit: SubmitHandler<Project> = async (data) => {
        const payload = {
            number: data.projectNumber,
            name: data.name,
            groupId: data.group.id,
            customer: data.customer,
            status: data.status,
            startDate: data.startDate,
            endDate: data.endDate
        };

        try {
            if (action === 'new') {
                const response = await API.post('project', payload);
                if (response.status === 201) {
                    alertService.success('Save successfully');
                }
            }

            if (action === 'edit') {
                const response = await API.put(`project/${id}`, payload);
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
                    {action === 'new' ? 'New' : 'Edit'} project
                </h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row mb-3'>
                    <label
                        htmlFor='projectNumber'
                        className='col-sm-2 col-form-label'
                    >
                        Project number <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-3'>
                        <input
                            type='text'
                            className={`form-control ${
                                errors.projectNumber ? 'is-invalid' : ''
                            }`}
                            id='projectNumber'
                            disabled={action === 'edit'}
                            {...register('projectNumber', {
                                required: 'Project number is required',
                                pattern: {
                                    value: /\d+/i,
                                    message: 'Please enter number'
                                }
                            })}
                        />
                        {errors.projectNumber && (
                            <small className='text-danger'>
                                {errors.projectNumber.message}
                            </small>
                        )}
                    </div>
                </div>
                <div className='row mb-3'>
                    <label
                        htmlFor='projectName'
                        className='col-sm-2 col-form-label'
                    >
                        Project name <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-10'>
                        <input
                            type='text'
                            className={`form-control ${
                                errors.name ? 'is-invalid' : ''
                            }`}
                            id='projectName'
                            {...register('name', {
                                required: 'Project name is required'
                            })}
                        />
                        {errors.name && (
                            <small className='text-danger'>
                                {errors.name.message}
                            </small>
                        )}
                    </div>
                </div>
                <div className='row mb-3'>
                    <label
                        htmlFor='customer'
                        className='col-sm-2 col-form-label'
                    >
                        Customer <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-10'>
                        <input
                            type='text'
                            className={`form-control ${
                                errors.customer ? 'is-invalid' : ''
                            }`}
                            id='customer'
                            {...register('customer', {
                                required: 'Customer is required'
                            })}
                        />
                        {errors.customer && (
                            <small className='text-danger'>
                                {errors.customer.message}
                            </small>
                        )}
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-sm-2'>
                        <label htmlFor='group' className='col-form-label'>
                            Group <span className='text-danger'>*</span>
                        </label>
                    </div>
                    <div className='col-sm-3'>
                        <select
                            id='group'
                            className={`form-control ${
                                errors.group ? 'is-invalid' : ''
                            }`}
                            {...register('group.id', {
                                required: 'Please select group'
                            })}
                        >
                            {groupList.map((group) => (
                                <option
                                    key={`group-${group.id}`}
                                    value={group.id}
                                    disabled={group.id === -1}
                                >
                                    {group.name}
                                </option>
                            ))}
                        </select>
                        {errors.group?.id && (
                            <small className='text-danger'>
                                {errors.group.id.message}
                            </small>
                        )}
                    </div>
                </div>
                <div className='row mb-3'>
                    <label
                        htmlFor='members'
                        className='col-sm-2 col-form-label'
                    >
                        Members
                    </label>
                    <div className='col-sm-10'>
                        <input
                            type='text'
                            className='form-control'
                            id='members'
                            {...register('members')}
                            onChange={handleMemberChange}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-sm-2'>
                        <label htmlFor='status' className='col-form-label'>
                            Status <span className='text-danger'>*</span>
                        </label>
                    </div>
                    <div className='col-sm-3'>
                        <select
                            id='status'
                            className={`form-control ${
                                errors.status ? 'is-invalid' : ''
                            }`}
                            {...register('status', {
                                required: 'Please select status'
                            })}
                        >
                            {projectStatusList.map((status) => (
                                <option value={status.key} key={status.key}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                        {errors.status && (
                            <small className='text-danger'>
                                {errors.status.message}
                            </small>
                        )}
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-sm-6'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <label
                                    htmlFor='startDate'
                                    className='col-form-label'
                                >
                                    Start date
                                    <span className='text-danger'> *</span>
                                </label>
                            </div>
                            <div className='col-sm-6'>
                                <Controller
                                    control={control}
                                    name='startDate'
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <DatePicker
                                            todayButton='Today'
                                            className={`form-control ${
                                                errors.endDate
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                            dateFormat={DATE_FORMAT}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode='select'
                                            selected={field.value}
                                            selectsStart
                                            startDate={getValues('startDate')}
                                            endDate={getValues('endDate')}
                                            maxDate={getValues('endDate')}
                                            onChange={(date: Date) =>
                                                field.onChange(date)
                                            }
                                        />
                                    )}
                                />
                                {errors.startDate && (
                                    <small className='text-danger'>
                                        {errors.startDate.message}
                                    </small>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <label
                                    htmlFor='endDate'
                                    className='col-form-label'
                                >
                                    End date
                                </label>
                            </div>
                            <div className='col-sm-6'>
                                <Controller
                                    control={control}
                                    name='endDate'
                                    render={({ field }) => (
                                        <DatePicker
                                            todayButton='Today'
                                            className='form-control'
                                            dateFormat={DATE_FORMAT}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode='select'
                                            selected={field.value}
                                            selectsStart
                                            startDate={getValues('startDate')}
                                            endDate={getValues('endDate')}
                                            maxDate={getValues('endDate')}
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

export default EditProject;
