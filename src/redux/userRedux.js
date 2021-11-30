// selectors
export const getUserStatus = ({ user }) => user.status;
export const getUserEmail = ({ user }) => user.email;

// action name creator
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
const CHANGE_USER = createActionName('CHANGE_USER');

// action creators
export const changeUser = payload => ({ payload, type: CHANGE_USER });

// reducer
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case CHANGE_USER: {
      return {
        ...statePart,
        status: action.payload,
      };
    }
    default:
      return statePart;
  }
};
