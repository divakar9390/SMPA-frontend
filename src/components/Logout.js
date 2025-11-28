import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context_api';

export default function Logout() {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    useEffect(() => {
        logoutUser(); 
        navigate('/login'); 
    }, []); 
    return null; 
}