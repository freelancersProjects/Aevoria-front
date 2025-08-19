
import HeaderSectionImage from '../../components/Layout/HeaderSectionImage/HeaderSectionImage';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import './BlogPage.scss';

const BlogPage = () => {
  return (
    <div className="blog-page">
      <HeaderSectionImage title="Blog" />

      <div className="blog-content">
        <div className="main-content">
          <div className="featured-article">
            <div className="article-image">
              <img src="/images/blog/vr-gaming.jpg" alt="The Future of VR Gaming" />
            </div>
            <div className="article-content">
              <h1>The Future of VR Gaming: Insights From Top Developers</h1>
              <div className="article-meta">
                <span><FaCalendarAlt /> 15 Mars 2024</span>
                <span><FaUser /> John Doe</span>
              </div>
              <p>Découvrez les dernières innovations en matière de réalité virtuelle et comment elles vont transformer l'industrie du gaming dans les années à venir.</p>
              <button className="read-more">Lire plus <FaArrowRight /></button>
            </div>
          </div>

          <section className="trending-articles">
            <h2>Trending Articles</h2>
            <div className="articles-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="article-card">
                  <div className="article-image">
                    <img src={`/images/blog/article-${item}.jpg`} alt={`Article ${item}`} />
                  </div>
                  <div className="article-info">
                    <h3>Cyberpunk 2077: La mise à jour 2.0 change tout</h3>
                    <div className="article-meta">
                      <span><FaCalendarAlt /> 10 Mars 2024</span>
                      <span><FaUser /> Jane Smith</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="sidebar">
          <div className="popular-posts">
            <h2>Popular Posts</h2>
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="popular-post-item">
                <div className="post-image">
                  <img src={`/images/blog/popular-${item}.jpg`} alt={`Popular post ${item}`} />
                </div>
                <div className="post-info">
                  <h3>Les meilleurs jeux de 2024</h3>
                  <div className="post-meta">
                    <span><FaCalendarAlt /> 5 Mars 2024</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="current-offers">
        <h2>Les offres du moment</h2>

      </section>
    </div>
  );
};

export default BlogPage;
