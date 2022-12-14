import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PropType {
    component: React.FC;
}

const PrivateRoute: React.FC<PropType> = ({ component: Component }) => {
    const { isAuthenticated } = useSelector((state: any) => state.auth);

    if (isAuthenticated) return <Component />;
    return <Navigate to='/signin' />;
};

export default PrivateRoute;