var tabNewMetadata;

$(function () {
    if ($("#gallery").find(".col-lg-4.col-sm-6").length > 0) {
        console.log('da');
    } else {
        $("#gallery").append("<div class='col-lg-12 text-center'><p class='text-black-50 mb-4' style='margin-top:20px'>Nu exista poze in galerie...</p></div>")
    }

});

$("#modalAddPhoto").on("click", function () {
    $('#exampleModalCenter').modal('show');
});

$("#addImagePrev").on("click", function () {
    console.log($("#inputGroupFile04").val());

});

$("#image").change(function () {
    var name = $('#image').val().split('\\').pop();
    name = name.split('.')[0];
    $("#nameLabel").text(name);
    filePreview(this);
});

function filePreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#previewImg").attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        console.log(input.files[0]);

    }
}

$('#exampleModalCenter').on('hidden.bs.modal', function (e) {
    $("#previewImg").attr('src', "img/addimg.png");
    $("#nameLabel").text("");
    $('#image').val("");
    $(".append-metadata").empty();
});

$('#exampleModalCenter').on('shown.bs.modal', function () {
    tabNewMetadata = new Array();
})

// $("#addFinalPhoto").on('click', function () {
//     for (i = 0; i < tabNewMetadata.length; i++) {
//         console.log(tabNewMetadata[i]);
//     }
// });

$("#addNewMetadata").on("click", function () {
    var name = $("#inputNewMetadata").val();
    var metadata = createMetadata(name, 'new');
    tabNewMetadata.push(name);
    $(".append-metadata").append(metadata);
    $("#inputNewMetadata").text("");
    $("#inputNewMetadata").val("");

});

$("#addOldMetadata").on("click", function () {
    var selectedMetadata = $("#allOldMetadata option:selected").text();
    var metadata = createMetadata(selectedMetadata, 'old');
    $(".append-metadata").append(metadata);
    $("#allOldMetadata option:selected").remove();

});

function createMetadata(name, type) {
    if (type == 'new') {
        return "<button type='button' class='btn btn-outline-primary metadata-form' onClick='deleteMetadata()'>" + name + "</button>";
    }
    return "<button type='button' class='btn btn-outline-secondary metadata-form' onClick='deleteMetadata()'>" + name + "</button>";
}


$("#uploadPhotoForm").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    var formData = new FormData(this);
    formData.append("metadate", tabNewMetadata);
    console.log(tabNewMetadata);
    var imageExist = checkUpload();
    if (imageExist) {
        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                notificare(1, " Upload photo", data.message);
                $('#exampleModalCenter').modal('hide');
            },
            error: function (request, status, error) {
                notificare(3, " Upload photo", request.responseJSON.error);
            }
        });
    }else{
        notificare(3, " Upload photo", "Please upload a file!");
    }



});

function checkUpload() {
    if ($('#image').val() == "")
        return false;
    return true;
}

function notificare(tip, titlu, mesaj) {
    var iconn;
    if (tip == 1) {
        tipNotificare = 'success';
        iconn = "far fa-thumbs-up";
    }
    if (tip == 2) {
        tipNotificare = 'info';
        iconn = "fas fa-business-time";
    }
    if (tip == 3) {
        tipNotificare = 'danger';
        iconn = 'fas fa-exclamation-circle';
    }
    $.notify({
        // options
        icon: iconn,
        title: '<strong>' + titlu + '</strong>',
        message: '<br>' + mesaj
    }, {
        // settings
        type: tipNotificare,
        element: 'body',
        position: null,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1041,
        delay: 5000,
        timer: 500,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon" class= "' + iconn + '"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
    });
}