(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);

    /* @ngInject */
    function Login($http, $window) {
        /*jshint validthis: true */
        var vm = this;
        vm.login = [];
        vm.title = 'Login';
        vm.username = 'clarkio';
        vm.password = 'secret';
        vm.isAuthenticated = false;
        vm.login = login;
        vm.welcome = 'You are not authenticated yet';
        vm.error;
        
        activate();

        function activate() {
        }
        
        function login () {
            var user = {
                username: vm.username,
                password: vm.password
            };
            
            $http
                .post('/authenticate', user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    vm.isAuthenticated = true;
                    var encodedProfile = data.token.split('.')[1];
                    var profile = JSON.parse(url_base64_decode(encodedProfile));
                    vm.welcome = 'Welcome ' + profile.firstName + ' ' + profile.lastName;
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    vm.isAuthenticated = false;

                    // Handle login errors here
                    vm.error = 'Error: Invalid user or password';
                    vm.welcome = '';
                });
        }
        
        //this is used to parse the profile
        function url_base64_decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output); //polyfill https://github.com/davidchambers/Base64.js
        }
    }
})();
