import React, { useState, useRef } from 'react';
import {
  X,
  Calendar,
  Dog,
  Sparkles,
  HeartHandshake,
  Info,
  Camera,
  UploadCloud,
  Trash2,
} from 'lucide-react';
import { PuppyProfile } from '../types';
import { calculatePuppyAge, estimateBirthDateFromMonths } from '../utils/puppyAge';
import { processPuppyPhoto } from '../utils/imageUtils';

interface PuppyProfileModalProps {
  isOpen: boolean;
  puppy: PuppyProfile;
  onClose: () => void;
  onSave: (updated: PuppyProfile) => void;
}

export const PuppyProfileModal: React.FC<PuppyProfileModalProps> = ({
  isOpen,
  puppy,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const initialBirthDate = puppy.birthDate || estimateBirthDateFromMonths(puppy.ageMonths || 3);

  const [name, setName] = useState(puppy.name || 'Max');
  const [breed, setBreed] = useState(puppy.breed || '');
  const [birthDate, setBirthDate] = useState(initialBirthDate);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(puppy.photoUrl);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const ageDetails = calculatePuppyAge(birthDate);

  const handleFile = async (file: File) => {
    setPhotoError(null);
    setIsProcessingPhoto(true);
    try {
      const processedDataUrl = await processPuppyPhoto(file);
      setPhotoUrl(processedDataUrl);
    } catch (err: any) {
      setPhotoError(err.message || 'Errore nel caricamento della foto');
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...puppy,
      name: name.trim() || 'Il Mio Cucciolo',
      breed: breed.trim() || undefined,
      birthDate,
      ageMonths: ageDetails ? ageDetails.monthsTotal : puppy.ageMonths,
      photoUrl,
    });
    onClose();
  };

  return (
    <div
      id="puppy-profile-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs overflow-hidden shrink-0">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Dog className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">Profilo Cucciolo</h2>
              <p className="text-xs text-stone-500">Foto, data di nascita e dati anagrafici</p>
            </div>
          </div>

          <button
            type="button"
            id="close-puppy-modal"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Sezione Caricamento Foto Cucciolo */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Foto del Cucciolo <span className="text-stone-400 font-normal lowercase">(opzionale)</span>
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              id="puppy-photo-file-input"
            />

            {photoUrl ? (
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xs border-2 border-emerald-400 shrink-0 relative bg-stone-200">
                  <img
                    src={photoUrl}
                    alt="Foto Cucciolo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-stone-800 truncate">Foto impostata</p>
                  <p className="text-[11px] text-stone-500 mb-2">Visibile nell'intestazione e nei progressi</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                    >
                      Cambia foto
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(undefined)}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Rimuovi
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50/80 scale-[1.01]'
                    : 'border-stone-300 hover:border-emerald-400 bg-stone-50/60 hover:bg-emerald-50/30'
                }`}
              >
                <div className="w-11 h-11 rounded-2xl bg-white shadow-2xs border border-stone-200 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                  {isProcessingPhoto ? (
                    <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-5 h-5" />
                  )}
                </div>
                <p className="text-xs font-bold text-stone-800 mb-0.5">
                  {isProcessingPhoto
                    ? 'Ottimizzazione foto in corso...'
                    : 'Carica la foto del tuo cucciolo'}
                </p>
                <p className="text-[11px] text-stone-500">
                  Trascina qui l'immagine oppure <span className="text-emerald-600 font-semibold underline">sfoglia i file</span>
                </p>
              </div>
            )}

            {photoError && (
              <p className="text-[11px] text-rose-600 mt-1 font-medium">{photoError}</p>
            )}
          </div>

          {/* Nome */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Nome del Cane <span className="text-emerald-600">*</span>
            </label>
            <input
              type="text"
              id="puppy-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="es. Max, Luna, Milo..."
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Data di nascita */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Data di Nascita <span className="text-emerald-600">*</span>
              </label>
              <span className="text-[11px] text-stone-400">Calcolo automatico dell'età</span>
            </div>
            <input
              type="date"
              id="puppy-birthdate-input"
              value={birthDate}
              max={todayStr}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
            />
          </div>

          {/* Razza / Taglia (Opzionale) */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Razza / Tipo <span className="text-stone-400 font-normal lowercase">(opzionale)</span>
            </label>
            <input
              type="text"
              id="puppy-breed-input"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="es. Golden Retriever, Meticcio, Barboncino..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Box Anteprima Dinamica dell'Età & Fase di Sviluppo */}
          {ageDetails && (
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-950">Età calcolata ad oggi:</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                  {ageDetails.formattedAge}
                </span>
              </div>

              <div className="pt-2 border-t border-emerald-200/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Fase di sviluppo canina:
                </span>
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg border mb-1.5 ${ageDetails.stageBadgeColor}`}>
                  {ageDetails.stageName}
                </span>
                <p className="text-xs text-stone-700 leading-relaxed flex items-start gap-1.5 mt-1">
                  <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{ageDetails.stageTip}</span>
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              id="save-puppy-profile-btn"
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4" />
              Salva Dati Cucciolo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

