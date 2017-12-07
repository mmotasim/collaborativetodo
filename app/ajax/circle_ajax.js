$(function () {
    
    window.location.hash="#";

    $(window).on('hashchange', function(){
        console.log("Detected hash change event")
        render(decodeURI(window.location.hash));
    });

    function render(url) {
                var temp = url.split('/')[0];
                var map = {
        
                    // The Homepage.
                    '#members': function() {
                            $("#ranking").hide();
                            $("#statistics").hide();

                            url = window.location.origin+"/members/"+window.location.pathname.split('/')[2]
                            console.log(url)
                            var request = $.ajax({
                            url:url,
                            method: "GET",
                            dataType: "html",
                            success:function(data){
                                console.log(data)
                                document.getElementById("members").innerHTML = data
                                $('#members').show()
                            }
                          });
                    },
                    '#signup': function() {
                        hideallpages();
                        var request = $.ajax({
                        url: window.location.origin,
                        method: "GET",
                        dataType: "JSON",
                        success:function(){
                            console.log(request)
                            if(request.responseJSON.user)
                            {
                                window.location.hash="#profile";
                            }
                            else
                            {
                                $(".signup").show();
                                $(".text-danger").hide();
                            }
                        }
                      });
                    }
                };

        
                // Execute the needed function depending on the url keyword (stored in temp).
                if(map[temp]){
                    map[temp]();
                }            
            }
            

});