angular
    .module('blog')
    .factory('blogFactory', function($http) {
    
    // Use the $http service to get the post data from connection.php
    function getPosts() {
        return $http.get('../includes/connection.php');
    }
    
    return {
        getPosts: getPosts
    }
})