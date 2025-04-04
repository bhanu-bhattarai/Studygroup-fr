import React, { useState, useEffect } from 'react';
import handleDownload from '../../Components/Download';
import './Index.css'
import { Link } from 'react-router-dom';
import axios from "axios";
import { APP_BASE_URL, LIST_PROJECT } from '../../url';

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
];

const ProjectHeader = () => {
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [projectData, setProjectData] = useState([]);

    const handleSort = (columnId) => {
        if (orderBy === columnId) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderBy(columnId);
            setOrder('asc');
        }
    };

    useEffect(() => {
        axios.get(`${APP_BASE_URL}${LIST_PROJECT}`, {
            headers: {
                "Content-Type": "application/json",
            },
            responseType: 'json',
        })
            .then(res => {
                console.log(res.data)
                setProjectData(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);
    console.log("data is the " + projectData)

    const sortedProjects = [...projectData].sort((a, b) => {
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
                to="/create"
                style={{ marginBottom: '16px', marginLeft: '1200px' }}
            >
                Add Project
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
                        {sortedProjects.map((project) => (
                            <TableRow key={project.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{project[column.id]}</TableCell>
                                ))}
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={{
                                            pathname: "/tasks/",
                                            search: `?projectId=${project.id}`
                                        }}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    );
};

export default ProjectHeader;
