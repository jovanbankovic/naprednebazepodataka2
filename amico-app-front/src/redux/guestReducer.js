const initialState = {

    guests: []

}



export const ActionTypes =

{

    SET_GUESTS: 'SET_GUESTS',

    DELETE_GUESTS: 'DELETE_GUESTS',

    NEW_GUESTS: 'NEW_GUESTS',



}



export const ActionCreators3 = 

{

    setGuests: payload => ({type: ActionTypes.SET_GUESTS, payload}),

    deleteGuests: payload => ({type: ActionTypes.DELETE_GUESTS, payload}),

    newGuests: payload => ({type: ActionTypes.NEW_GUESTS, payload })



}

export default function commentsReducer(state=initialState, action)

{

    switch(action.type)

    {

        case ActionTypes.SET_GUESTS:
              
            return {...state, guests: [...action.payload]};

        case ActionTypes.DELETE_GUESTS:
            
            return {...state,guests:[...state.guests.filter(element => element.telefon !== action.payload)]}; 

        case ActionTypes.NEW_GUESTS:

            return { ...state, guests: [...state.guests, action.payload] }

        default:

            return state;

    }

}

