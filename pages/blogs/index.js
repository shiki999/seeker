import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import Card from '../../components/blog/Card';

const Blogs = ({ blogs, categories, tags, totalBlogs, blogLimit, blogSkip, router }) => {
  const head = () => (
    <Head>
      <title>Career blogs | {APP_NAME} </title>
      <meta name="description" content="Blogs about all career paths and personal development" />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
      <meta property="og:title" content={`Latest news about different career paths | ${APP_NAME}`}/>
      <meta property="og:description" content="Blogs about all career paths and personal development" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />

      <meta property="og:image" content={`${DOMAIN}/static/images/careerblog.jpg`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/careerblog.jpg`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const [limit, setLimit] = useState(blogLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlog] = useState([]);

    const loadMore = () => {
      let toSkip = skip + limit;
      listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
        if(data.error) {
          console.log(data.error);
        } else {
          setLoadedBlog([...loadedBlogs, ...data.blogs]);
          setSize(data.size);
          setSkip(toSkip);
        }
      });
    };

    const loadMoreButton = () => {
      return (
        size > 0 && 
        size >= limit && 
        (<button onClick={loadMore} className="btn load-btn btn-primary btn-lg">
          Load more
        </button>)
      )
    }

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
          <Card key={i} blog={blog}/>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="post-category text-white bg-secondary mb-3 ml-3">{c.name}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
        <Card key={i} blog={blog} />
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <section className="site-section pb-0">
          <div className="container">
            <div className="col-12 pb-3">
              <h2>All articles</h2>
            </div>
          </div>
        </section>
    
        <section className="site-section pt-0">
          <div className="container">
            <div className="row mb-5">

            </div>
              <div className="row">
                {showAllBlogs()}
              </div>
              <div className="row">
                {showLoadedBlogs()}
              </div>
            <div className="text-center py-5">{loadMoreButton()}</div>
            </div>
        </section>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 6;
  return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
    if(data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs, 
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogLimit: limit,
        blogSkip: skip
      };
    }
  });
};

export default withRouter(Blogs);