import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '../api';
import { alertService } from '../service/alertService';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Project, ProjectStatus } from '../model/Project';
import { GroupSimple } from '../model/GroupSimple';

interface ParamTypes {
    action: string;
    id?: string;
}

export interface Props {}

const EditProject: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const { action, id } = useParams<ParamTypes>();

    const [projectNumber, setProjectNumber] = useState<number | null>(null);
    const [projectName, setProjectName] = useState<string>('');
    const [customer, setCustomer] = useState<string>('');
    const [groupId, setGroupId] = useState<number>(-1);
    const [groupList, setGroupList] = useState<GroupSimple[]>([]);
    const [memebers, setMembers] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');
    const [projectStatusList, setProjectStatusList] = useState<ProjectStatus[]>(
        []
    );
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [formInvalid, setFormInvalid] = useState<boolean>(false);

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
            setStatus(result[0].key);
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
            setProjectNumber(Number(data.projectNumber));
            setProjectName(data.name);
            setCustomer(data.customer);
            setGroupId(data.group.id);
            setMembers(data.members);
            setStatus(data.status);
            setStartDate(new Date(data.startDate));
            if (data.endDate) {
                setEndDate(new Date(data.endDate));
            }
        }
    };

    const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMembers(value.split(','));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            number: projectNumber,
            name: projectName,
            groupId,
            customer,
            status,
            startDate,
            endDate
        };

        try {
            if (formInvalid) {
                return;
            }

            if (action === 'new') {
                const response = await API.post('project', data);
                if (response.status === 201) {
                    alertService.success('Save successfully');
                }
            }

            if (action === 'edit') {
                const response = await API.put(`project/${id}`, data);
                if (response.status === 200) {
                    alertService.success('Save successfully');
                }
            }
        } catch (err) {
            alertService.error(err.response.data.errors[0], {
                autoClose: false
            });
        }

        resetFormData();
    };

    const handleCancel = () => {
        resetFormData();
        history.goBack();
    };

    const resetFormData = () => {
        setProjectNumber(0);
        setProjectName('');
        setCustomer('');
        setGroupId(-1);
        setMembers([]);
        setStatus('');
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-3 mb-5 border-bottom'>
                <h5 className='mb-2'>
                    {action === 'new' ? 'New' : 'Edit'} project
                </h5>
            </div>
            <form onSubmit={handleSubmit}>
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
                            className='form-control'
                            id='projectNumber'
                            pattern='\d+'
                            disabled={action === 'edit'}
                            value={projectNumber || ''}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setProjectNumber(Number(e.target.value))}
                            required
                        />
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
                            className='form-control'
                            id='projectName'
                            value={projectName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setProjectName(e.target.value)}
                            required
                        />
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
                            className='form-control'
                            id='customer'
                            value={customer}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setCustomer(e.target.value)}
                            required
                        />
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
                            className='form-select'
                            value={groupId}
                            onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                                setGroupId(Number(e.currentTarget.value))
                            }
                            required
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
                            value={memebers}
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
                            className='form-select'
                            value={status}
                            onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                                setStatus(e.currentTarget.value)
                            }
                            required
                        >
                            {projectStatusList.map((status) => (
                                <option value={status.key} key={status.key}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
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
                                    Start date{' '}
                                    <span className='text-danger'>*</span>
                                </label>
                            </div>
                            <div className='col-sm-6'>
                                <DatePicker
                                    todayButton='Today'
                                    className='form-control'
                                    dateFormat='dd/MM/yyyy'
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode='select'
                                    selected={startDate}
                                    onChange={(date: Date) =>
                                        setStartDate(date)
                                    }
                                    required
                                />
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
                                <DatePicker
                                    className='form-control'
                                    dateFormat='dd/MM/yyyy'
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode='select'
                                    selected={endDate}
                                    onChange={(date: Date) => setEndDate(date)}
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
