import React, {useEffect} from "react";
import './user.css'
import {getAllUser} from "./store/userSlice";
import {useDispatch, useSelector} from "react-redux";

function UserTable(){
    const dispatch = useDispatch();
    const user = useSelector(store => store.users.user);
    console.log("dsdms;kdjs",user)

    useEffect(() => {
        dispatch(getAllUser());
    }, []);

    return(
        <>
            <div className="container-fluid" style={{justifyContent:'center',display:'flex'}}>
                <h1>
                    User Data
                </h1>
            </div>
            <div className="container-fluid" style={{justifyContent:'center',display:'flex'}}>

            <table style={{width:'100%'}}>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
                {user.map(item =>
                <tr>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                </tr>
                )}
            </table>

            </div>
        </>
    )
}

export default UserTable