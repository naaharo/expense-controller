const USER_STATE = {
  email: '',
};

const user = (state = USER_STATE, action) => {
  switch (action.type) {
  case 'EMAIL':
    return { email: action.email };
  default:
    return state;
  }
};

export default user;
