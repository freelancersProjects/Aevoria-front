
import './Affiliation.scss';
import { FiCopy } from 'react-icons/fi';
import { BsDiscord } from 'react-icons/bs';

function Affiliation () {
  const affiliateLink = 'https://aevoria.com/?ref=gamer-id123';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    // TODO: Ajouter un toast ici
  };

  return (
    <div className="affiliation-page-root">
      <div className="affiliation-content">
        {/* TOP CARDS */}
        <div className="affiliation-top-cards">
          <div className="affiliation-card">
            <span className="affiliation-card-title">Total earned</span>
            <span className="affiliation-card-amount">$9,354.34</span>
            <button className="affiliation-withdraw-btn">
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_447_2122)">
                  <path d="M6.03846 0C4.51593 0 3.26923 1.24669 3.26923 2.76923V7.61539H1.19231C0.775842 7.61539 0.5 7.96154 0.5 8.30769V12.4615C0.5 12.8077 0.775842 13.1538 1.19231 13.1538H3.26923V15.2308C3.26923 16.7533 4.51593 18 6.03846 18H14.3462C15.8687 18 17.1154 16.7533 17.1154 15.2308V5.53846C17.1154 4.77584 16.4312 4.07542 15.2548 2.89904C15.0466 2.76112 14.9005 2.561 14.6923 2.42308C14.5544 2.21484 14.3543 2.06881 14.2163 1.86058C13.04 0.684195 12.3395 0 11.5769 0H6.03846ZM6.03846 1.38462H11.101C11.585 1.52254 11.5769 2.14724 11.5769 2.76923V4.84615C11.5769 5.26262 11.8528 5.53846 12.2692 5.53846H14.3462C15.0385 5.53846 15.7308 5.53846 15.7308 6.23077V15.2308C15.7308 15.9934 15.1088 16.6154 14.3462 16.6154H6.03846C5.27584 16.6154 4.65385 15.9934 4.65385 15.2308V13.1538H13.6538C14.0703 13.1538 14.3462 12.8077 14.3462 12.4615V8.30769C14.3462 7.96154 14.0703 7.61539 13.6538 7.61539H4.65385V2.76923C4.65385 2.00661 5.27584 1.38462 6.03846 1.38462ZM12.3341 8.24279C12.8182 8.24279 13.1698 8.29958 13.3077 8.4375L13.3726 8.52404L13.1779 9.21635C13.1779 9.21635 13.1617 9.28125 13.0913 9.28125H13.0264C12.8885 9.21094 12.6803 9.12981 12.3341 9.12981C11.6418 9.12981 11.2308 9.55709 11.2308 10.3197C11.1605 11.012 11.5769 11.4231 12.2692 11.4231C12.5451 11.4231 12.7533 11.3636 12.9615 11.2933H13.0264L13.0913 11.3582L13.2428 12.0505C13.2428 12.1208 13.2482 12.1154 13.1779 12.1154C12.9697 12.1857 12.6208 12.2452 12.2043 12.2452C10.9576 12.2452 10.1923 11.4961 10.1923 10.3197C10.1923 9.07302 11.0198 8.24279 12.3341 8.24279ZM2.51202 8.30769C2.71214 8.29958 2.93119 8.30769 3.13942 8.30769C3.83173 8.30769 4.30228 8.44291 4.71875 8.71875C5.13522 9.0649 5.41106 9.54627 5.41106 10.1683C5.41106 11.0688 5.0649 11.4934 4.71875 11.7692C4.30228 12.1154 3.6857 12.2452 2.92308 12.2452C2.439 12.2452 2.15775 12.2506 1.94952 12.1803C1.87921 12.1803 1.88462 12.1154 1.88462 12.1154V8.4375C1.88462 8.36719 1.87921 8.3726 1.94952 8.3726C2.1226 8.33744 2.3119 8.31581 2.51202 8.30769ZM7.70433 8.30769C8.8131 8.30769 9.5649 9.07302 9.5649 10.3197C9.63522 11.4961 8.88071 12.3317 7.70433 12.3317C6.59555 12.3317 5.82212 11.4961 5.82212 10.3197C5.82212 9.14333 6.59555 8.30769 7.70433 8.30769ZM2.92308 9.12981V11.4231H3.13942C3.55589 11.4231 3.81821 11.3501 4.02644 11.1418C4.23468 10.9336 4.3726 10.6713 4.3726 10.2548C4.30228 9.49219 3.96695 9.12981 3.20433 9.12981H2.92308ZM7.76923 9.12981C7.28516 9.12981 6.94712 9.6274 6.94712 10.3197C6.94712 11.012 7.28516 11.488 7.76923 11.488C8.25331 11.488 8.59135 11.012 8.59135 10.3197C8.59135 9.69772 8.32362 9.12981 7.76923 9.12981Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_447_2122">
                    <rect width="18" height="18" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                </defs>
              </svg>
              Withdraw balance
            </button>
          </div>
          <div className="affiliation-card">
            <span className="affiliation-card-title">Available for withdrawal</span>
            <span className="affiliation-card-amount">$150.50</span>
          </div>
        </div>

        {/* AFFILIATE LINK BLOCK */}
        <div className="affiliation-block affiliation-link-block">
          <h2 className="affiliation-block-title">Your affiliate link</h2>
          <div className="affiliation-link-row">
            <span className="affiliation-link-text">{affiliateLink}</span>
            <button className="affiliation-copy-btn" onClick={handleCopyLink}>
              <FiCopy /> Copy link
            </button>
          </div>
          <p className="affiliation-link-desc">
            Earn 5% on every sale made through your link! Share your affiliate link anywhere and start earning with us now! All pages on the site can be shared by adding ?gamerid= to the end of any Instant Gaming URL.
          </p>
          <button className="affiliation-boost-btn">
            Learn How To Boost Sales
          </button>
        </div>

        {/* TIPS BLOCK */}
        <div className="affiliation-block affiliation-tips-block">
          <h2 className="affiliation-block-title">Tips to boost your sales</h2>
          <ul className="affiliation-tips-list">
            <li>Share your affiliate link on social media</li>
            <li>Use attractive visuals with your affiliate link</li>
            <li>Share any link from the site by adding ?gamerid= to the end of the URL</li>
            <li>Create a wishlist and share it with your friends and followers</li>
            <li>Promote Steam, PlayStation, Xbox, Nintendo Gift Cards</li>
          </ul>
        </div>

        {/* DISCORD BLOCK */}
        <div className="affiliation-block affiliation-discord-block">
          <div className="affiliation-discord-content">
            <BsDiscord className="discord-icon" />
            <div>
              <h3 className="affiliation-block-title">Our Discord bot</h3>
              <p className="affiliation-discord-desc">
                Track your earnings and manage your affiliate program directly from Discord. Lorem ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <button className="affiliation-blue-btn">View more</button>
            </div>
          </div>
          <img
            src="/discord-preview.png"
            alt="Discord bot preview"
            className="affiliation-discord-preview"
          />
        </div>

        {/* PURCHASES BLOCK */}
        <div className="affiliation-block affiliation-purchases-block">
          <h2 className="affiliation-block-title">Your visitors' purchases</h2>
          <div className="affiliation-purchases-empty">
            No purchases made from your affiliate link yet for this period
          </div>
        </div>
      </div>
    </div>
  );
}

export default Affiliation;

