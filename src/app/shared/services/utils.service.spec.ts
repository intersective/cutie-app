import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;
  const modalController = null;
  const storage = null;
  const http = null;
  beforeEach(() => {
    service = new UtilsService(modalController, storage, http);
  });

  it('has lodash instantiated', () => {
    expect(service).toBeDefined();
  });
});
