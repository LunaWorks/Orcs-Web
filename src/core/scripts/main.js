/**
 * Single entry point of Orcs-Web
 */

'use strict';

var angular = require('angular');

var app = angular.module('myApp', []);

var WelcomeCtrl = require('../../welcome/scripts/WelcomeCtrl');
var DataGridCtrl = require('../../dataGrid/scripts/DataGridCtrl');

app.controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);
app.controller('DataGridCtrl', ['$scope', DataGridCtrl]);