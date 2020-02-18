$(document).ready(function() {


     //Global vars 

    var URL = 'https://rest.bandsintown.com';
    var APP_ID ='test';
    var div_bsearch_msg= $('#div-bsearch-msg');
    var div_view_artist= $('#div-view-artist');
    var div_view_artist_events= $('#div-view-artist-events');
    var div_events_msg= $('#div-events-msg');
    


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
                          div_view_artist_events.html('');
                          return false;
                    }

                     // setting a msg
                    div_bsearch_msg.html('<div class="panel-heading"><h3 class="panel-title">Search Results: '+[result].length+' Record found</h3></div>');

                     // making a template 

                    const Item = ({ url, thumb_url, name, facebook_page_url }) => `
                              <div class="card" style="width: 18rem;">
                                <img src="${thumb_url}" class="card-img-top" alt="${name}">
                                <div class="card-body">
                                  <h5 class="card-title">${name}</h5>
                                  <h6 class="card-subtitle mb-2 text-muted"><a href="${facebook_page_url}" target="blank">facebook.com/${name}</a></h6>
                                  <p class="card-text">Click the link below to view the ${name} Upcoming Events List</p>
                                  <button id="btn-artist-events" data-name="${name}" class="btn btn-primary" type="button">Click Here</button>
                                </div>
                              </div>
                              `;

                    // setting a msg

                    div_view_artist.html([result].map(Item).join(''));
                    div_view_artist_events.html('');
                    div_events_msg.html('');

                    
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



     //Event Button functionality start
     $(document).on("click","#btn-artist-events",function(e) {


          //prevent Default functionality
          e.preventDefault();

          //Getting  and setting Inputs

          var artist_name = $(this).data('name');
          var tmp_url = URL+'/artists/'+artist_name+'/events';

         
          //Making Ajax request with promise return
          
          $.ajax({
               url: tmp_url,
               method: 'GET', 
               dataType: "json",
               data:{app_id :APP_ID},
               beforeSend: function() {
                  // setting a msg
                  div_events_msg.html('<div class="panel-heading"><h3 class="panel-title">Loading...</h3></div>');
               },
               success: function(result){
               
                  //  console.log(result);
                    //  return false;
                    if (jQuery.isEmptyObject(result)) { // check if results object is empty

                          // setting a msg
                          div_events_msg.html('<div class="panel-heading"><h3 class="panel-title">Sorry, No Events found</h3></div>');
                          

                          // clearing the existing html record in dom

                         div_view_artist_events.html('');
                          return false;
                    }

                     // setting a msg
                    div_events_msg.html('<div class="panel-heading"><h3 class="panel-title">'+result.length+' Upcoming Events</h3></div>');

                     // making a template 

                     var html = '<hr><div class="card-deck" style="margin-bottom:15px">';

                     $.each(result,function(i,value) {

                               html +='<div class="card" style="width: 18rem;"> <div class="card-body"><h5 class="card-title">Events Details</h5><hr><ul class="list-group list-group-flush"><li class="list-group-item">Country : '+value.venue.country+'</li><li class="list-group-item">City : '+value.venue.city+'</li><li class="list-group-item">Venue : '+value.venue.name+'</li><li class="list-group-item">Venue : '+new Date(value.datetime).toLocaleString()+'</li><li class="list-group-item">Location :<a href="https://maps.google.com/?q='+value.venue.latitude+','+value.venue.longitude+'" class="card-link" target="blank">View on Google Maps</a></li></ul><p class="card-text"></p></div></div>';

                              
                              if ((i+1) % 2 ===0) {
                                   html += '</div><div class="card-deck" style="margin-bottom:15px">';
                              }

                                              
                         });
                      
                    html += '</div>';

                    div_view_artist_events.html(html);
                    
                    
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




         
     }); 

      //Event Button functionality end

});