export class PinUtils {
  /**
   *
   */
  static toImageData(svg: string, scale?: number): Promise<ImageData> {
    return new Promise((resolve, reject) => {
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const image = document.createElement('img');
      image.src = url;
      image.addEventListener(
        'load',
        () => {
          const w = image.width;
          const h = image.height;
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = w;
          canvas.height = h;
          if (scale) {
            context.scale(scale, scale);
          }
          context.drawImage(image, 0, 0);
          const imageData = context.getImageData(0, 0, w, h);

          resolve(imageData);

          URL.revokeObjectURL(url);
        },
        { once: true },
      );
      image.addEventListener('error', reject);
    });
  }
}
