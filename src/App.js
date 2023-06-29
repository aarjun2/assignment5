import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom';

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Johnny davis' },
];

const posts = [
  { id: 1, userId: 1, title: 'Post 1 by John' , description: 'hello world by john'},
  { id: 2, userId: 1, title: 'Post 2 by John' , description: 'hello world 2 by john'},
  { id: 3, userId: 2, title: 'Post 1 by Jane' , description: 'hello world by jane'},
];

const UserList = () => (
  <div>
    <h2>User List</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const User = () => {
  const { userId } = useParams();
  const user = users.find((user) => user.id === parseInt(userId));
  const userPosts = posts.filter((post) => post.userId === parseInt(userId));

  if (!user) {
    return <div>Invalid User</div>;
  }

  return (
    <div>
      <h2>Posts by User {userId}</h2>
      {userPosts.length > 0 ? (
        <ul>
          {userPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/user/${userId}/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
};

const Post = () => {
  const { userId, postId } = useParams();
  const post = posts.find((post) => post.userId === parseInt(userId) && post.id === parseInt(postId));

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </div>
  );
};

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/user/:userId/post/:postId" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;