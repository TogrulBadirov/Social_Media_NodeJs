import React, { useEffect, useState } from 'react';
import "./index.scss";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import backendURL from '../../config';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 120 },
];

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${backendURL}/user`); // Adjust the endpoint based on your backend route
                const usersWithId = response.data.map((user, index) => ({ ...user, id: user._id })); // Assign MongoDB _id as id property
                setUsers(usersWithId);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <section id='Admin'>  
            <div className="container">
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                    />
                </div>
            </div>
        </section>
    );
};

export default Admin;
