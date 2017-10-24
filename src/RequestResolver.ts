import { maxSatisfying } from 'semver';

import Request from './Request';

export interface IVersionRegistry {
  getVersions(packageName: string): Promise<string[]>;
}

class RequestResolver {
  private registry: IVersionRegistry;

  constructor(registry: IVersionRegistry) {
    this.registry = registry;
  }

  public resolve(req: string): Promise<string> {
    const request = new Request(req);

    return this.registry.getVersions(request.getPackage()).then(versions => {
      const version = maxSatisfying(versions, request.getVersionRange());

      return (
        version && `${request.getPackage()}@${version}/${request.getFile()}`
      );
    });
  }
}

export default RequestResolver;
