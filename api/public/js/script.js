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

$("#inputGroupFile04").change(function () {
    var name = $('#inputGroupFile04').val().split('\\').pop();
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
    $('#inputGroupFile04').val("");
    //console.log("da");
});

$("#addFinalPhoto").on('click', function () {
    // $.ajax({
    //     method: "POST",
    //     url: "/uploads",
    // })
    //     .done(function (result) {
    //        console.log(result);
    //     });
});

