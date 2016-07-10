(function() {
  window.InputArea = React.createClass({
    handleSend: function() {
      this.props.handleSend(this.props.currentMessage, 1);
    },

    handleKeyUp: function(ev) {
      if (ev.keyCode === 13) {
        this.handleSend(this.props.currentMessage, 1);
      }
    },

    render: function() {
      return (
        <div className="input-area">
          <input type="text" value={this.props.currentMessage} onChange={this.props.handleChange} onKeyUp={this.handleKeyUp} />
          <span className="send-button" onClick={this.handleSend}> Send </span>
        </div>
      );
    }
  });

  window.FriendList = function(props) {
    props = props || {friends: []};
    var friends = props.friends.map(function(friend, index) {
      return ( <li key={index}> {friend.name} </li> );
    });

    return (
      <ul className="friend-list">
        {friends}
      </ul>
    );
  };

  window.ChatArea = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
      return nextProps.messages !== this.props.messages;
    },

    render: function() {
      var conversation = this.props.messages.map(function(msg, index) {
        return ( <ChatBubble key={index} text={msg.text}  me={this.props.currentUser === msg.userId}/> );
      }, this);

      return (
        <div className="chat-area">
          {conversation}
        </div>
      );
    }
  });

  window.ChatBubble = function(props) {
    return (
      <div className={props.me ? 'me' : 'friend'}>
        <span> {props.text} </span>
        <br/>
      </div>
    );
  };

  var ChatApp = React.createClass({
    render: function() {
      return (
        <div className="chat-app">
          <FriendList friends={this.props.users}/>
          <ChatArea messages={this.props.messages} currentUser={this.props.currentUser}/>
          <InputArea currentMessage={this.props.currentMessage} handleChange={this.props.handleChange} handleSend={this.props.handleSend}/>
        </div>
      );
    }
  });

  function chatAppPropsFromState(state) {
    return state;
  };

  function chatAppDispatchFromState(dispatch) {
    return {
      handleChange: function(ev) {
        dispatch(editMessage(ev.target.value, 0));
      },
      handleSend: function(message, id) {
        dispatch(sendMessage(message, id));
        dispatch(editMessage('', id));
      },
    }
  };

  window.ChatAppContainer = ReactRedux.connect(
    chatAppPropsFromState,
    chatAppDispatchFromState
  )(ChatApp);
})();
