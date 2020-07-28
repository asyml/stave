import React, { useState, useEffect } from 'react';
import { createUser, fetchUsers, deleteUser } from '../lib/api';
import { useHistory } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    updateUsers().catch(e => {
      history.push('/login');
    });
  }, [history]);

  function updateUsers() {
    return fetchUsers().then(users => {
      setUsers(users);
    });
  }

  function handleAdd() {
    createUser(name, pass).then(() => {
      updateUsers();
    });
  }

  function handleDelete(id: string) {
    deleteUser(id).then(() => {
      updateUsers();
    });
  }

  if (!users.length) return null;

  return (
    <div className="content">
      <div className="content_left">
        <h2>All users:</h2>
        {users.map(d => (
          <ul key={d.id}>
            <li>
              {/* 'User detail is not implemented' */}
              {/* <Link to={`/documents/${d.id}`}>{d.name}</Link> {d.textPack}{' '} */}
              <span>{d.name} </span>
              <button onClick={() => handleDelete(d.id)}>X</button>
            </li>
          </ul>
        ))}
      </div>

      <div>
        <h2>new user</h2>
        <div>
          <input
            placeholder="username"
            value={name}
            onChange={e => setName(e.target.value)}
            name="name"
          />
        </div>
        <div>
          <input
            placeholder="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            name="password"
          />
        </div>
        <div>
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default Users;
