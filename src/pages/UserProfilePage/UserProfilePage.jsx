import React, { useRef, useState, useContext } from 'react';
import { Balance } from '../../components';
import { AppWrap } from '../../wrapper';
import { userContext } from '../../context/userContext';
import { tokenContext } from '../../context/tokenContext';
import {Navigate } from 'react-router-dom';

const UserProfilePage = () => {

    const [editing, setEditing] = useState(false);

    const token = useContext(tokenContext)
    const user = useContext(userContext)

    const userPicture = useRef();
    const userName = useRef();
    const userLastName = useRef()
    const userEmail = useRef();

    // por ahora solo edita, después también tiene que hacer
    // un patch a la base de datos
    function editContent() {
        setEditing(true);

        const editableName = document.createElement('textarea');
        editableName.className =
            'font-extrabold text-4xl w-fit h-fit bg-primary dark:vg-primary/90 text-center md:w-fit md:p-0';
        editableName.textContent = user.first_name;

        const editableLastName = document.createElement('textarea');
        editableLastName.className =
            'font-extrabold text-4xl w-fit h-fit bg-primary dark:vg-primary/90 text-center md:w-fit md:p-0';
        editableLastName.textContent = user.last_name;

        const editableEmail = document.createElement('textarea');
        editableEmail.className =
            'w-3/5 h-7 bg-primary dark:vg-primary/90 text-center italic text-base md:w-fit';
        editableEmail.textContent = user.email;
        // userPicture.current.style.display = 'none';
        userName.current.replaceWith(editableName);
        userLastName.current.replaceWith(editableLastName)
        userEmail.current.replaceWith(editableEmail);
    }

    function saveEditedContent() {
        const newValues = document.querySelectorAll('textarea');
        
        console.log(user);
        newValues[0].replaceWith(userName.current);
        newValues[1].replaceWith(userLastName.current);
        newValues[2].replaceWith(userEmail.current);

        userPicture.current.style.display = 'block';
        setEditing(false);
    }

    if(user){
    return (
            <div className="flex h-full w-full flex-col items-center">
                <div className="relative mt-6 flex w-9/12 flex-col items-center justify-between gap-6 rounded-xl bg-primary/90 py-7 text-center text-white dark:bg-primary/90 md:flex-row">
                    <div
                        className="aspect-squaren ml-5 h-32 w-32 rounded-full bg-red-900"
                        ref={userPicture}
                    />
                    <div className='flex flex-col md:mr-12'>
                    <h1 className="px-3 text-4xl font-extrabold" ref={userName} id="user-value">
                        {user.first_name} 
                    </h1>
                    <span className="px-3 text-4xl font-extrabold" id="user-value" ref={userLastName}>{user.last_name} </span>
                    <span className="text-base italic md:mr-5" ref={userEmail} id="user-value">
                        {user.email}
                    </span>
                    </div>

                    {editing ? (
                        <span
                            className="absolute top-5 right-12 font-semibold hover:cursor-pointer"
                            onClick={saveEditedContent}
                        >
                            GUARDAR
                        </span>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="absolute top-5 right-5 h-6 w-6 stroke-white hover:border-spacing-60 hover:cursor-pointer hover:stroke-alternative "
                            onClick={editContent}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                        </svg>
                    )}
                </div>
                <Balance />
            </div>
    )}else{
        return(
            <Navigate to="/login" replace={true}/>
        )
    };
};

export default AppWrap(UserProfilePage);

