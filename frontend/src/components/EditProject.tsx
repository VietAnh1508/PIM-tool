import React, { useState } from 'react';
import { useHistory } from 'react-router';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface Props {}

const EditProject: React.FunctionComponent<Props> = () => {
    const history = useHistory();

    const [projectNumber, setProjectNumber] = useState<number>(0);
    const [projectName, setProjectName] = useState<string>('');
    const [customer, setCustomer] = useState<string>('');
    const [group, setGroup] = useState<string>();
    const [memebers, setMembers] = useState<string[]>([]);
    const [status, setStatus] = useState<string>();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleProjectNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const projectNumber = Number(e.target.value);
        if (isNaN(projectNumber)) {
            console.log('invalid');
        } else {
            setProjectNumber(projectNumber);
        }
    };

    const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMembers(value.split(','));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('project number', projectNumber);
        console.log('project name', projectName);
        console.log('customer', customer);
        console.log('group', group);
        console.log('members', memebers?.join(', '));
        console.log('status', status);
        console.log('start date', startDate);
        console.log('end date', endDate);

        // TODO: send data to server

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
        // TODO: reset group
        setMembers([]);
        // TODO: reset status
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-3 mb-5 border-bottom'>
                <h5 className='mb-2'>New project</h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='row mb-3'>
                    <label
                        htmlFor='projectNumber'
                        className='col-sm-2 col-form-label'
                    >
                        Project number
                    </label>
                    <div className='col-sm-3'>
                        <input
                            type='text'
                            className='form-control'
                            id='projectNumber'
                            value={projectNumber}
                            onChange={handleProjectNumberChange}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label
                        htmlFor='projectName'
                        className='col-sm-2 col-form-label'
                    >
                        Project name
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
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label
                        htmlFor='customer'
                        className='col-sm-2 col-form-label'
                    >
                        Customer
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
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-sm-2'>
                        <label htmlFor='group' className='col-form-label'>
                            Group
                        </label>
                    </div>
                    <div className='col-sm-3'>
                        <select
                            id='group'
                            className='form-select'
                            value={group}
                            onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                                setGroup(e.currentTarget.value)
                            }
                        >
                            <option>group1</option>
                            <option>group2</option>
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
                            Status
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
                        >
                            <option value='new'>New</option>
                            <option value='pla'>Planned</option>
                            <option value='inp'>In progress</option>
                            <option value='fin'>Finished</option>
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
                                    Start date
                                </label>
                            </div>
                            <div className='col-sm-6'>
                                <DatePicker
                                    dateFormat='dd/MM/yyyy'
                                    selected={startDate}
                                    onChange={(date: any) => setStartDate(date)}
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
                                    dateFormat='dd/MM/yyyy'
                                    selected={endDate}
                                    onChange={(date: any) => setEndDate(date)}
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
                        Create project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProject;
