import React, { useState } from 'react';
import handleDownload from '../../Components/Download';
import './Index.css'
import { Link } from 'react-router-dom';
import projectData from './DummyProjects';
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
    { id: 'title', label: 'Title' },
    { id: 'status', label: 'Status' },
    { id: 'projectLead', label: 'Project Lead' },
    { id: 'description', label: 'Description' },
];

const ProjectHeader = () => {

    const [orderBy, setOrderBy] = useState('title');
    const [order, setOrder] = useState('asc');

    const handleSort = (columnId) => {
        if (orderBy === columnId) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderBy(columnId);
            setOrder('asc');
        }
    };

    const sortedProjects = projectData.sort((a, b) => {
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
                style={{ marginBottom: '16px', marginLeft: '1300px' }}
            >
                Add Project
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead class="tablehead">
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
                                        to="/details"
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="inherit"
                                        onClick={() => handleDownload(project.id)}
                                    >
                                        Download
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

