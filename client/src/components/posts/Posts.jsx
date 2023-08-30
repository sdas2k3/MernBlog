import './posts.css'
import Post  from '../post/Post.jsx'


export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} key={p._id}/>
      ))}
    </div>
  );
}