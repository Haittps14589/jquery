//7280b1ad4e3447d8a847f456787ca734
//92c36a91a67e9ae684d7b3fbcb16fe3f
//06ba00cb00ef2ab1d533a105d4738938
//c513aa45bd06f8da4eed42765d0b2577
let API_TOKEN = "7b76d931b9b43df694914150d8d7a048";
let url = "https://gnews.io/api/v4/top-headlines?token=" + API_TOKEN + "&lang=en&country=us";
let data;
let availableTags;

getAPI(url);

/*
@Input: String url
@Description: dùng url để get JS và hiển thị list tin tức ra màn hình
@return: void
*/
function getAPI(url) {
    $(".loader").css("display", "block");



    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.status === 200) {
            data = JSON.parse(this.responseText).articles;
            showListNew();
            loader();
        } else {
            loader();
            let html = '<h1 class="alert">Opps! đã hết lượt đọc báo hôm nay, hôm khác quay lại nha hihi :#</h1>'
            $('.container').append(html);
            $('.alert').fadeOut(6000);
        }
    }
    xhttp.open("GET", url);
    xhttp.send();

}


/*
    @Input: none
    @Description: Hiển thị list tin tức từ mảng data
    @return: void
*/
function showListNew() {
    console.log(data.length);
    if (data.length == 0) {
        let html = '<h1>Opps! Từ khóa bạn tìm không có rồi, bạn có muốn quay lại? </h1>' +
            '<a href="index.html" ><h1 style="color:blue"> Load lại trang :3 </h1></a>';
        $('.container').append(html);
    } else {
        $.each(data, function(i, value) {
            let html =
                '<div class="box">' +
                '<div class="box-row">' +
                ' <img src="' + value.image + '" alt="Hinh newpaper">' +
                '</div>' +
                '<div class="box-row">' +
                ' <h2 class="title-header"><a href="' + value.url + '" target="_blank">' + value.title + '</a></h2>' +
                ' <p class="title-info">' + value.publishedAt + '</p>' +
                '<p class="content">' + value.description + '</p>' +
                '<br><a class="btn" href="' + value.url + '" target="_blank"> read more</a>' +
                '</div>' +
                '</div>';

            // get source.name để hỗ trợ việc gợi ý tìm kiếm
            availableTags.push(value.source.name);

            //hàm append của jquery
            $('.container').append(html);
        })
    }

}

/*
    @Input: none
    @Description: xóa toàn bộ list tin tức
    @return: void
*/
function removeListNew() {
    $('.box').each(function(i, val) {
        $(this).remove();
    })
}

$(document).ready(function() {

    //Hiển thị modal tìm kiếm
    $('.fa-search-plus').click(function() {
        $('#myModal').slideDown('slow');
    });

    //tắt modal tìm kiếm
    $('.modal-header .close').click(function() {
        $('#myModal').slideUp('slow');
    })


    /*
        @Input: none
        @Description: Hiển thị auto search -> jquery support
        @return: void
    */
    $(function() {
        availableTags = [
            "Google"
        ];
        $("#tags").autocomplete({
            source: availableTags
        });
    });

    /*
        @Input: none
        @Description: get value từ ô tìm kiếm và tìm kiếm bằng từ khóa
        @return: void
    */
    $('.ui-widget button').click(function() {
        let key = $('#tags').val();
        let urlSearch = "https://gnews.io/api/v4/search?q=" + key + "&token=" + API_TOKEN + "&lang=en";
        removeListNew();
        getAPI(urlSearch);
        $('#myModal').slideUp('slow');
    })

    $("nav ul li#country").click(function() {
        let country = $(this).attr("data-countries");
        url = "https://gnews.io/api/v4/top-headlines?token=" + API_TOKEN + "&lang=en&country=" + country;
        removeListNew();
        getAPI(url);
    })

})

function loader() {
    $(".loader").fadeOut(200);
    $(".content").fadeIn(1000);
}





//Code here