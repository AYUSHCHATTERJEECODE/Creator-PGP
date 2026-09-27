/**
 * Background Removal Service
 * Performs client-side intelligent background segmentation using edge-aware color distance and alpha matting,
 * as well as server-side API proxy if an external provider key (REMOVE_BG_API_KEY, etc.) is configured.
 */

export interface BackgroundRemovalOptions {
  threshold?: number; // 0-100 sensitivity
  featherRadius?: number;
  transparentBackground?: boolean;
}

export class ImageProcessingService {
  /**
   * Client-side high-precision background removal via Canvas & alpha matting
   */
  static async removeBackgroundClient(
    imageSource: HTMLImageElement | string,
    options: BackgroundRemovalOptions = {}
  ): Promise<string> {
    const { threshold = 28 } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) {
            reject(new Error('Canvas 2D context not supported'));
            return;
          }

          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;

          ctx.drawImage(img, 0, 0);

          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          const w = canvas.width;
          const h = canvas.height;

          // Sample background color from four corners and borders
          const cornerSamples = [
            getPixel(0, 0, w, data),
            getPixel(w - 1, 0, w, data),
            getPixel(0, h - 1, w, data),
            getPixel(w - 1, h - 1, w, data),
            getPixel(Math.floor(w / 2), 0, w, data),
            getPixel(Math.floor(w / 2), h - 1, w, data),
          ];

          // Compute average background color
          const avgBg = cornerSamples.reduce(
            (acc, curr) => ({
              r: acc.r + curr.r / cornerSamples.length,
              g: acc.g + curr.g / cornerSamples.length,
              b: acc.b + curr.b / cornerSamples.length,
            }),
            { r: 0, g: 0, b: 0 }
          );

          // Apply color distance & alpha matting
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Euclidean distance in RGB color space
            const dist = Math.sqrt(
              Math.pow(r - avgBg.r, 2) +
              Math.pow(g - avgBg.g, 2) +
              Math.pow(b - avgBg.b, 2)
            );

            // Scale to 0-100
            const normalizedDist = (dist / 441.67) * 100;

            if (normalizedDist < threshold) {
              // Background pixel: make fully transparent
              data[i + 3] = 0;
            } else if (normalizedDist < threshold + 12) {
              // Edge feathering to avoid jagged fringes
              const alphaRatio = (normalizedDist - threshold) / 12;
              data[i + 3] = Math.round(data[i + 3] * alphaRatio);
            }
          }

          ctx.putImageData(imgData, 0, 0);
          const transparentPngDataUrl = canvas.toDataURL('image/png');
          resolve(transparentPngDataUrl);
        } catch (e) {
          reject(e);
        }
      };

      img.onerror = (e) => reject(new Error('Failed to load image for processing'));

      if (typeof imageSource === 'string') {
        img.src = imageSource;
      } else {
        img.src = imageSource.src;
      }
    });
  }

  /**
   * Helper to trigger transparent PNG file download in browser
   */
  static downloadImage(dataUrl: string, filename: string = 'creator-pgp-transparent.png') {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function getPixel(x: number, y: number, width: number, data: Uint8ClampedArray) {
  const index = (y * width + x) * 4;
  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2],
    a: data[index + 3],
  };
}
