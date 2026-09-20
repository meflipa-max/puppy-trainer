/**
 * Ridimensiona e comprime un'immagine caricata dall'utente per memorizzarla
 * in modo ottimale in localStorage senza appesantire la memoria.
 */
export function processPuppyPhoto(file: File, maxDimension = 360): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Il file selezionato non è un\'immagine valida.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Errore durante la lettura del file.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Impossibile caricare l\'immagine.'));
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calcola il crop o ridimensionamento mantenendo le proporzioni
          const minSide = Math.min(width, height);
          const startX = (width - minSide) / 2;
          const startY = (height - minSide) / 2;

          const targetSize = Math.min(maxDimension, minSide);
          canvas.width = targetSize;
          canvas.height = targetSize;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Impossibile elaborare l\'immagine.'));
            return;
          }

          // Disegna ritagliando al centro (crop quadrato perfetto per l'avatar)
          ctx.drawImage(
            img,
            startX,
            startY,
            minSide,
            minSide,
            0,
            0,
            targetSize,
            targetSize
          );

          // Converti in JPEG compresso (qualità 0.82, dimensione media 25-45KB)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
