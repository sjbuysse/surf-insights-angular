import { Injectable } from '@angular/core';

@Injectable()
export class ImageResizerService {

  constructor() { }

  resizeImage(data, maxWidth = 1000, maxHeight = 1000): Promise<object> {
    const self = this;
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      // add this delay of 10ms in between actions to free up the call stack and give the UI a chance to get something done.
      // (Would be better to use web workers in stead, but the support is too little for now and web workers can't access
      // the DOM (so can't use a canvas))
      const delay = 10;

      img.onload = function(){
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        // add a canvas, and draw image on it with right dimensions, then export the image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        setTimeout(function(){
          self.drawImageIOSFix(ctx, img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, width, height);
        }, delay); // gives the UI a chance to get something done.

        setTimeout(function(){
          canvas.toBlob(function(blob){
            resolve(blob);
          }, 'image/png');
        }, delay); // gives the UI a chance to get something done.
      };

      console.log(data);
      img.src = data;
      img.onerror = reject;

    });
  }

  /**
   * Detecting vertical squash in loaded image.
   * Fixes a bug which squash image vertically while drawing into canvas for some bigger (+2MB?) images.
   * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
   *
   */
   private detectVerticalSquash(img) {
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    let sy = 0;
    let ey = ih;
    let py = ih;
    while (py > sy) {
      const alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    const ratio = (py / ih);
    return (ratio === 0) ? 1 : ratio;
  }

  /**
   * A replacement for context.drawImage
   * (args are for source and destination).
   */
   private drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh): void {
    const vertSquashRatio = this.detectVerticalSquash(img);
    console.log('Vertical Squash Ration: ' + vertSquashRatio);
    // Works only if whole image is displayed:
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
    // The following works correct also when only a part of the image is displayed:
    // ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio,
    // sw * vertSquashRatio, sh * vertSquashRatio,
    // dx, dy, dw, dh );
  }
}
