
import Accordion from '../../../components/AEV/AEV.Accordion/Accordion';
import './FAQ.scss';

const faqData = [
  {
    title: 'What is Aevoria?',
    content: 'Aevoria is a gaming platform that offers access to free and premium content for players and developers.',
  },
  {
    title: 'How does the subscription work?',
    content: 'You choose a plan and get monthly benefits including access to games, content, and giveaways.',
  },
  {
    title: 'Can I cancel my subscription?',
    content: 'To cancel your subscription, go to your account dashboard and click on \'Cancel my subscription\'.',
  },
  {
    title: 'What payment methods are accepted?',
    content: 'We accept all major credit cards, PayPal, and other local payment methods.',
  },
  {
    title: 'How do developers benefit?',
    content: 'Developers earn visibility and revenue via our partner program and community exposure.',
  },
];

const FAQ = () => {
  return (
    <section className="faq-wrapper">
      <div className="faq-container">
        <div className="faq-title-side">
          <h2 className="faq-title instrument-sans">Frequently Asked Questions</h2>
        </div>
        <div className="faq-list-side">
          {faqData.map((item, index) => (
            <Accordion key={index} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
