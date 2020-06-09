import Link from 'next/link'
import renderHTML from 'react-render-html';
import moment from 'moment';
import {API} from '../../config';

const BigCard = ({blog}) => {
  const showBlogCategories = blog =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="text-white">{c.name}</a>
      </Link>
    ));

  return (
      <div className="col-lg-6 mb-4">
        <Link href={`/blogs/${blog.slug}`}><a>  
          <div className="entry2">
            <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img-fluid " />
            
            <div className="post-meta align-items-center text-left clearfix">
              <span className="d-inline-block mt-1">By <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link></span>
              <span>&nbsp;|&nbsp; Published {moment(blog.updatedAt).fromNow()}</span>
            </div>

            <div className="excerpt">
              <h2>
                <Link href={`/blogs/${blog.slug}`}>
                  <a>{blog.title}</a>
                </Link>
              </h2>
            
              <p>{renderHTML(blog.excerpt)}</p>
            </div>
          </div>
        </a></Link>
      </div>
  );
};

export default BigCard;