angular
    .module('blog')
    .controller('blogController', function($scope, blogFactory, $interval) {
    
            // Filters selected by the dropdown menu
            $scope.dropdownItems = [
                ['Date Posted - Newest to Oldest', 'created_date', true],
                ['Date Posted - Oldest to Newest', 'created_date', false],
                ['Rating - Highest to Lowest', 'rating', true],
                ['Rating - Lowest to Highest', 'rating', false]
            ];
    
            // By default, the dropdown menu is closed and the 'Date Posted - Newest to Oldest' filter is used
            $scope.dropdown = {
                isopen: false,
                selectedItem: $scope.dropdownItems[0][0],
                filter: $scope.dropdownItems[0][1],
                reverse: $scope.dropdownItems[0][2]
            };            

            // Opens and closes the dropdown menu
            $scope.toggleDropdown = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.dropdown.isopen = !$scope.dropdown.isopen;
            };
    
            // When a filter is chosen from the dropdown menu, these variables will update with the filter name, which property to order by, and whether or not the ordering should be reversed
            $scope.selectItem = function($item) {
                $scope.dropdown.selectedItem = $item[0];
                $scope.dropdown.filter = $item[1];
                $scope.dropdown.reverse = $item[2];
            }
    
            $scope.posts;
    
            // Put the posts retrieved from the blogFactory into a scope variable
            blogFactory.getPosts().then(
                function(response) {
                    $scope.posts = response.data;
                    
                    // For each post, change the rating from a 10 scale to a 5 scale and collapse the content
                    $scope.posts.forEach(post => {
                        post.rating /= 2;
                        post.isCollapsed = true;
                    });
                    
                    // Set this scope to give the most recent post a 'new' badge
                    $scope.posts[$scope.posts.length - 1].new = true;
                }, function(response) {
                    $scope.posts = "An error occured";
                }
            );
    
        // Every second, toggle this scope variable to create the flashing chevron icon animation
        $scope.chevron = true;
        $interval(function() {
            $scope.chevron = !$scope.chevron;
        }, 1000);
    })
    .directive('starRating', function() {
        // This directive is used to convert the number rating stored in the database into a star rating (out of 5)
        return {
            restrict: 'E',
            scope: {
                rating: '='
            },
            templateUrl: 'star-rating-iso.html'
        };
    })
    .animation('.chevron', [function() {
            /* This animation fades in and fades out the chevron icons and changes their color when the chevron scope variable is toggled, which adds and removes a class from the elements */
            return {
                addClass: function(element) {
                    jQuery(element).fadeIn(1000).css('color', '#52801b');
                },

                removeClass: function(element) {
                    jQuery(element).fadeOut(1000).css('color', '#000');
                }
            }
    }]);