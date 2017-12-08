$(function () {
    
    window.location.hash="#";

    $(window).on('hashchange', function(){
        console.log("Detected hash change event")
        render(decodeURI(window.location.hash));
    });


    $("#newuser_submit").on('click',function(){
        console.log($("#newuser").val())
        var request = $.ajax({
            url:window.location.origin+"/addmember",
            method: "POST",
            dataType: "text",
            data:{
                newuser:$("#newuser").val(),
                circle : window.location.pathname.split('/')[2]
            },
            success:function(data){
                console.log(data)
                if(data == -1)
                {
                    alert($("#newuser").val()+" : No such user")
                }
                else if(data == 0)
                {
                    alert($("#newuser").val()+" : User already present in circle")
                }
                else if(data == -2)
                {
                    alert($("#newuser").val()+" : Request already sent to user")
                }
                else
                {
                    alert(" Request sent to user : "+$("#newuser").val())
                }
            }
          });

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
                                $('#add').show()
                            }
                          });
                    },
                    '#ranking': function() {
                        $('#members').hide()
                        $("#statistics").hide();
                        $("#add").hide()

                        url = window.location.origin+"/ranking/"+window.location.pathname.split('/')[2]
                        console.log(url)
                        var request = $.ajax({
                        url:url,
                        method: "GET",
                        dataType: "html",
                        success:function(data){
                            console.log(data)
                            document.getElementById("ranking").innerHTML = data
                            $('#ranking').show()
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