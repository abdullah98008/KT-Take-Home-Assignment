$(document).ready(function() {


     //Global vars 

    var URL = 'https://rest.bandsintown.com';
    var APP_ID ='test';
    var div_bsearch_msg= $('#div-bsearch-msg');
    var div_view_artist= $('#div-view-artist')


     //Search Button functionality start

    $("#btn-search-artist").click(function (e) {

          //prevent Default functionality
          e.preventDefault();

          //Getting  and setting Inputs

          var search_term = $('#input-search-artist').val();
          var tmp_url = URL+'/artists/'+search_term;

         
          //Making Ajax request with promise return
          
          $.ajax({
               url: tmp_url,
               method: 'GET', 
               dataType: "json",
               data:{app_id :APP_ID},
               beforeSend: function() {
                  // setting a msg
                  div_bsearch_msg.html('<div class="panel-heading"><h3 class="panel-title">Searching...</h3></div>');
               },
               success: function(result){
               
                    console.log(result);
                    if (jQuery.isEmptyObject(result)) { // check if results object is empty

                          // setting a msg
                          div_bsearch_msg.html('<div class="panel-heading"><h3 class="panel-title">Search Results: Sorry, No Record found</h3></div>');
                          

                          // clearing the existing html record in dom

                          div_view_artist.html('');
                          return false;
                    }

                     // setting a msg
                    div_bsearch_msg.html('<div class="panel-heading"><h3 class="panel-title">Search Results: '+[result].length+' Record found</h3></div>');

                     // making a template 

                    const Item = ({ url, thumb_url, name }) => `
                              <div class="card" style="width: 18rem;">
                                <img src="${thumb_url}" class="card-img-top" alt="...">
                                <div class="card-body">
                                  <h5 class="card-title">${name}</h5>
                                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                  <a href="${url}" target="blank" class="btn btn-primary">FB</a>
                                </div>
                              </div>
                              `;

                    // setting a msg

                    div_view_artist.html([result].map(Item).join(''));

                    
               },
               error: function(XMLHttpRequest, textStatus, errorThrown) {
               
                if (textStatus == 'timeout') {
                         //setting msg when reqeust timeout
                         div_bsearch_msg.html('<div class="panel-heading"><h3 class="panel-title">Search Results: Sorry, Request Timeout</h3></div>');
                  } else if (textStatus == 'error') {

                         //setting msg when reqeust error

                         div_bsearch_msg.html('<div class="panel-heading"><h3 class="panel-title">Search Results: Sorry, Someting went wrong</h3></div>');
                  }
               }
          });

          //prevent Default functionality


         
	}); 

      //Search Button functionality end

});