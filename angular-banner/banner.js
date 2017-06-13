/**
 * creater:ying.ban
 * create time:2017-02-16 10:44:49
 * describe:banner
 */
var APP = angular.module('starter', []);

APP.controller('myCtrl', function ($scope) {


        $scope.listdata = [{
            "url": "images/play01.png"

        }, {
            "url": "images/play04.png"

        }, {
            "url": "images/play01.png"

        }, {
            "url": "images/play04.png"

        }, {
            "url": "images/play01.png"

        }, {
            "url": "images/play04.png"

        }, {
            "url": "images/play01.png"

        }, {
            "url": "images/play04.png"

        }, {
            "url": "images/play01.png"

        }, {
            "url": "images/play04.png"

        }, {
            "url": "images/play01.png"

        }, {
            "url": "images/play04.png"

        }, {
            "url": "images/play01.png"

        }];

        $scope.i = 0;

        $scope.imgUrl = $scope.listdata[0].url;

        $scope.onClck = 0;

        $scope.cloneImg = function (url, index) {

            $scope.imgUrl = url;

            $scope.onClck = index

        };


        $scope.moveLeft = function () {

            $scope.i = $scope.i + 1;

            console.log(  $scope.i)
            if ($scope.i <= $scope.listdata.length) {

                $scope.ulMove = {'margin-left': -($scope.i * 100) + 'px'}

            }
            if ($scope.i > ($scope.listdata.length - 6)) {

                $scope.i = 0;

                $scope.ulMove = {'margin-left': '0px'}

            }


        };

        $scope.moveRight = function () {

            $scope.i = $scope.i - 1;
            console.log(  $scope.i)
            if ($scope.i <= $scope.listdata.length) {

                $scope.ulMove = {'margin-left': -($scope.i * 100) + 'px'}

            }
            if ($scope.i < 0) {

                $scope.i = $scope.listdata.length - 6;

                $scope.ulMove = {'margin-left': -(($scope.listdata.length - 6) * 100) + 'px'}

            }


        };

        $scope.stateCarouse = function () {

            $scope.state = $scope.state == 1 ? '0' : '1'

        }


    }
);
