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

describe('Removes all special characters and spaces', () => {
  it('simple strings', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('internship')).toEqual('internship');
  });
  it('capital letters', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('INTErNSHIP')).toEqual('internship');
  });
  it('white space', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('   inte rns h ip')).toEqual('internship');
  });
  it('dashes', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('inter-n-ship')).toEqual('internship');
  });
  it('underscores', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('i_n_t_ernship____')).toEqual('internship');
  });
  it('periods', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('.internship.')).toEqual('internship');
  });
  it('dollars', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('int$er$n$ship$$')).toEqual('internship');
  });
  it('ampersands', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('i&&nt&er&nship')).toEqual('internship');
  });
  it('asterisk', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('*i*n*t*e*r*n*s*h**i*p*')).toEqual('internship');
  });
  it('percentage', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('%in%%ternship%%')).toEqual('internship');
  });
  it('exclamation mark', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('i!n!t!e!rnsh!!ip!!!')).toEqual('internship');
  });
  it('at symbol', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('i@n@t@e@r@n@s@h@@@i@p')).toEqual('internship');
  });
  it('hash', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('#i#n#ternsh###ip')).toEqual('internship');
  });
  it('carrot', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower('^i^ntern^sh^ip^^')).toEqual('internship');
  });
  it('all', () => {
    expect(UtilsService.removeAllSpecialCharactersAndToLower(' *^^@!#!% & %$ .iNte__ %%%rn!!#@^-shIp.')).toEqual('internship');
  });
});
