import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import BackButton from '../../../components/AEV/AEV.BackButton/BackButton';
import './Terms.scss';

const Terms = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const sections = [
        {
            id: 'introduction',
            title: 'Introduction',
            content: `Bienvenue sur Aevoria, une plateforme de jeux vidéo innovante. Les présentes conditions générales d'utilisation régissent votre utilisation de notre plateforme et de tous les services associés. En utilisant Aevoria, vous acceptez d'être lié par ces conditions.`
        },
        {
            id: 'account',
            title: 'Compte Utilisateur',
            content: `Pour accéder à certaines fonctionnalités d'Aevoria, vous devez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos informations de connexion et de toutes les activités qui se produisent sous votre compte. Vous devez immédiatement nous informer de toute utilisation non autorisée de votre compte.`
        },
        {
            id: 'services',
            title: 'Services et Contenus',
            content: `Aevoria fournit une plateforme permettant aux utilisateurs d'accéder à des jeux vidéo, de participer à des tournois et d'interagir avec d'autres joueurs. Nous nous réservons le droit de modifier, suspendre ou interrompre tout aspect du service à tout moment.`
        },
        {
            id: 'conduct',
            title: 'Code de Conduite',
            content: `Les utilisateurs d'Aevoria doivent respecter certaines règles de conduite. Il est interdit de : harceler d'autres utilisateurs, tricher dans les jeux, utiliser des exploits ou des programmes non autorisés, diffuser du contenu inapproprié ou illégal.`
        },
        {
            id: 'payments',
            title: 'Paiements et Abonnements',
            content: `Certains services sur Aevoria peuvent nécessiter un paiement ou un abonnement. Tous les paiements sont traités de manière sécurisée. Les abonnements se renouvellent automatiquement sauf annulation de votre part avant la date de renouvellement.`
        },
        {
            id: 'privacy',
            title: 'Confidentialité',
            content: `Nous prenons la protection de vos données personnelles très au sérieux. Notre politique de confidentialité détaille comment nous collectons, utilisons et protégeons vos informations personnelles.`
        },
        {
            id: 'intellectual',
            title: 'Propriété Intellectuelle',
            content: `Tout le contenu présent sur Aevoria, y compris les logos, les marques, les textes et les graphiques, est protégé par les lois sur la propriété intellectuelle. Vous ne pouvez pas utiliser ce contenu sans notre autorisation explicite.`
        },
        {
            id: 'termination',
            title: 'Résiliation',
            content: `Nous nous réservons le droit de suspendre ou de résilier votre compte en cas de violation de ces conditions. Vous pouvez également résilier votre compte à tout moment en nous contactant.`
        },
        {
            id: 'modifications',
            title: 'Modifications des Conditions',
            content: `Nous pouvons modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur la plateforme. Votre utilisation continue d'Aevoria après ces modifications constitue votre acceptation des nouvelles conditions.`
        },
        {
            id: 'contact',
            title: 'Contact',
            content: `Si vous avez des questions concernant ces conditions, vous pouvez nous contacter à support@aevoria.com. Notre équipe se fera un plaisir de vous aider.`
        }
    ];

    const filteredSections = sections.filter(section =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="terms-container">
            <div className="terms-layout">
                <div className="terms-sidebar">
                    <div className="sidebar-header">
                        <BackButton />
                    </div>

                    <div className="search-container">
                        <IoSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Rechercher dans les conditions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <nav className="terms-navigation">
                        <div className="nav-header">Table des matières</div>
                        {sections.map(section => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="nav-item"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {section.title}
                            </a>
                        ))}
                    </nav>
                </div>

                <main className="terms-main">
                    <div className="terms-header">
                        <h1>Conditions Générales d'Utilisation</h1>
                        <div className="last-updated">
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                        </div>
                    </div>

                    <div className="terms-content">
                        {filteredSections.map(section => (
                            <section key={section.id} id={section.id} className="terms-section">
                                <h2>{section.title}</h2>
                                <p>{section.content}</p>
                            </section>
                        ))}

                        {filteredSections.length === 0 && (
                            <div className="no-results">
                                Aucun résultat trouvé pour "{searchTerm}"
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Terms;
