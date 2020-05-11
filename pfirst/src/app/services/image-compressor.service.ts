import {Injectable} from "@angular/core";
import {NgxImageCompressService} from "ngx-image-compress";

@Injectable()
export class ImageCompressorService {

  constructor(private imageCompress: NgxImageCompressService) {
  }

  servCompressedURl: any;


  compressFile(image) {
    return new Promise( (resolve) => {
      let orientation = -1;
      //this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.servCompressedURl = result;
          resolve('success');
        });
    });
  }
}
