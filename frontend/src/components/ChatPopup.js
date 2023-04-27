import React, { useState } from 'react';

function ChatForm({ type, onSubmit }) {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ username, passcode });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      {type === 'join' && (
        <>
          <label htmlFor="passcode">Passcode:</label>
          <input
            type="password"
            id="passcode"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
          />
        </>
      )}
      <button type="submit">{type === 'join' ? 'Join Chat' : 'Create Chat'}</button>
    </form>
  );
}

function JoinChatForm({ onSubmit }) {
  return <ChatForm type="join" onSubmit={onSubmit} />;
}

function CreateChatForm({ onSubmit }) {
  return <ChatForm type="create" onSubmit={onSubmit} />;
}

export default function ChatPopup() {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleJoinSubmit = (formData) => {
    console.log(`Joining chat with username "${formData.username}" and passcode "${formData.passcode}"`);
    // do something with the form data (e.g. send it to a server)
  };

  const handleCreateSubmit = (formData) => {
    console.log(`Creating chat with username "${formData.username}"`);
    // do something with the form data (e.g. send it to a server)
  };

  return (
    <div>
      <button onClick={() => setShowJoinForm(true)}>Join Chat</button>
      <button onClick={() => setShowCreateForm(true)}>Create Chat</button>

      {showJoinForm && (
        <div>
          <JoinChatForm onSubmit={handleJoinSubmit} />
          <button onClick={() => setShowJoinForm(false)}>Cancel</button>
        </div>
      )}

      {showCreateForm && (
        <div>
          <CreateChatForm onSubmit={handleCreateSubmit} />
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
