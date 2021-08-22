import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translation: {
                    label: {
                        mainTitle: 'Elca Information Management',
                        help: 'Help',
                        logout: 'Log out',
                        project: 'Project',
                        employee: 'Employee',
                        group: 'Group',
                        new: 'New',
                        itemSelected: '{{count}} item selected',
                        itemSelected_plural: '{{count}} items selected',
                        deleteSelectedItem: 'Delete selected item',
                        deleteSelectedItem_plural: 'Delete selected items',
                        delete: 'Delete',
                        search: 'Search',
                        resetSearch: 'Reset search'
                    }
                }
            },
            fr: {
                translation: {
                    label: {
                        mainTitle: 'Gestion des informations Elca',
                        help: 'Aider',
                        logout: 'Se déconnecter',
                        project: 'Projet',
                        employee: 'Employé',
                        group: 'Grouper',
                        new: 'Nouvelle',
                        delete: 'Effacer',
                        search: 'Chercher',
                        resetSearch: 'Réinitialiser la recherche'
                    }
                }
            }
        }
    });

export default i18n;
