var SEND_MESSAGE = 'SEND_MESSAGE';
var EDIT_MESSAGE = 'EDIT_MESSAGE';
var ADD_USER = 'ADD_USER';
var REMOVE_USER = 'REMOVE_USER';

// ------------------------------ Actions ------------------------------
function sendMessage(message, userId) {
  return {
    type: SEND_MESSAGE,
    text: message,
    userId: userId
  };
};

function editMessage(message, userId) {
  return {
    type: EDIT_MESSAGE,
    text: message,
    userId: userId
  };
};

function addUser(name) {
  return {
    type: ADD_USER,
    name: name,
    id: Date.now()
  }
};

// Reducers
function messages(state = [], action) {
  switch(action.type) {
    case SEND_MESSAGE:
      return state.concat({userId: action.userId, text: action.text});
    default:
      return state;
  };
};

function users(state = [], action) {
  switch(action.type) {
    case ADD_USER:
      return state.concat({name: action.name, id: action.id});
    default:
      return state;
  };
};

function currentMessage(state='', action) {
  switch(action.type) {
    case EDIT_MESSAGE:
      return action.text;
    default:
      return state;
  };
};

var chatApp = Redux.combineReducers({
  messages: messages,
  users: users,
  currentMessage: currentMessage,
  currentUser: function(state={}, action) {return state}
});

// Store
var initialState = {
  users: [
    {name: 'Adam', id: 1},
    {name: 'Harrison', id: 2}
  ],
  messages: [
    {userId: 1, text: 'hey everyone'},
    {userId: 2, text: 'whats up?'}
  ],
  currentMessage: '',
  currentUser: 1
};

var chatAppStore = Redux.createStore(chatApp, initialState);
