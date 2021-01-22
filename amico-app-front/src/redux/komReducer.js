const initialState = {

    comments: []

}



export const ActionTypes =

{

    SET_COMMENTS: 'SET_COMMENTS',

    DELETE_COMMENTS: 'DELETE_COMMENTS',

    NEW_COMMENTS: 'NEW_COMMENTS',

    DELETE_COMMENTS_TELEFON: 'DELETE_COMMENTS_TELEFON',


}



export const ActionCreators2 = 

{

    setComments: payload => ({type: ActionTypes.SET_COMMENTS, payload}),

    deleteComments: payload => ({type: ActionTypes.DELETE_COMMENTS, payload}),

    newComments: payload => ({type: ActionTypes.NEW_COMMENTS, payload }),

    deleteCommentsTelefon: payload => ({type: ActionTypes.DELETE_COMMENTS_TELEFON, payload})


}

export default function commentsReducer(state=initialState, action)

{

    switch(action.type)

    {

        case ActionTypes.SET_COMMENTS:
                
            return {...state, comments: [...action.payload]};

        case ActionTypes.DELETE_COMMENTS:
            console.log(state.comments.filter(element => element.komentarID !== action.payload))
            return {...state,comments:[...state.comments.filter(element => element.komentarID !== action.payload)]}; 

        case ActionTypes.DELETE_COMMENTS_TELEFON:
            console.log(state.comments.filter(element => element.gostID !== action.payload))
            return {...state,comments:[...state.comments.filter(element => element.gostID !== action.payload)]}; 

        case ActionTypes.NEW_CLIENT:

            return { ...state, comments: [...state.comments, action.payload] }

        default:

            return state;

    }

}

