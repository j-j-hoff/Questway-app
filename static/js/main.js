/****************
Skriven av: Se funktioner
****************/

$(document).ready(function() {
    menu()
    checkLogIn();
    checkCreateEmployer();
    remove_key();
    handle_input();
    img_handleing_logo();
    img_handleing_cover();
    ad_members_to_application();
    labels_handeling();
    edih_labels();
    hide_show_filter();
    hide_filter();
    count_chars();
    new_user();
    applicant_overlay();
    show_label_hadeling();
    more_ad_opts();
    input_focus();
    apply_job();
    validate_new_password();
});

function checkLogIn(){
    /****************
    Skriven av: Jacob
    ****************/
    $('#logIn').submit(function(event){
         event.preventDefault(event);
        $.ajax({
            type: 'POST',
            url: '/ajax',
            data: $(this).serialize(),
            success: function(response) {
                   if (response == 'ok'){
                    document.getElementById("logIn").submit();
                   }
                   else if(response=='error'){
                       $('#error').html('Fel användarnamn eller lösenord!');
                    var errordisplay = document.getElementById("error");
                    errordisplay.style.display = "block";
                   }
                   else{
                       $('#error').html('Något har blivit fel!');
                   }
               }
        });
      });
}

function checkCreateEmployer(){
    /****************
    Skriven av: Jacob & Philip
    Jacob: Ajax
    Philip: Email-validering
    ****************/
    $('#create_user').submit(function(event){
        event.preventDefault(event);
        var email = document.getElementById("email");
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
        {
            $.ajax({
                type: 'POST',
                url: '/ajax_create_user',
                data: $(this).serialize(),
                success: function(response) {
                       if (response == 'ok'){
                        document.getElementById("create_user").submit();
                       }
                       else if(response=='User exists'){
                           //$('#error').html('Det finns redan en användare med angiven email!');
                       }
                       else if(response=='Bad input'){
                           //$('#error').html('Du måste skriva in en email!');
                       }
                       else{
                           //$('#error').html('Något har blivit fel!');
                       }
                   }
        });
        }
        else{
            alert("Du måste ange en hel och riktig mailadress. Med @ och allt.");
            email.style.borderColor = "red"
            return false
        }
      });
}


/**** Validering av skapandet av profil ******/

function val_user_input(){
    var checkUserInput= ['first_name', 'last_name', 'phone', 'email', 'password']
    for(var i=0; i<checkUserInput.length; i++){
        var myVar=document.getElementById(checkUserInput[i]).value;
        if(myVar===null || myVar==='' || myVar==' '){
            document.getElementById(checkUserInput[i]).style.borderColor="red";
        }
        else{
            document.getElementById(checkUserInput[i]).style.borderColor="green";
        }
    }
}

function val_application_input(){
    var checkApplicationInput= ['name', 'phone', 'email']
    for(var i=0; i<checkApplicationInput.length; i++){
        var myVar=document.getElementById(checkApplicationInput[i]).value;
        if(myVar===null || myVar==='' || myVar==' '){
            document.getElementById(checkApplicationInput[i]).style.borderColor="red";
        }
        else{
            document.getElementById(checkApplicationInput[i]).style.borderColor="green";
        }
    }
}


function init(){
    var do_account=document.getElementById('create_account');
    var do_application=document.getElementById('create_application');
    try{
        do_account.onclick=val_user_input;
        }
    catch (e){}

    try{
        do_application.onclick=val_application_input;
        }
    catch (e){}
}

function handle_input(){
    $('.add_one_tag').click(function() {
        var tag_list = $(this).parents('.tag_continer').find('.keys');
        var inputNode = '<div class="edit_key" style="display:inline-block"><div class="remove_key"></div><input type="text" value="" name="add_key_tag" class="add_key" style="display:inline-block" maxlength="15" autofocus></div>';
        $(inputNode).appendTo(tag_list);
        $('.keys').find('input:last').focus();
    });

    $('.keys').on('keypress', '.add_key', function(key){
        if(key.which == 13 || key.which == 44) {
            key.preventDefault();
            var tag_list = $(this).parents('.tag_continer').find('.keys');
            var inputNode = '<div class="edit_key" style="display:inline-block"><div class="remove_key"></div><input type="text" value="" name="add_key_tag" class="add_key" style="display:inline-block" maxlength="15" autofocus></div>';
            $(inputNode).appendTo(tag_list);
            $('.keys').find('input:last').focus();
          }
    });
}

function remove_key() {
    $('.keys').on('click', '.remove_key', function(){
        $(this).parents('.edit_key').remove();
    });

    $('.keys').on('focusout', '.add_key', function(){
        if($(this).val().length == 0)
            $(this).parents('.edit_key').remove();
    });
}

function img_handleing_logo(){
    $('#img_logo').change(function(){
        var parten = $(this).parents('.logo_upload')
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(){
                var dataURL = reader.result;
                parten.css('background-image', 'url('+dataURL+')');
            }
            reader.readAsDataURL(this.files[0])
        }
      });
}


function img_handleing_cover(){
    $('#img_cover').change(function(){
        var parten = $(this).parents('.img_cover')
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(){
                var dataURL = reader.result;
                parten.css('background-image', 'url('+dataURL+')');
            }
            reader.readAsDataURL(this.files[0])
        }
      });
}

function ad_members_to_application(){
    $('#more_members').click(function(){
        var members = $('#group_application')
        var inputNode = '\
            <div class="member"> \
                <label for="additional_name">Namn</label> \
                <input type="text" name="additional_name" id="additional_name"><br> \
                <label for="additional_phone">Tele</label> \
                <input type="text" name="additional_phone" id="additional_phone"><br> \
                <label for="additional_email">Email</label> \
                <input type="text" name="additional_email" id="additional_email"><br> \
            </div>\
            <hr>'
        $(inputNode).appendTo(members);
        added = $(members).find('.member')
        remove_extra_member(added)
    });
}



function labels_handeling(){
    $('.label').click(function(){
        label_nr = $(this).data('label')
        parent = $(this).parents('.application')
        application_nr = parent.data('application')
        label_list = parent.find('.label_list')
        to_find = $(".got_label[data-label='"+label_nr+"']")
        this_label = label_list.find(to_find)
        update_labels(label_nr, application_nr)
        if (!this_label.is(':visible')){
            $(this).find('.got_it_icon').addClass('got_it')
            this_label.show()
        }
        else{
            $(this).find('.got_it_icon').removeClass('got_it')
            this_label.hide()
        }
    });
}

function update_labels(label_nr, application_nr){
    $.ajax({
        type: 'POST',
        url: '/update_label/'+ad_nr+'/'+application_nr+'/'+label_nr
    });
}

function edih_labels(){
    $('.edith_label').click(function(){
        $(this).siblings('.label').hide()
        $(this).siblings('.edith_label_from').show()
        $(this).hide()
        $(this).siblings('.edith_label_from').find('input:first').focus();
        cancel_edith();
        save_edith();
    });
}

function cancel_edith(){
    $('.cancel_edith_label').click(function(){
        $(this).parents('.edith_label_from').hide()
        parent = $(this).parents('.edith_label_from')
        parent.siblings('.label').show()
        parent.siblings('.edith_label').show()
        cancel_edith();
    });
}

function save_edith(){
    $('.edith_label_from').submit(function(event){
        event.preventDefault(event);
        label_nr = $(this).data('formlabel')
        this_form = $(this)
        edith_btn = $(this).siblings('.edith_label')
        label = $(this).siblings('.label')
        text = $(this).find('.label_text').val()

        $.ajax({
            type: 'POST',
            url: '/update_label_text/'+label_nr,
            data: $(this).serialize(),
            complete: function(response) {
                this_form.hide()
                edith_btn.show()
                label.show()
            },
            success:function(){
                $(".got_label[data-label='"+label_nr+"']").find('p').text(text)
                $(".label[data-label='"+label_nr+"']").find('p').text(text)
                $(".label_text[data-label='"+label_nr+"']").val(text)
            }
        });
    });
}

function edith_file(){
    /****************
    Skriven av: Jacob
    ****************/
    $("input:file").change(function (){
    $('.fileToUploadLabel').hide();
    $(this).parents('.circle').css('background-image','$(this).val()');
   });
}



function hide_menu(){
    $('.main_menu').hide()
}

function menu(){
    $('.hide_show_menu_container').click(function(){
        $('.main_menu').toggle()
        if ($('.main_menu').is(':visible')){
            $('.hide_show_menu_container').addClass('open')
        }
        else{
            $('.hide_show_menu_container').removeClass('open')
        }
    });
}

function hide_filter(){
    $('.filters').hide()
}


function hide_show_filter(){
    $('.hide_show_filter').click(function(){
        $('.filters').toggle()
    });
}

function count_chars(){
    $("#message").keyup(function(){
      $("#form_counter").text("( " + (500 - $(this).val().length)+ " )");
    });
}

function new_user(){
    $('.overlay_open').click(function(){
        $('.overlay').show()
        $('.shadow').show()
        $('body').addClass('fixed')
        var pos_top = $(window).scrollTop();
        close_new_user() /* Denna är tillagd av Jari för att få stäng-knapp att funka på overlay */
        $('.shadow').scrollTop($('.shadow').scrollTop() - $('.shadow').offset().top);
        close_new_user()
    })

    $('.shadow > .overlay').click(
        function(e) {
            e.stopPropagation();
        }
    );
}

function close_new_user(pos_top){
    $('.close_icon, .shadow').click(function(){
        $('.overlay').hide()
        $('.shadow').hide()
        $('body').removeClass('fixed')
        window.scrollTo(0, pos_top);
    })

    $('.shadow > .application_overlay').click(
        function(e) {
            e.stopPropagation();
        }
    );
}

function applicant_overlay(){
    $('.applicant_overlay_opener').click(function(){
        parent = $(this).parents('.application')
        parent.find('.shadow').show()
        parent.find('.overlay').show()
        var pos_top = $(window).scrollTop();
        $('body').addClass('fixed')
        $('.shadow').scrollTop($('.shadow').scrollTop() - $('.shadow').offset().top);
        close_applicant_overlay(pos_top)
    })
}

function close_applicant_overlay(pos_top){
    $('.applicant_close, .shadow').click(function(){
        parent = $(this).parents('.application')
        parent.find('.overlay').hide()
        parent.find('.shadow').hide()
        $('body').removeClass('fixed')
        window.scrollTo(0, pos_top);
    })

    $('.shadow > .application_overlay').click(
        function(e) {
            e.stopPropagation();
        }
    );
}


function show_label_hadeling(){
    $('.label_trigger').click(function(){
        parent = $(this).parents('.application')
        parent.find('.application_info').hide()
        parent.find('.label_overlay').addClass('show')
        hide_label_hadeling()
    })
}


function hide_label_hadeling(){
    $('.label_close').click(function(){
        parent.find('.application_info').show()
        $(this).parents('.label_overlay').removeClass('show')
    })
}


function more_ad_opts(){
    $('.more_opt_trigger').click(function(){
        if (!$('.more_ad_opts').is(':visible')){
            $('.more_ad_opts').show()
            $(this).addClass('closer')
        }
        else{
            $('.more_ad_opts').hide()
            $(this).removeClass('closer')
        }
    })
}

function input_focus(){
    $('.new_ad_form input, .new_ad_form textarea, .new_ad_form select').focusin(function(){
        var label = $('label[for="'+$(this).attr('id')+'"]');
        label
        label.css('border', '4px solid  #2CBD66')
        label.css('border-bottom', 'none')
    })

    $('.new_ad_form input, .new_ad_form textarea, .new_ad_form select').focusout(function(){
        var label = $('label[for="'+$(this).attr('id')+'"]');
        label
        label.css('border', '4px solid  #fff')
    })
}




function apply_job(){
    $('#apply_in_job').submit(function(event){
        event.preventDefault(event);
        ad_nr = application_nr = $(this).data('ad-id')
        this_form = $(this)
        $.ajax({
            type: 'POST',
            url: '/apply_in_job/'+ ad_nr,
            data: $(this).serialize(),
            success: function(response) {
                this_form.hide()
                $('.message').show()
                if (response == 'ok'){
                    $('.message').addClass('success')
                    $('.message').find('h3').text('Yey!')
                    $('.message').find('p').text('Your application has been sent!')
                }
                else{
                    $('.message').addClass('error')
                    $('.message').find('h3').text('Aww!')
                    $('.message').find('p').text('Something went wrong!')
                }
            }
        });
    });
}

function validate_new_password(){
    $('#reset_password').submit(function(event){
        event.preventDefault(event)
        if ($('#password_one').val() == $('#password_two').val()){
            document.getElementById('reset_password').submit()
        }
        else{
            $('#error').show()
            $('#error').text('Passwords must match!')
        }
    })
}
window.onload=init;
