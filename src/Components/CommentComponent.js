import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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
import { APP_BASE_URL, ADD_TASK_COMMENT } from '../url';

const CommentComponent = () => {
    const query = new URLSearchParams(useLocation().search);
    const taskId = query.get('taskId');
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Fetch users for tagging
    useEffect(() => {
        axios.get(`${APP_BASE_URL}/users/find`)
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleAddComment = () => {
        axios.post(
            `${APP_BASE_URL}${ADD_TASK_COMMENT}`,
            { task_id: taskId, comment_text: newComment, user_id: 1 },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
            .then((res) => {
                setComments([...comments, res.data]);
                setNewComment('');
            })
            .catch((err) => console.error(err));
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewComment(value);

        const atIndex = value.lastIndexOf('@');
        if (atIndex !== -1) {
            const query = value.substring(atIndex + 1).toLowerCase();
            setFilteredUsers(
                users.filter((user) =>
                    user.firstname.toLowerCase().includes(query) || user.lastname.toLowerCase().includes(query)
                )
            );
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (user) => {
        const atIndex = newComment.lastIndexOf('@');
        const newCommentWithTag = `${newComment.substring(0, atIndex + 1)}${user.firstname} ${user.lastname} `;
        setNewComment(newCommentWithTag);
        setShowSuggestions(false);
    };

    return (
        <div>
            <TextField
                fullWidth
                value={newComment}
                onChange={handleInputChange}
                placeholder="Add a comment and tag users with @"
                multiline
                rows={3}
                variant="outlined"
                style={{ marginBottom: '16px', width: '100%' }} />
            {showSuggestions && (
                <TableContainer component={Paper} style={{ marginBottom: 16, maxHeight: 200, overflowY: 'auto' }}>
                    <Table>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} hover onClick={() => handleSuggestionClick(user)}>
                                    <TableCell>@{user.firstname} {user.lastname}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Button variant="contained" color="primary" onClick={handleAddComment} style={{ marginBottom: 16 }}>
                Add Comment
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Comments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.map((comment, index) => (
                            <TableRow key={index}>
                                <TableCell>{comment.comment_text}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CommentComponent;
