import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

/**
 * UsersService class
 *
 * The service class manage users
 */
export class UsersService {
  users: any = [];
  smsURL: any;
  encryptionKey: string = "2e35f242a46d67eeb74aabc37d5e5d05";
  ivKey: any = "4d7073486578436f";
  thankYouCode: any = "";
  textFor404: any = 404;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Send the mail to user email address.
   *
   * @param {any} : user
   * @return {Observable}
   * @public
   */
  sendMail(user: any) {
    let apiUrl = `${environment.apiUrl}/sendEmail`;
    return this.http.post(apiUrl, user);
  }

  /**
   * Sends the sms to users input phone number.
   *
   * @param {any} : user
   * @return void
   * @public
   */
  sendSMS(user: any) {
    let apiUrl = `${environment.apiUrl}/sendSMS`;
    return this.http.post(apiUrl, user);
  }

  enc(plainText: any) {
    var key = CryptoJS.enc.Utf8.parse(this.encryptionKey);
    var iv = CryptoJS.enc.Utf8.parse(this.ivKey);
    var encryptedValue = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), key,
      {
        keySize: 128,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    var hexValue = this.string_to_hex(encryptedValue);
    return hexValue;
  }

  dec(cipherText: any) {
    var key = CryptoJS.enc.Utf8.parse(this.encryptionKey);
    var iv = CryptoJS.enc.Utf8.parse(this.ivKey);
    var hexDecodedValue = this.hex_to_string(cipherText);
    var decryptedValue = CryptoJS.AES.decrypt(hexDecodedValue, key,
      {
        keySize: 128,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return decryptedValue.toString(CryptoJS.enc.Utf8);
  }

  hex_to_string(strValue: any) {
    //--Convert Hex String to text string

    var hex = strValue.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }
  string_to_hex(strValue: any) {
    //--Convert Text String to Hex String
    const text = strValue.toString();
    var fullHex = '';
    for (var n = 0; n < text.length; n++) {
      var code = Number(text.charCodeAt(n)).toString(16);
      fullHex += code;
    }
    return fullHex.toUpperCase(); //must be uppercase
  }

  randomString() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    this.thankYouCode = result;
    return result;
  }
  
}
