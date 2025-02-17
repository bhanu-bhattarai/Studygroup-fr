import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import axios from 'axios';
import { APP_BASE_URL } from '../../url';

import './NotificationMenu.css'; // Import the CSS file

const NotificationMenu = ({ userId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${APP_BASE_URL}/notifications/1}`);
                const notificationsWithTimeAgo = response.data.map(notification => ({
                    ...notification,
                    timeAgo: calculateTimeAgo(notification.timeStamp)
                }));
                setNotifications(notificationsWithTimeAgo);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [userId]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const calculateTimeAgo = (timeStamp) => {
        const now = new Date();
        const notificationDate = new Date(timeStamp);
        const diffInMinutes = Math.floor((notificationDate - now) / 60000); // Difference in minutes

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)} hours ago`;
        } else {
            return `${Math.floor(diffInMinutes / 1440)} days ago`;
        }
    };

    return (
        <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <NotificationsIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className="notification-menu"
            >
                {notifications.map((notification, index) => (
                    <MenuItem key={index} onClick={handleMenuClose} className="notification-item">
                        <div className="avatar" />
                        <div className="notification-content">
                            <p className="notification-text">{notification.text}</p>
                            <p className="notification-time">{notification.timeAgo}</p>
                        </div>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default NotificationMenu;
