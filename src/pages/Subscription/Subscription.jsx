import React from 'react'
import HeaderSectionImage from '../../components/Layout/HeaderSectionImage/HeaderSectionImage'
import SubscribeCard from './SubscribeCard/SubscribeCard'
import FAQ from './FAQ/FAQ'
import './Subscription.scss'

const Subscription = () => {
  return (
    <>
      <HeaderSectionImage title="Subscription" />
      <section className="subscription-section">
        <div className="subscription-container">
          <h2 className="title-center">Join Aevoria today!</h2>
          <p className="subtitle-faq font-montserrat">
            Choose the plan that suits your gaming needs.
          </p>
          <SubscribeCard />
          <FAQ />
        </div>
      </section>
    </>
  )
}

export default Subscription
