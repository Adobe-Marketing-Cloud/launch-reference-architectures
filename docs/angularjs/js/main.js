/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl", title: "Home"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl", title: "About"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl", title: "FAQ"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl", title: "Pricing"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl", title: "Services"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl", title: "Contact"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl", title: "Blog"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl", title: "Blog Post"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl", title: "Not Found"});
}]);

app.run(['$rootScope', '$route', '$rootScope', function($rootScope, $route, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function() {

        var pageTitle = $route.current.title;
        document.title = pageTitle;

        // Update Data Layer
        digitalData.page.pageInfo.pageID = pageTitle;
        digitalData.page.pageInfo.pageName - 'angular-demo:'+pageTitle;
        digitalData.page.pageInfo.destinationURL = encodeURIComponent(window.location.href);
        if (pageTitle.indexOf('Blog')!=-1) {
          digitalData.page.category.pageType = 'Angular Blog Demo';
        }else if(pageTitle.indexOf('Contact')!=-1){
          digitalData.page.category.pageType = 'PDP - Angular Demo';
        }else{
          digitalData.page.category.pageType = 'Angular Demo';
        };

        console.log('in $routeChangeSuccess event-view-start',window.location.href)
        // Custom Event - Event View Start
        var evt=new CustomEvent('event-view-start');document.body.dispatchEvent(evt);
    });
    $rootScope.$on('$viewContentLoaded', function(event) {
        console.log('in $viewContentLoaded event-view-end',window.location.href)

        // Custom Event - Event View End
        var evt=new CustomEvent('event-view-end');document.getElementById('app').dispatchEvent(evt);

    });
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");

});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($location /* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.",$location);


});

//
$(document).on('click', 'a.btn', function(){
  var event=new CustomEvent('event-action-trigger',
   {detail:
     {action:'add-to-cart',
      productID:'123987-MNHDE-3765',
      pageName:document.title,
      linkName: 'add-to-cart'
     }
   }
  );
  document.querySelector('a.btn').dispatchEvent(event);
  
});
$(document).on('click', "a[data-track*='analytics']", function(){
  var event=new CustomEvent('event-action-trigger',
   {detail:
     {action:'link-click',
      pageName:document.title,
      linkName: 'link-click'
     }
   }
  );
  document.querySelector("a[data-track*='analytics']").dispatchEvent(event);
});
