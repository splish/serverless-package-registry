import { validRange } from 'semver';

class PackageFileRequest {
  private req: string;

  constructor(req: string) {
    this.req = req;
  }

  public getScope(): string {
    return this.req.split('/')[0];
  }

  public getFile(): string {
    return this.req.split('/')[1];
  }

  public getPackage(): string {
    return this.getScope().split('@')[0];
  }

  public getVersionRange(): string {
    const version = this.getScope().split('@')[1] || '*';

    return validRange(version);
  }
}

export default PackageFileRequest;
