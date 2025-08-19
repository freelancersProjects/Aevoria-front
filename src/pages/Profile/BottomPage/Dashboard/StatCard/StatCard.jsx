import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

import WalletIcon from '../../../../../assets/svg/profile-dashboard/wallet.svg';
import SavedIcon from '../../../../../assets/svg/profile-dashboard/total-saved.svg';
import RankingIcon from '../../../../../assets/svg/profile-dashboard/ranking.svg';
import LinkIcon from '../../../../../assets/svg/profile-dashboard/affiliate-link.svg';

import './StatCard.scss';

const StatCard = ({ type }) => {
  const [copied, setCopied] = useState(false);
  const affiliateUrl = 'https://www.aevoria.com/?igr=gamer-abab898';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderIcon = () => {
    switch (type) {
    case 'saved':
      return <img src={SavedIcon} alt="saved" />;
    case 'wallet':
      return <img src={WalletIcon} alt="wallet" />;
    case 'ranking':
      return <img src={RankingIcon} alt="ranking" />;
    case 'affiliate':
      return <img src={LinkIcon} alt="link" />;
    default:
      return null;
    }
  };

  return (
    <div className="stat-card">
      {renderIcon()}
      {type === 'saved' && (
        <>
          <div className="card-title">Total saved</div>
          <div className="card-value">$250</div>
          <div className="card-sub">+5%</div>
        </>
      )}
      {type === 'wallet' && (
        <>
          <div className="card-title">Wallet</div>
          <div className="card-value">$0</div>
          <div className="card-sub">
            Affiliation <span className="highlight">e-wallet: $0</span>
          </div>
        </>
      )}
      {type === 'ranking' && (
        <>
          <div className="card-title mb-1">Ranking</div>
          <div className="level-tag">
            <span>Level 3</span>
            <div className="level-bar">
              <div className="progress" style={{ width: '40%' }} />
            </div>
          </div>
        </>
      )}
      {type === 'affiliate' && (
        <>
          <div className="card-title">Affiliate Link</div>
          <div className="affiliate-row">
            <span className="affiliate-url">{affiliateUrl}</span>
            <span className="copy-btn" onClick={copyToClipboard}>
              {copied ? (
                <CheckIcon fontSize="small" />
              ) : (
                <ContentCopyIcon fontSize="small" />
              )}
            </span>
          </div>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="affiliate-sub"
          >
            This is your affiliate link, share it to earn money!
          </a>
        </>
      )}
    </div>
  );
};

export default StatCard;
