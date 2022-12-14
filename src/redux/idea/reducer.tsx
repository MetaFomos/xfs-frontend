import { 
    GET_PENDING_IDEAS, 
    GET_APPROVED_IDEAS, 
    GET_FUNDREQUIRED_IDEAS, 
    GET_BALANCE, 
    GET_INPROGRESS_IDEAS,
    GET_COMPLETED_IDEAS
} from '../action_types';

const INIT_STATE = {
    pending_ideas: [],
    approved_ideas: [],
    fundrequired_ideas: [],
    inprogress_ideas: [],
    completed_ideas: [],
    fund_amount: 0
};

const ideaReducer = (state = INIT_STATE, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PENDING_IDEAS:
            return {
                ...state,
                pending_ideas: payload
            };
        case GET_APPROVED_IDEAS:
            return {
                ...state,
                approved_ideas: payload
            };
        case GET_FUNDREQUIRED_IDEAS:
            return {
                ...state,
                fundrequired_ideas: payload
            };
        case GET_INPROGRESS_IDEAS:
            return {
                ...state,
                inprogress_ideas: payload
            };
        case GET_COMPLETED_IDEAS:
            return {
                ...state,
                completed_ideas: payload
            };
        case GET_BALANCE:
            return {
                ...state,
                fund_amount: payload
            };
        default: return { ...state };
    }
}

export default ideaReducer;