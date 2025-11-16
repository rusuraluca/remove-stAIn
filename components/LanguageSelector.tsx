import React from 'react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ro', name: 'Română' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
];

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div>
      <label htmlFor="language-select" className="sr-only">Select Language</label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="block w-full px-3 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
