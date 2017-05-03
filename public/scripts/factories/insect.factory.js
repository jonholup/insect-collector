myApp.factory('InsectFactory', ['$http', function($http) {

  function getBugs() {
    return $http({
      method: 'GET',
      url: '/uploads/all'
    }).then(function(response) {
      return response.data;
    });
  }

  function addBug(newBug) {
    $http({
      method: 'POST',
      url: '/bugs',
      data: newBug
    }).then(function(response){
      console.log(response);
      getBugs();
    });
  }

  function deleteBug(bugId){
    $http({
      method: 'DELETE',
      url: '/bugs/' + bugId
    }).then(function(response) {
      getBugs();
    });
  }

  function updateEntry(bug) {
    $http({
      method: 'PUT',
      url: '/bugs/' + bug._id,
      data: bug
    }).then(function(response) {
      getBugs();
    });
  }

    function getInfo(imageURL) {
    return $http({
      method: 'POST',
      url: '/getBug',
      data: imageURL
    }).then(function(response) {
      return response.data;
    });
  }


  return {
    getBugs: getBugs,
    addBug: addBug,
    deleteBug: deleteBug,
    updateEntry: updateEntry,
    getInfo: getInfo
  };
}]);