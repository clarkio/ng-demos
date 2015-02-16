(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    // appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/login',
                config: {
                    templateUrl: 'app/login/login.html',
                    controller: 'Login',
                    controllerAs: 'vm',
                    title: 'Login',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Login'
                    }
                }
            }
        ];
    }
})();
