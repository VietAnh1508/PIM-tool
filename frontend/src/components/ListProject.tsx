import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import API from '../api';
import { alertService } from '../service/alertService';

import { Project, ProjectStatus } from '../model/Project';

export interface Props {}

const ListProject: React.FunctionComponent<Props> = () => {
    const history = useHistory();

    const { t } = useTranslation();

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectStatusList, setProjectStatusList] = useState<ProjectStatus[]>(
        []
    );

    useEffect(() => {
        getProjectData();
        getPreDefinedStatus();
    }, []);

    const getProjectData = async () => {
        const response = await API.get<Project[]>('project');
        if (response.status === 200) {
            const result: Project[] = response.data.map((item) => ({
                id: item.id,
                projectNumber: item.projectNumber,
                name: item.name,
                customer: item.customer,
                group: item.group,
                members: item.members,
                status: item.status,
                startDate: item.startDate,
                endDate: item.endDate,
                selected: false
            }));

            setProjects(result);
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
        }
    };

    const getStatusName = (key: string) => {
        return projectStatusList.find((status) => status.key === key)?.label;
    };

    const handleNewBtnClick = () => {
        history.push('/project/new');
    };

    const handleRowSelected = (e: React.FormEvent<HTMLInputElement>) => {
        const projectId: number = Number(e.currentTarget.value);
        if (e.currentTarget.checked) {
            setProjects(
                projects.map((project) =>
                    project.id === projectId
                        ? { ...project, selected: true }
                        : project
                )
            );
        } else {
            setProjects(
                projects.map((project) =>
                    project.id === projectId
                        ? { ...project, selected: false }
                        : project
                )
            );
        }
    };

    const nbOfSelectedItem = projects.filter(
        (project) => project.selected
    ).length;

    const handleDeleteItem = async (id: number) => {
        const response = await API.delete(`project/${id}`);
        if (response.status === 204) {
            setProjects(projects.filter((project) => project.id !== id));
            alertService.success('Delete successfully');
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-3 mb-5 border-bottom'>
                <h5 className='mb-2'>List project</h5>
            </div>
            <div className='row mb-3'>
                <div className='col'>
                    <button
                        className='btn btn-primary'
                        onClick={handleNewBtnClick}
                    >
                        {t('label.new')}
                    </button>
                </div>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Customer</th>
                        <th>Start date</th>
                        <th>{t('label.delete')}</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td className='text-center'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    value={project.id}
                                    onChange={handleRowSelected}
                                />
                            </td>
                            <td>
                                <Link
                                    to={`/project/edit/${project.id}`}
                                    className='nav-link'
                                >
                                    {project.projectNumber}
                                </Link>
                            </td>
                            <td>{project.name}</td>
                            <td>{getStatusName(project.status)}</td>
                            <td>{project.customer}</td>
                            <td>
                                {project.startDate != null
                                    ? project.startDate.toLocaleString('vi-VN')
                                    : ''}
                            </td>
                            <td className='text-center'>
                                {project.status === 'NEW' && (
                                    <button
                                        className='btn btn-link text-danger'
                                        onClick={() =>
                                            handleDeleteItem(project.id)
                                        }
                                    >
                                        <i className='bi bi-trash'></i>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={7}>
                            <div className='row justify-content-between'>
                                <div className='col-3 ms-3'>
                                    {t('label.itemSelected', {
                                        count: nbOfSelectedItem
                                    })}
                                </div>
                                <div className='col-3'>
                                    <button className='btn btn-link text-danger text-decoration-none'>
                                        {t('label.deleteSelectedItem', {
                                            count: nbOfSelectedItem
                                        })}
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

export default ListProject;
