import * as JSZipUtils from 'jszip-utils';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

const BASE_URL = 'http://localhost:8080/files/';

export class ZipCollectorHelper {

  private _nbItem: number;
  private _zip: JSZip;
  private _zipName: string;

  constructor() {
    this._nbItem = 0;
  }

  public collect(zipName: string, fileNames: string[]): void {
    this._zip = new JSZip();
    this._zipName = zipName;

    this._nbItem = fileNames.length;

    for (const name of fileNames) {
      JSZipUtils.getBinaryContent(BASE_URL + name, (err, data) => {
        this._zip.file(name, data, {binary: true});
        this.checkComplete();
      });
    }
  }

  private checkComplete(): void {
    this._nbItem--;
    if (this._nbItem === 0) {
      this.createZip();
    }
  }

  private createZip(): void {
    this._zip.generateAsync({type: 'blob'}).then(content => {
      FileSaver.saveAs(content, this._zipName);
    });
  }

}
