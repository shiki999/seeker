import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs, query }) => {
  const head = () => (
    <Head>
      <title>{category.name} | {APP_NAME} </title>
      <meta name="description" content={`Best contents on ${category.name}`} />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
      <meta property="og:description" content={`Best contents on ${category.name}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/careerblog.jpg`} />

      <meta property="og:image" content={`${DOMAIN}/static/images/careerblog.jpg`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/careerblog.jpg`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <section className="site-section pb-0">
          <div className="container">
            <div className="col-12 pb-3">
              <h2>{category.name}</h2>
            </div>
          </div>
        </section>

        <section className="site-section pt-0">
          <div className="container">
            <div className="row mb-5">

            </div>
            <div className="row">
              {blogs.map((b, i) => <Card key={i} blog={b} />)}
            </div>
          </div>
        </section>

      </Layout>
    </React.Fragment>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs, query };
    }
  });
};

export default Category;