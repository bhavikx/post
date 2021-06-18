$('#post_text').focus();

$(document).on('click', '#bclear',function(){
    $("#postid").val("");
    $("#post_text").val("");
    $('#post_img').val('');
    $("#uimg").attr("src", "");
    $('#post_text').focus();
});

//create/update post
$(document).on('submit', '#post-form', function(event){
    event.preventDefault();
    console.log('form submit check..');

    var formData = new FormData(this);
    postid = $("#postid").val();
    //sending request to update
    if(postid != ""){
        formData.append("postid", $("#postid").val());
        //imgsrc = $("#uimg").attr("src");
        //formData.append("imgsrc", imgsrc);
        $.ajax({
            url : "updatepostpost/",
            type : "POST",
            data : formData,
            processData : false,
            contentType : false,
            success : function(data){
                var like = ""
                if(data.ulike == "True"){
                    like = "liked";
                }
                else{
                    like = "like";
                }
                //clears form
                $('#postid').val('');
                $('#post_text').val('');
                $('#post_img').val('');
                $('#post_text').focus();
                $("#uimg").attr("src", "");
                //updates field in list
                $(".item-"+data.uid).text(data.utext);
                $(".img-"+data.uid).attr("src", data.uimg);
                $(".like-"+data.uid).val(like);
                //notify
                $('#res').text("updated");
                $('#res').fadeIn();
                setTimeout(function(){
                    $('#res').fadeOut();
                },5000);
            }
        })        
    }
    //sending request to create Post
    else{
        $.ajax({
            url : "createpost/",
            type : 'POST',
            data : formData,
            /*{
                post_text : $('#post_text').val(),
                post_img : img,
                postid : $('#postid').val(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },*/
            processData: false,
            contentType: false,
            success : function(data) {
                //appends new field in list
                $("#post_list").prepend($("<div id='post_item'> <h3 id='pt' class=item-"+ data.cid +">" + data.ctext + " </h3> <img height= '360' class='img-"+data.cid+"' src="+ data.cimg +"> <br> <input type='button' id='b-like' value = 'like' data-id=" + data.cid+ " class=like-" + data.cid + "> <input type='button' id='b-update' value='update' data-id=" + data.cid + " class = update-" + data.cid + "> <input type='button' id='b-delete' value='delete' data-id=" + data.cid + " class=delete-" + data.cid + "><hr id='hr'></div>").hide().fadeIn(500));
                //clears form
                $('#post_text').val('');
                $('#post_img').val('');
                $('#postid').val('');
                $('#post_text').focus();
                //notify
                $('#res').text("created");
                $('#res').fadeIn();
                setTimeout(function(){
                    $('#res').fadeOut();
                },5000);   
            },           
        });
    }
});
//sending request to assign field values in form to update 
$(document).on("click","#b-update", function(){
    let id = $(this).attr("data-id");
    $.ajax({
        url : "updatepost/",
        method : "POST",
        data : {
                uid:id,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },
        dataType: "json",
        success:function(data){
            //assigns values in form
            $("#postid").val(data.postid);
            $("#post_text").val(data.post_text);
            $("#uimg").attr("src", data.post_img);
            $('#post_text').focus();
        }
    });
});
//sending request to delete
$(document).on("click","#b-delete", function(){
    let id = $(this).attr("data-id");
    thisid = this;

    $.ajax({
        url : "deletepost/",
        method : "POST",
        data : {
                did:id,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },
        success:function(){
            //notify
            $('#res').text('deleted');
            $('#res').fadeIn();
            setTimeout(function(){
                $('#res').fadeOut();
            },5000);
            //removes field in list
            $(thisid).closest("#post_item").fadeOut("fast");
            //clears form
            $('#postid').val('');
            $('#post_text').val('');
            $('#post_img').val('');
            $("#uimg").attr("src", "");
            $('#post_text').focus();
        }
    });
});
//sending request to like/unlike
$(document).on('click', '#b-like', function(){
    let id = $(this).attr("data-id");
    thisid = this;
    $.ajax({
        url : "likepost/",
        method : "POST",
        data : {
            lid : id, 
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            //update like status
            if(data.like == "True"){
                $(thisid).val("liked");
            }
            else{
                $(thisid).val("like");
            }
        }
    })
});



