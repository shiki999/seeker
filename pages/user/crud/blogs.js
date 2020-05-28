import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BlogRead from '../../../components/crud/BlogRead';
import Link from 'next/link';
import { isAuth } from '../../../actions/auth';

const Blog = () => {
  const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 py-5">
              <h2>Manage Blogs</h2>
            </div>
            <div className="col-md-9">
              <BlogRead username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;