import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './state/redux';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const authState = useSelector((state: RootState) => state.auth);

    if (authState.id === 0) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
