$(document).ready(function() {
    let URL = 'rest.bandsintown.com';
    
    $("#btn-search-artist").submit(function (e) {

          //prevent Default functionality
          e.preventDefault();
          
          var searchTerm = $(this).val();
          var tmp_url =URL+'/artists/'+searchTerm

          $.ajax({
               url: tmp_url,
               method: 'GET', 
               success: function(result){
               
               $("#div1").html(result);
               },
               error: function(XMLHttpRequest, textStatus, errorThrown) {
               
                if (textStatus == 'timeout') {
                    //doe iets
                  } else if (textStatus == 'error') {
                    //doe iets
                  }
               }
          });

	});

});