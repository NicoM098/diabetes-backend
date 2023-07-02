import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Agent } from 'https';
import * as fs from 'fs';
import { PeerCertificate } from 'tls';

@Injectable()
export class HueApiService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Retrieves a client's information from the "backend-aprendizaje" by ID
   * @param action - Turn "on" or "off" the light
   * @returns The client's information
   */
  async switchLight(action: boolean) {
    try {
      // Get the API URL and headers from the methods service
      const bridgeUrl = 'https://190.106.110.115';
      const LIGHT_ID = 'f4d950ca-1fb8-43b9-8774-2a73cee3207a';
      const BRIDE_API_KEY = 'X4wFzohej6W2ijQlXuyejDgUcf5WcpMl41xKgBal';

      const ca = fs.readFileSync('./cert.pem');

      const agent = new Agent({
        ca,
        checkServerIdentity: (hostname: string, cert: PeerCertificate) => {
          if (cert.subject.CN === 'ecb5fafffe90b68d') {
            console.log('Server identity verified');
            return undefined;
          } else {
            return new Error('Server identity not verified');
          }
        },
      });

      const { data } = await this.httpService.axiosRef.put(
        `${bridgeUrl}/clip/v2/resource/light/${LIGHT_ID}`,
        {
          on: {
            on: action,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'hue-application-key': BRIDE_API_KEY,
          },
          httpsAgent: agent,
        },
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          code: error?.code || '',
          detail: error?.response?.data || error.response,
        },
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
