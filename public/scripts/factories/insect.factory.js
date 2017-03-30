myApp.factory('InsectFactory', ['$http', function($http) {

  var specimen = { list: [] };
  var userEmails = { list: [] };
  var bugs = { list: [] };


  function getBugs() {
    return $http({
      method: 'GET',
      url: '/getbug/all'
    }).then(function(response) {
      // console.log('response from factory: ', response);
      // console.log('response.data from factory: ', response.data);
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
    specimen: specimen,
    bugs: bugs,
    userEmails: userEmails,
    getBugs: getBugs,
    addBug: addBug,
    deleteBug: deleteBug,
    updateEntry: updateEntry,
    getInfo: getInfo
  };
}]);