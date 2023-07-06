import IRacingAPI from "iracing-api";
import configFile from '../../../src/assets/config.json' assert { type: "json" };
import fs from 'fs';

export class iRacingApiClient {

  private iRClient = new IRacingAPI();

  async login(username: string, password: string) {
    this.iRClient.login(username, password).then((res: any) => {
      if (res?.authcode) {
        this.getSeries();
        this.getCars();
        this.getCarClasses();
        this.getTracks();
      }
    });
  }

  private getSeries() {
    this.iRClient.getSeriesSeasons().then((res) => {
      fs.writeFile('src/assets/series.json', JSON.stringify(res), 'utf8', () => {
      });
    });
  }

  private getCars() {
  }

  private getCarClasses() {
  }

  private getTracks() {
  }
}

const main = async() => {
  const username = configFile.user;
  const password = configFile.password;
  const ir = new iRacingApiClient();
  await ir.login(username, password);
};

main().then(() => "DONE");
