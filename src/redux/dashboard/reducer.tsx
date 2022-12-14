import { 

} from '../action_types';

const INIT_STATE = {
    dashboardText: '',
    mapText: '',
    collectText: '',
    ourteamText: '',
    faqs: [],
    partnerships: []
};

const dashboardReducer = (state = INIT_STATE, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_DASHBOARD_TEXT':
            return {
                ...state,
                dashboardText: payload
            };
        case 'SET_MAP_TEXT':
            return {
                ...state,
                mapText: payload
            };
        case 'SET_COLLECT_TEXT':
            return {
                ...state,
                collectText: payload
            };
        case 'SET_OURTEAM_TEXT':
            return {
                ...state,
                ourteamText: payload
            };
        case 'SET_FAQS':
            return {
                ...state,
                faqs: payload
            };
        case 'SET_PARTNERS':
            return {
                ...state,
                partnerships: payload
            };
        default: return { ...state };
    }
}

export default dashboardReducer;