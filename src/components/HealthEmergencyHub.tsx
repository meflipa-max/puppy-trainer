import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  MapPin,
  Clock,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  Star,
  Plus,
  Edit2,
  Check,
  X,
  AlertOctagon,
  Stethoscope,
} from 'lucide-react';
import { EMERGENCY_CONTACTS_SALENTO, EmergencyContact } from '../data/emergencyContactsData';

interface CustomVet {
  name: string;
  phone: string;
  address?: string;
  notes?: string;
}

export const HealthEmergencyHub: React.FC = () => {
  const [customVet, setCustomVet] = useState<CustomVet | null>(null);
  const [isEditingCustomVet, setIsEditingCustomVet] = useState(false);
  const [vetFormName, setVetFormName] = useState('');
  const [vetFormPhone, setVetFormPhone] = useState('');
  const [vetFormAddress, setVetFormAddress] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'local' | 'h24' | 'poison'>('all');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('puppy_custom_emergency_vet');
      if (saved) {
        setCustomVet(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveCustomVet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vetFormName.trim() || !vetFormPhone.trim()) return;

    const newVet: CustomVet = {
      name: vetFormName.trim(),
      phone: vetFormPhone.trim(),
      address: vetFormAddress.trim() || undefined,
    };

    setCustomVet(newVet);
    try {
      localStorage.setItem('puppy_custom_emergency_vet', JSON.stringify(newVet));
    } catch (e) {
      console.error(e);
    }
    setIsEditingCustomVet(false);
  };

  const handleStartEdit = () => {
    setVetFormName(customVet?.name || '');
    setVetFormPhone(customVet?.phone || '');
    setVetFormAddress(customVet?.address || '');
    setIsEditingCustomVet(true);
  };

  const handleDeleteCustomVet = () => {
    setCustomVet(null);
    try {
      localStorage.removeItem('puppy_custom_emergency_vet');
    } catch (e) {
      console.error(e);
    }
    setIsEditingCustomVet(false);
  };

  const filteredContacts = EMERGENCY_CONTACTS_SALENTO.filter((contact) => {
    if (filterType === 'local') return contact.type === 'local_vet';
    if (filterType === 'h24') return contact.is24h && contact.type === 'h24_hospital';
    if (filterType === 'poison') return contact.type === 'poison_center';
    return true;
  });

  return (
    <div id="health-emergency-hub" className="space-y-4">
      {/* Local Emergency Header Banner */}
      <div className="bg-gradient-to-br from-rose-950 via-rose-900 to-stone-900 rounded-3xl p-4 sm:p-5 text-white shadow-md border border-rose-800/60 relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-rose-500 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Sos H24 Castrignano del Capo & Leuca
              </span>
              <span className="text-[11px] text-rose-200 font-medium">Basso Salento</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
              Pronto Soccorso Veterinario & Numeri Utili
            </h2>
            <p className="text-xs text-rose-100/90 max-w-xl mt-1 leading-relaxed">
              Contatti diretti con un tocco per chi risiede a <strong>Castrignano del Capo</strong>, <strong>Gagliano del Capo</strong>, <strong>Alessano</strong>, <strong>Tricase</strong> e cliniche H24 di riferimento a Lecce.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:0832520500"
              className="bg-white text-rose-950 hover:bg-rose-50 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-rose-600 animate-bounce" />
              <span>Chiama H24 (LeVet)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Box Veterinario di Fiducia Personale */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Il Tuo Veterinario di Fiducia
              </h3>
              <p className="text-[11px] text-stone-500">Salva il tuo medico di fiducia locale per chiamarlo subito</p>
            </div>
          </div>

          {!isEditingCustomVet && (
            <button
              type="button"
              onClick={handleStartEdit}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1"
            >
              {customVet ? (
                <>
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Modifica</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Aggiungi il tuo veterinario</span>
                </>
              )}
            </button>
          )}
        </div>

        {isEditingCustomVet ? (
          <form onSubmit={handleSaveCustomVet} className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Nome Veterinario o Clinica <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={vetFormName}
                  onChange={(e) => setVetFormName(e.target.value)}
                  placeholder="es. Dott. Rossi - Leuca / Castrignano"
                  required
                  className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Numero di Telefono <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  value={vetFormPhone}
                  onChange={(e) => setVetFormPhone(e.target.value)}
                  placeholder="es. 333 1234567 o 0833 000000"
                  required
                  className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Indirizzo o Note (Opzionale)
              </label>
              <input
                type="text"
                value={vetFormAddress}
                onChange={(e) => setVetFormAddress(e.target.value)}
                placeholder="es. Via Roma, Castrignano del Capo"
                className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              {customVet && (
                <button
                  type="button"
                  onClick={handleDeleteCustomVet}
                  className="text-rose-600 hover:text-rose-700 font-semibold px-2.5 py-1 text-xs"
                >
                  Rimuovi
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsEditingCustomVet(false)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold px-3 py-1 rounded-lg text-xs"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1 rounded-lg text-xs shadow-xs"
              >
                Salva Veterinario
              </button>
            </div>
          </form>
        ) : customVet ? (
          <div className="mt-2 bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="font-bold text-stone-900 text-sm block truncate">
                {customVet.name}
              </span>
              {customVet.address && (
                <p className="text-[11px] text-stone-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{customVet.address}</span>
                </p>
              )}
            </div>

            <a
              href={`tel:${customVet.phone.replace(/\s+/g, '')}`}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs shrink-0 flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Chiama ({customVet.phone})</span>
            </a>
          </div>
        ) : (
          <p className="text-xs text-stone-500 mt-1 italic">
            Nessun veterinario personale salvato. Puoi salvare il numero del tuo medico per averlo a portata di tocco rapido.
          </p>
        )}
      </div>

      {/* Filter Tabs for Emergency Contacts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-stone-500 font-bold uppercase tracking-wider text-[10px] pl-1 shrink-0">
          Filtra:
        </span>
        {[
          { id: 'all', label: 'Tutti i Contatti' },
          { id: 'local', label: 'Vicinissimi (3-15 km)' },
          { id: 'h24', label: 'Ospedali H24 Lecce' },
          { id: 'poison', label: 'Centro Antiveleni H24' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterType(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition-all ${
              filterType === tab.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredContacts.map((c) => (
          <div
            key={c.id}
            className={`rounded-2xl border p-4 flex flex-col justify-between transition-all bg-white shadow-xs ${
              c.is24h
                ? 'border-rose-300 ring-1 ring-rose-100 hover:border-rose-500'
                : 'border-stone-200 hover:border-emerald-300'
            }`}
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    c.is24h
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : 'bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {c.is24h ? '🔴 Pronto Soccorso H24' : 'Ambulatorio / Visite'}
                </span>
                <span className="text-[11px] font-bold text-stone-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  {c.distanceFromCastrignano}
                </span>
              </div>

              {/* Name */}
              <h4 className="font-bold text-stone-900 text-sm leading-snug">
                {c.name}
              </h4>
              <p className="text-xs text-emerald-800 font-medium mt-0.5">
                {c.locality}
              </p>

              {/* Address */}
              <p className="text-[11px] text-stone-500 mt-1 leading-tight">
                {c.address}
              </p>

              {/* Description */}
              <p className="text-xs text-stone-700 mt-2 leading-relaxed bg-stone-50 p-2 rounded-lg">
                {c.description}
              </p>
            </div>

            {/* Action Call Button */}
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-stone-800">
                {c.displayPhone}
              </span>
              <a
                href={`tel:${c.phone}`}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl text-white flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 shrink-0 ${
                  c.is24h
                    ? 'bg-rose-700 hover:bg-rose-800'
                    : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Chiama Ora</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
