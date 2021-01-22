const initialState = {

    clients: []
  

}



export const ActionTypes =

{
   

    SET_CLIENTS: 'SET_CLIENTS',

    DELETE_CLIENT: 'DELETE_CLIENT',

    EDIT_CLIENT: 'EDIT_CLIENT',

    NEW_CLIENT: 'NEW_CLIENT',

    CHANGE_ROLE: 'CHANGE_ROLE'

}



export const ActionCreators = 

{
    
    setClients: payload => ({type: ActionTypes.SET_CLIENTS, payload}),

    deleteClient: payload => ({type: ActionTypes.DELETE_CLIENT, payload}),

    editClient: payload => ({type: ActionTypes.EDIT_CLIENT, payload}),

    newClient: payload => ({type: ActionTypes.NEW_CLIENT, payload })

}

export default function clientsReducer(state=initialState, action)

{

    switch(action.type)

    {
       

        case ActionTypes.SET_CLIENTS:
            return {...state, clients: [...action.payload]};

        case ActionTypes.DELETE_CLIENT:
            console.log(state.clients.filter(element => element.sobaID !== action.payload))

            return {...state,clients:[...state.clients.filter(element => element.sobaID !== action.payload)]}; 

        case ActionTypes.EDIT_CLIENT:

            return Object.assign({}, state, {
                clients: state.clients.map(item => {
                    return item.sobaID === action.payload.sobaID ? action.payload : item;
                }) 
             }); 
            

        case ActionTypes.NEW_CLIENT:

            return { ...state, clients: [...state.clients, action.payload] }

        default:

            return state;

    }

}

