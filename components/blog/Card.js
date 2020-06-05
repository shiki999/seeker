import Link from 'next/link'
import renderHTML from 'react-render-html';
import moment from 'moment';
import {API} from '../../config';

const Card = ({blog}) => {
  const showBlogCategories = blog =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="text-white">{c.name}</a>
      </Link>
    ));

  return (
        <div className="col-lg-4 mb-4">
          <div className="entry2">
            <Link href={`/`}>
              <a><img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img-fluid rounded" /></a>
            </Link>
          
            <div className="excerpt">
              <span className="post-category text-white bg-secondary mb-3">{showBlogCategories(blog)}</span>

              <h2>
                <Link href={`/blogs/${blog.slug}`}>
                  <a>{blog.title}</a>
                </Link>
              </h2>
              <div className="post-meta align-items-center text-left clearfix">
                <figure className="author-figure mb-0 mr-3 float-left">
                  <img src={`./static/images/person_1.jpg`} alt="Image" className="img-fluid" />
                </figure>
                <span className="d-inline-block mt-1">By <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link></span>
                <span>&nbsp;-&nbsp; Published {moment(blog.updatedAt).fromNow()}</span>
              </div>
            
              <p>{renderHTML(blog.excerpt)}</p>
              <p><Link href={`/blogs/${blog.slug}`}><a href="#">Read More</a></Link></p>
            </div>
          </div>
        </div>
  );
};

export default Card;