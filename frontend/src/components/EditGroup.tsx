import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

import API from '../api';
import { alertService } from '../service/alertService';

import UrlParamsType from '../model/UrlParams';
import { Group } from '../model/Group';
import { Leader } from '../model/Leader';

export interface Props {}

const EditGroup: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const { action, id } = useParams<UrlParamsType>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<Group>();

    const [leaderList, setLeaderList] = useState<Leader[]>([]);

    useEffect(() => {
        getLeaderList();
    }, []);

    const getLeaderList = async () => {
        const response = await API.get<Leader[]>(`employee/leaders`);
        if (response.status === 200) {
            const { data } = response;
            setLeaderList(data);
            setValue('leader', data[0]);
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
            setValue('name', data.name);
            setValue('leader', data.leader);
        }
    };

    const onSubmit: SubmitHandler<Group> = async (data) => {
        const payload = {
            name: data.name,
            leaderId: data.leader.id
        };

        try {
            if (action === 'new') {
                const response = await API.post('group', payload);
                if (response.status === 201) {
                    alertService.success('Save successfully');
                }
            }

            if (action === 'edit') {
                const response = await API.put(`group/${id}`, payload);
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
                    {action === 'new' ? 'New' : 'Edit'} Group
                </h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row mb-3'>
                    <label htmlFor='name' className='col-sm-2 col-form-label'>
                        Name <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-3'>
                        <input
                            id='name'
                            type='text'
                            className={`form-control ${
                                errors.name ? 'is-invalid' : ''
                            }`}
                            {...register('name', {
                                required: 'Group name is required'
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
                    <label htmlFor='leader' className='col-sm-2 col-form-label'>
                        Leader <span className='text-danger'>*</span>
                    </label>
                    <div className='col-sm-5'>
                        <select
                            id='leader'
                            className='form-select'
                            {...register('leader.id')}
                        >
                            {leaderList.map((leader) => (
                                <option
                                    value={leader.id}
                                    key={leader.id}
                                >{`${leader.firstName} ${leader.lastName}`}</option>
                            ))}
                        </select>
                        {errors.leader?.id && (
                            <small className='text-danger'>
                                {errors.leader.id?.message}
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
