import React from 'react';
import { AnalysisResult } from '../types';
import { InfoIcon, ChecklistIcon, LightbulbIcon, CheckCircleIcon } from './icons';

interface ResultDisplayProps {
  result: AnalysisResult | null;
  t: {
    summary: string;
    materialsNeeded: string;
    stepsTitle: string;
    stepsSubtitle: string;
    additionalTip: string;
  }
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, t }) => {
  if (!result) return null;

  return (
    <div className="w-full mt-10 space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 text-indigo-500">
            <InfoIcon />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.summary}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {result.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 text-green-500">
            <ChecklistIcon />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.materialsNeeded}</h3>
            <ul className="mt-3 space-y-2">
              {result.materialsNeeded.map((material, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircleIcon />
                  <span className="ml-2">{material}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.stepsTitle}</h3>
            <p className="text-gray-500 dark:text-gray-400">{t.stepsSubtitle}</p>
        </div>
        <div className="relative pl-8">
          <div className="absolute left-12 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>

          {result.steps.map((step, index) => (
            <div key={index} className="relative mb-8">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full ring-8 ring-gray-100 dark:ring-gray-900 text-white font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="ml-12 pt-1">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">{step.title}</h4>
                <p className="mt-1 text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 text-yellow-500">
            <LightbulbIcon />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.additionalTip}</h3>
            <p className="mt-2 text-indigo-800 dark:text-indigo-300">
              {result.additionalTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;