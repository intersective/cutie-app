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

  describe('Removes all special characters and spaces', () => {
    it('simple strings', () => {
      expect(service.removeAllSpecialCharactersAndToLower('internship')).toEqual('internship');
    });
    it('capital letters', () => {
      expect(service.removeAllSpecialCharactersAndToLower('INTErNSHIP')).toEqual('internship');
    });
    it('white space', () => {
      expect(service.removeAllSpecialCharactersAndToLower('   inte rns h ip')).toEqual('internship');
    });
    it('dashes', () => {
      expect(service.removeAllSpecialCharactersAndToLower('inter-n-ship')).toEqual('internship');
    });
    it('underscores', () => {
      expect(service.removeAllSpecialCharactersAndToLower('i_n_t_ernship____')).toEqual('internship');
    });
    it('periods', () => {
      expect(service.removeAllSpecialCharactersAndToLower('.internship.')).toEqual('internship');
    });
    it('dollars', () => {
      expect(service.removeAllSpecialCharactersAndToLower('int$er$n$ship$$')).toEqual('internship');
    });
    it('ampersands', () => {
      expect(service.removeAllSpecialCharactersAndToLower('i&&nt&er&nship')).toEqual('internship');
    });
    it('asterisk', () => {
      expect(service.removeAllSpecialCharactersAndToLower('*i*n*t*e*r*n*s*h**i*p*')).toEqual('internship');
    });
    it('percentage', () => {
      expect(service.removeAllSpecialCharactersAndToLower('%in%%ternship%%')).toEqual('internship');
    });
    it('exclamation mark', () => {
      expect(service.removeAllSpecialCharactersAndToLower('i!n!t!e!rnsh!!ip!!!')).toEqual('internship');
    });
    it('at symbol', () => {
      expect(service.removeAllSpecialCharactersAndToLower('i@n@t@e@r@n@s@h@@@i@p')).toEqual('internship');
    });
    it('hash', () => {
      expect(service.removeAllSpecialCharactersAndToLower('#i#n#ternsh###ip')).toEqual('internship');
    });
    it('carrot', () => {
      expect(service.removeAllSpecialCharactersAndToLower('^i^ntern^sh^ip^^')).toEqual('internship');
    });
    it('all', () => {
      expect(service.removeAllSpecialCharactersAndToLower(' *^^@!#!% & %$ .iNte__ %%%rn!!#@^-shIp.')).toEqual('internship');
    });
  });
});
