import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CommentComponent from '../../Components/CommentComponent';
import { APP_BASE_URL, LIST_TASK_COMMENTS, ADD_TASK_COMMENT, UPLOAD_FILE, LIST_UPLOADED_FILES } from '../../url';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Input
} from '@material-ui/core';

const columns = [
    { id: 'user_id', label: 'User ID' },
    { id: 'comment_text', label: 'Comment' },
    { id: 'created_at', label: 'Created At' }
];

const ViewComments = () => {
    const query = new URLSearchParams(useLocation().search);
    const taskId = query.get('taskId');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [file, setFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        if (taskId) {
            axios.get(`${APP_BASE_URL}${LIST_TASK_COMMENTS}?taskId=${taskId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                responseType: 'json',
            })
                .then(res => {
                    console.log(res.data);
                    setComments(res.data);
                })
                .catch(err => {
                    console.error(err);
                });

            axios.get(`${APP_BASE_URL}${LIST_UPLOADED_FILES}?taskId=${taskId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                responseType: 'json',
            })
                .then(res => {
                    console.log(res.data);
                    setUploadedFiles(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [taskId]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('task_id', taskId);

            axios.post(`${APP_BASE_URL}${UPLOAD_FILE}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(res => {
                    console.log(res.data);
                    setUploadedFiles([...uploadedFiles, res.data]);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    return (
        <div>
            <CommentComponent
                label="Add Comment"
                multiline
                rows={4}
                variant="outlined"
                style={{ marginBottom: '16px', width: '100%' }}
            />
            <Input
                type="file"
                onChange={handleFileChange}
                inputProps={{ accept: '.doc,.docx,.xls,.xlsx,.pdf' }}
                style={{ marginBottom: '16px', float: 'right' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleFileUpload}
                style={{ marginBottom: '16px', float: 'right' }}
            >
                Upload File
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead className="tablehead">
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.map((comment) => (
                            <TableRow key={comment.comment_id}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{comment[column.id]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                <Table>
                    <TableHead className="tablehead">
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell>Uploaded At</TableCell>
                            <TableCell>Download</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uploadedFiles.map((file) => (
                            <TableRow key={file.id}>
                                <TableCell>{file.file_name}</TableCell>
                                <TableCell>{new Date(file.uploaded_at).toLocaleString()}</TableCell>                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={`${APP_BASE_URL}/download/${file.id}`}
                                    >
                                        Download
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

export default ViewComments;
