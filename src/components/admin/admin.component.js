import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setUser} from '../../actions/login';
import history from '../../history';
import axios from 'axios';
import custom from '../environment';
import './admin.scss';

const Admin = () => {

    // eslint-disable-next-line
    const [token, setToken] = useState("");
    const tokens = useSelector(state => state.login.userToken);
    const [modal, setModal] = useState(false);
    const [roomList, setRoomList] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (tokens === '' || tokens === null || tokens === undefined) {
            if(localStorage.getItem("sessionToken") === '' || localStorage.getItem("sessionToken") === null || localStorage.getItem("sessionToken") === undefined){
                history.push("/");
            }
            else{
                setToken(localStorage.getItem('sessionToken'));
                dispatch(setUser(localStorage.getItem('sessionToken')));
                getRoomList();
            }
        }
        else{
            getRoomList();
        }
    // eslint-disable-next-line
    }, [tokens]);

    const getRoomList = () => {
        setModal(true);
        axios.get(custom.URL + "/admin/get_rooms", custom.options)
            .then((res) => {
                setModal(false);
                if(res.status === 200){
                    setRoomList(res.data);
                }
                else{
                    console.log("No rooms present");
                }
            })
            .catch((err) => {
                setModal(false);
                console.log(err);
            });
    }

    const logout = () => {
        localStorage.setItem('sessionToken', '');
        history.push("/");
    }

    return(
        <div className="admin-body">
            <h1>Admin Portal</h1>
            {modal && <div className="spinner-body">
                <div className="spinner-border text-success" role="status"></div>
            </div>}
            <table className="table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Users</th>
                        <th>Type</th>
                        <th>Length</th>
                        <th>Message Action</th>
                        <th>Room Action</th>
                    </tr>
                </thead>
                <tbody>
                    {roomList.map((room) => {
                        return(
                            <tr key={room.roomId}>
                                <td>{room.users}</td>
                                <td>{room.type}</td>
                                <td>{room.messageNo}</td>
                                <td>Clear All</td>
                                <td>Delete Room</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
        </div>
    )
}

export default Admin;