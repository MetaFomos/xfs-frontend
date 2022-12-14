import api from '../../utils/api';
import { 
    
 } from '../action_types';

export const dashboardTextAction = (formData: JSON) => async (dispatch: any) => {
    try {
        var res = await api.post('/auth/dashboardAction', formData);
        dispatch({
            type: 'SET_DASHBOARD_TEXT',
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}