import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { APP_BASE_URL, LIST_PROJECT_TASKS, UPDATE_TASK_STATUS } from '../../url';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Button
} from '@material-ui/core';

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'statusText', label: 'Status' },
    { id: 'description', label: 'Description' },
    { id: 'due_date', label: 'Due Date' }
];

const ViewTask = () => {
    const query = new URLSearchParams(useLocation().search);
    const projectId = query.get('projectId');
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [taskData, setTaskData] = useState([]);

    const handleSort = (columnId) => {
        if (orderBy === columnId) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderBy(columnId);
            setOrder('asc');
        }
    };

    useEffect(() => {
        if (projectId) {
            axios.get(`${APP_BASE_URL}${LIST_PROJECT_TASKS}?projectId=${projectId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                responseType: 'json',
            })
                .then(res => {
                    console.log(res.data);
                    setTaskData(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [projectId]);

    const handleStatusUpdate = (task) => {
        let newStatus;
        if (task.status === 0) {
            newStatus = 1; // Update from To-Do to In Progress
        } else if (task.status === 1) {
            newStatus = 2; // Update from In Progress to Completed
        } else {
            return;
        }

        axios.put(`${APP_BASE_URL}${UPDATE_TASK_STATUS}`, { task_id: task.id, status: newStatus }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                console.log(res.data);
                // Update the local state to reflect the status change
                setTaskData(taskData.map(t => t.id === task.id ? { ...t, status: newStatus, statusText: getStatusText(newStatus) } : t));
            })
            .catch(err => {
                console.error(err);
            });
    };

    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return 'To-Do';
            case 1:
                return 'In Progress';
            case 2:
                return 'Completed';
            default:
                return 'Unknown';
        }
    };

    const sortedTasks = [...taskData].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to={{
                    pathname: "/tasks/create",
                    search: `?projectId=${projectId}`
                }}
                style={{ marginBottom: '16px', marginLeft: '1200px' }}
            >
                Add Task
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead className="tablehead">
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTasks.map((task) => (
                            <TableRow key={task.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{task[column.id]}</TableCell>
                                ))}
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleStatusUpdate(task)}
                                    >
                                        {task.status === 0 ? 'Start' : task.status === 1 ? 'Complete' : 'Completed'}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={{
                                            pathname: "/tasks/comments/",
                                            search: `?taskId=${task.id}`
                                        }}
                                    >
                                        Comments
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ViewTask;
