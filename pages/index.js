import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import Card from '../components/blog/Card';
import BigCard from '../components/blog/BigCard';


const Index = ({ blogs, categories, tags, totalBlogs, blogLimit, blogSkip, router }) => {
  const head = () => (
      <Head>
          <title>Programming blogs | {APP_NAME}</title>
          <meta
              name="description"
              content="Collection of programming blogs and tutorials on react node next vue php laravel and web developoment"
          />
          <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
          <meta property="og:title" content={`Latest web developoment tutorials | ${APP_NAME}`} />
          <meta
              property="og:description"
              content="Collection of programming blogs and tutorials on react node next vue php laravel and web developoment"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
          <meta property="og:site_name" content={`${APP_NAME}`} />

          <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
          <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
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
      (<button onClick={loadMore} className="load-btn btn btn-primary btn-lg">
        See more
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
        <Card blog={blog} />
    ));
  };

  return (
      <React.Fragment>
          {head()}
          <Layout>
            <section className="site-section pb-0">
                <div className="container">
                  <div className="col-12 pb-3">
                    <h2>Lastest Blogs</h2>
                  </div>
                  <div className="row">
                    <BigCard blog={blogs[0]}/>
                    <BigCard blog={blogs[1]}/>
                  </div>
                  <hr />
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

Index.getInitialProps = () => {
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

export default withRouter(Index);