import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '../api';
import { alertService } from '../service/alertService';

import { Group, GroupError } from '../model/Group';
import { Leader } from '../model/Leader';

interface ParamTypes {
    action: string;
    id?: string;
}

export interface Props {}

const EditGroup: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const { action, id } = useParams<ParamTypes>();

    const [name, setName] = useState<string>('');
    const [leaderId, setLeaderId] = useState<number>(-1);
    const [leaderList, setLeaderList] = useState<Leader[]>([]);
    const [errors, setErrors] = useState<GroupError>({
        name: '',
        leader: ''
    });
    const [formInvalid, setFormInvalid] = useState<boolean>(false);

    useEffect(() => {
        getLeaderList();
    }, []);

    const getLeaderList = async () => {
        const response = await API.get<Leader[]>(`employee/leaders`);
        if (response.status === 200) {
            const { data } = response;
            setLeaderList(data);
        }
    };

    useEffect(() => {
        if (action === 'edit') {
            getGroupById();
        }
    }, [action, id]);

    const getGroupById = async () => {
        const response = await API.get<Group>(`/group/${id}`);
        if (response.status === 200) {
            const { data } = response;
            setName(data.name);
            setLeaderId(data.leader.id);
        }
    };

    const validateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        let isError = { ...errors };
        let isFormInvalid = false;

        switch (id) {
            case 'name':
                if (name.length === 0) {
                    isError.name = 'Group name is required';
                    isFormInvalid = true;
                }
                break;
            case 'leader':
                if (leaderId === -1) {
                    isError.leader = 'Please select a leader';
                    isFormInvalid = true;
                }
                break;
            default:
                break;
        }

        setErrors(isError);
        setFormInvalid(isFormInvalid);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            name,
            leaderId
        };

        try {
            if (formInvalid) {
                return;
            }

            if (action === 'new') {
                const response = await API.post('group', data);
                if (response.status === 201) {
                    alertService.success('Save successfully');
                }
            }

            if (action === 'edit') {
                const response = await API.put(`group/${id}`, data);
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
        setName('');
        setLeaderId(-1);
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-3 mb-5 border-bottom'>
                <h5 className='mb-2'>
                    {action === 'new' ? 'New' : 'Edit'} Group
                </h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='row mb-3'>
                    <label htmlFor='name' className='col-sm-2 col-form-label'>
                        Name <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-3'>
                        <input
                            type='text'
                            className={`form-control ${
                                errors.name.length > 0 ? 'is-invalid' : ''
                            }`}
                            id='name'
                            value={name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setName(e.target.value)}
                            onBlur={validateValue}
                            required
                        />
                        {errors.name.length > 0 && (
                            <small className='text-danger'>{errors.name}</small>
                        )}
                    </div>
                </div>
                <div className='row mb-3'>
                    <label htmlFor='leader' className='col-sm-2 col-form-label'>
                        Leader <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-5'>
                        <select
                            id='leader'
                            className='form-select'
                            value={leaderId}
                            onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                                setLeaderId(Number(e.currentTarget.value))
                            }
                        >
                            {leaderList.map((leader) => (
                                <option
                                    value={leader.id}
                                    key={leader.id}
                                >{`${leader.firstName} ${leader.lastName}`}</option>
                            ))}
                        </select>
                        {errors.leader.length > 0 && (
                            <small className='text-danger'>
                                {errors.leader}
                            </small>
                        )}
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

export default EditGroup;