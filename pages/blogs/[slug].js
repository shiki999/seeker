import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';
import DisqusThread from '../../components/DisqusThread';

const SingleBlog = ({ blog, query }) => {
  const head = () => (
    <Head>
      <title>{blog.title} | {APP_NAME} </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`}/>
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`}/>
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const showBlogCategories = blog =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showBlogTags = blog => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  const showRelatedBlog = () => {
    return related.map((blog, i) => (
  
              <Card key={i} blog={blog} />
    ))
  }

  const showComments = () => {
    return (
      <div>
        <DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />
      </div>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section className="site-section">
                  <div className="row justify-content-center" style={{marginTop: '-30px'}}>
                    <img 
                      src={`${API}/blog/photo/${blog.slug}`} 
                      alt={blog.title} 
                      className="img img-fluid feature-image"
                    />
                  </div>
              </section>
              <section className="site-section">
                <div className="container">
                  <h1 className="display-3 text-center">{blog.title}</h1>
                  <p className="text-center">
                    Written by {' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                      <a>{blog.postedBy.username} </a>
                    </Link>
                    | Published {moment(blog.updatedAt).fromNow()}
                  </p>

                  <div className="col-md-4 mx-auto">
                    {showBlogTags(blog)}
                    <br />
                  </div>
                </div>
              </section>
            </div>

            <section className="site-section">
              <div class="container">
                <div class="row blog-entries element-animate">
                  <div class="col-md-8 mx-auto main-content">
                    <div class="post-content-body">
                      {renderHTML(blog.body)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="site-section">
              <div className="container pb-5">
                <h4 className="text-center py-5 h2">Related Blogs</h4>
                <hr />
                <div className="row">
                  {showRelatedBlog()}
                </div>
              </div>
            </section>

            <section className="site-section">
              <div className="container pb-5">
                {showComments()}
              </div>
            </section>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then(data => {
    if(data.error) {
      console.log(data.error);
    } else {
      return {blog: data, query};
    }
  });
};


export default (SingleBlog);