import React, { useState } from 'react';
import {
  Syringe,
  HeartPulse,
  AlertTriangle,
  Activity,
  Flame,
  Footprints,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  Stethoscope,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { HealthTopic } from '../data/healthData';

const ICON_MAP: Record<string, React.ElementType> = {
  Syringe,
  HeartPulse,
  AlertTriangle,
  Activity,
  Flame,
  Footprints,
  ShieldAlert,
};

interface HealthTopicCardProps {
  topic: HealthTopic;
}

export const HealthTopicCard: React.FC<HealthTopicCardProps> = ({ topic }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = ICON_MAP[topic.iconName] || AlertTriangle;

  const isEmergency = topic.category === 'emergenza';

  return (
    <div
      id={`health-card-${topic.id}`}
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
        isEmergency
          ? 'border-rose-200 hover:border-rose-400'
          : 'border-stone-200 hover:border-emerald-300'
      }`}
    >
      <div className="p-4 sm:p-5">
        {/* Top Meta Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            {topic.categoryLabel}
          </span>
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${topic.badgeColor}`}
          >
            {topic.badge}
          </span>
        </div>

        {/* Title & Icon */}
        <div className="flex items-start gap-3 mb-2.5">
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              isEmergency
                ? 'bg-rose-50 text-rose-600'
                : topic.category === 'vaccini'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-purple-50 text-purple-600'
            }`}
          >
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-stone-900 text-base sm:text-lg leading-snug">
              {topic.title}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">{topic.subtitle}</p>
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-3">
          {topic.summary}
        </p>

        {/* WHAT COULD HAPPEN BOX (Esempio Pratico di cosa potrebbe accadere) */}
        {topic.whatCouldHappen && (
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 sm:p-3.5 mb-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-950 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Esempio di cosa potrebbe accadere:</span>
            </div>
            <p className="text-stone-800 italic mb-2 pl-5">
              "{topic.whatCouldHappen.scenario}"
            </p>
            <div className="pl-5 space-y-1">
              <span className="font-bold text-amber-900 text-[11px] uppercase tracking-wider block">
                Sintomi & conseguenze tipiche:
              </span>
              <ul className="list-disc pl-4 space-y-1 text-stone-700">
                {topic.whatCouldHappen.symptoms.map((symptom, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Expand/Collapse Toggle Button */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className={`w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold transition-colors mt-2 ${
            isExpanded
              ? 'bg-stone-100 text-stone-800'
              : isEmergency
              ? 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          <span>
            {isExpanded
              ? 'Nascondi protocollo e consigli'
              : 'Mostra cosa fare, cosa NON fare e consigli del veterinario'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {/* Expanded Detailed Section */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-stone-100 space-y-4 animate-in fade-in duration-200">
            {/* Key Action Steps */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Cosa sapere e come agire:
              </h4>
              <div className="space-y-2.5">
                {topic.keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-100/90 text-xs"
                  >
                    <span className="font-bold text-stone-900 block mb-0.5">
                      {point.title}
                    </span>
                    <p className="text-stone-700 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CRITICAL DO NOT (Cosa NON fare assolutamente) */}
            {topic.criticalDoNot.length > 0 && (
              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-950">
                <span className="font-bold text-rose-900 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider text-[11px]">
                  <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                  Cosa NON fare assolutamente:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-rose-900">
                  {topic.criticalDoNot.map((err, i) => (
                    <li key={i} className="leading-relaxed font-medium">
                      {err}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Vet Advice */}
            <div className="bg-stone-50 border-l-3 border-emerald-600 p-3 rounded-r-xl text-xs text-stone-800">
              <span className="font-bold text-emerald-900 flex items-center gap-1 text-[11px] uppercase tracking-wider mb-0.5">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-700" />
                Consiglio del Veterinario:
              </span>
              <p className="text-stone-700 leading-relaxed">{topic.vetAdvice}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
