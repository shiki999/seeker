import Link from 'next/link'
import renderHTML from 'react-render-html';
import moment from 'moment';
import {API} from '../../config';

const SmallCard = ({blog}) => {
  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img 
              src={`${API}/blog/photo/${blog.slug}`} 
              alt={blog.title} 
              style={{maxHeight: '200px', width: '100%'}} 
              className="img img-fluid"
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a><h5 className="card-title">{blog.title}</h5></a>
          </Link>
          <p className="card-text">{renderHTML(blog.excerpt)}</p>
        </section>
      </div>

      <div className="card-body">
        <div>
          Posted {moment(blog.updatedAt).fromNow()} by {' '}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a>{blog.postedBy.username} </a>
          </Link>
        </div>

        <Link href={`/blogs/${blog.slug}`}>
          <a>Read more</a>
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;