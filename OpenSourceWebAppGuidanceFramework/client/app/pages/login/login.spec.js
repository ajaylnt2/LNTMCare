// import Login from './login';
// import LoginController from './login.controller';
// import LoginComponent from './login.component';
// import LoginTemplate from './login.html';

// describe('login', () => {
//   let $rootScope, $state, $location, $componentController, $compile;
//   let makeController;

//   beforeEach(window.module(Login));
//   beforeEach(inject((_$rootScope_) => {
//     $rootScope = _$rootScope_;
//     makeController = () =>
//        new LoginController();
//   }));

//   beforeEach(inject(($injector) => {
//     // $rootScope = $injector.get('$rootScope');
//     $componentController = $injector.get('$componentController');
//     $state = $injector.get('$state');
//     $location = $injector.get('$location');
//     $compile = $injector.get('$compile');
//   }));

//   describe('Module', () => {
//     // top-level specs: i.e., routes, injection, naming
//     it('About component should be visible when navigates to /login', () => {
//       $location.url('/login');
//       $rootScope.$digest();
//       expect($state.current.component).to.eq('login');
//     });
//   });
//   describe('Controller', () => {
//     // controller specs

//     let controller;
//     // beforeEach(() => {
//     //   controller = $componentController('login', {
//     //     $scope: $rootScope.$new()
//     //   });
//     // });
//     it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
//       const controller = makeController();
//       expect(controller).to.have.property('name');
//     });
//   });


//   describe('Component', () => {
//       // component/directive specs
//     const component =LoginComponent;

//     it('includes the intended template', () => {
//       expect(component.template).to.equal(LoginTemplate);
//     });

//     it('uses `controllerAs` syntax', () => {
//       expect(component).to.have.property('controllerAs');
//     });

//     it('invokes the right controller', () => {
//       expect(component.controller).to.equal(LoginController);
//     });

//   });
// });
