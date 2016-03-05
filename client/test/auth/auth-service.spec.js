describe('AuthService', function() {

  var AuthService,
      TokenInjector;

  beforeEach(module('auth'));

  beforeEach(inject(function(_AuthService_, _TokenInjector_) {
    AuthService = _AuthService_;
    TokenInjector = _TokenInjector_;
  }));

  it('Should be defined', function() {
    expect(AuthService).to.be.defined;
  });

  it('Should have a TokenInjector', function() {
    expect(TokenInjector).to.be.defined;
  });

  describe('When making http requests', function() {

    var $http, httpBackend,
      authRoute, apiRoute,
      credentials,
      token;

    beforeEach(inject(function(_$http_, _$httpBackend_){
      $http = _$http_;
      httpBackend = _$httpBackend_;
    }));

    beforeEach(function() {
      /* Mock routes and credentials */
      authRoute = '/api/employees/login';
      apiRoute = 'api/test';
      token = 'mocktoken';
      credentials = {
        email:'test@email.com',
        password: 'test'
      };

      /* Mock backend response to the auth api */
      httpBackend.whenPOST(authRoute, credentials)
        .respond(200, {token: token});
    });

    afterEach(function(){
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('Should POST to the api route', function() {
      httpBackend.expectPOST(authRoute);
      AuthService.signin(credentials);
      httpBackend.flush();
    });

    it('Should use TokenInjector to set token', function() {
      AuthService.signin(credentials);
      httpBackend.flush();
      expect(TokenInjector.getToken()).to.deep.equal(token);
    });

    it('Should inject token into http headers', function() {
      /* Set token to be injected */
      TokenInjector.setToken(token);

      /* Check that headers were properly set */
      httpBackend.expectGET(apiRoute, function(headers) {
        return headers.token == token;
      }).respond(200);

      /* Fire the http call */
      $http.get(apiRoute);
      httpBackend.flush();
    });

  });

});