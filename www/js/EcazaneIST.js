//GLOBAL VARIABLE

var globalValues = {
    busyIndicator: 0,
    busyTextTitle: "Please Wait",
    busyTextMsg: "Data is being loaded . . .",
    selectedCity: "",
    selectedDistrict: "",
    selectedNeighbourhood: "",
    pharmacyName: "",
    sliderValue: 0,
    nightPharmacy: true,
    districts: 0,
    neighbourhoods: 0,
    searchResult: 0,
    latlng: 0,
    startingRowIndex: 0, //total rows loaded
    maxRows: 0,
    map: "",
    totalRecords: 0,
    isCityChanged: true,
    isDistrictChanged: false,
    lat: "",
    lang: ""
};


//END GLOBAL Variables
function LoadMoreResults() {
    LoadPharmacyRecords();
}

function tap(param) {
    var html = $(param).html();
     
    if ($(param).attr('dir') == "null" || $(param).attr('dir') == undefined) {
        $(param).append('<span style="float:right; margin: -60px -16px;position: inherit;"><a href="tel:' + $(param).attr('accesskey') + '" target="_blank"><img src="img/icon-phone.png" height="81"/></a></span>');
    } else {
        $(param).append('<span style="float:right; margin: -60px -16px;position: inherit;"><a href="tel:' + $(param).attr('accesskey') + '" target="_blank"><img src="img/icon-phone.png" height="81"/></a><a href="#pharmacy-map" id="maplink" onclick=mapSet(' + $(param).attr('dir') + ')><img src="img/icon-map-red.png" height="81"/></a></span>');
    }
    $(param).attr('onclick', 'oldHtml(this)');
}
function oldHtml(param) {
    $(param).find("span").remove();//remove span elements (phone and map logo from list item)
    $(param).html($(param).html());
    $(param).attr('onclick', 'tap(this)');
}
function mapSet(lt, lg) {
    var globalValues = window.globalValues || {};
    globalValues.lat = lt;
    globalValues.lang = lg;
}
function mapShow() {
    var globalValues = window.globalValues || {};
    ShowBusyIndicator();
    var currentposition = new google.maps.LatLng(globalValues.lat, globalValues.lang);
    var mapoptions = {
        zoom: 14,
        center: currentposition,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapoptions);
    var marker = new google.maps.Marker({
        position: currentposition,
        map: map
    });
    map.setCenter(new google.maps.LatLng(globalValues.lat, globalValues.lang));
    ValidateHideBusyIndicator();
}
$(document).on("pageinit", "#search-pharmacy", function () {
    PopulateCities();//Populate Cities
});
$(document).on("pageshow", "#pharmacy-map", function () { // When entering page pharmacy-map, draw map
    mapShow();
});
function ShowBusyIndicator() {
    var globalValues = window.globalValues || {};
    globalValues.busyIndicator++;
    //ActivityIndicator.show(globalValues.busyText);
    //navigator.notification.activityStart(globalValues.busyTextTitle, globalValues.busyTextMsg);
    $.blockUI.defaults.css.width = '70%'; 
    $.blockUI.defaults.css.left = '15%';
    $.blockUI.defaults.css.backgroundColor ="gray";
    $.blockUI.defaults.css.border='3px solid #01bca7',
    $.blockUI({ message: '<img src="img/busy.gif" /> Just a moment...' });
    
}
function ValidateHideBusyIndicator() {
    var globalValues = window.globalValues || {};
    globalValues.busyIndicator--;
    if (globalValues.busyIndicator <= 0)
    {
        //ActivityIndicator.hide();
        //navigator.notification.activityStop();
        $.unblockUI(); 
        globalValues.busyIndicator = 0;
    }
}
//Turkish characters mapping
var accentMap = {'ç': 'c','ğ': 'g','ı': 'i','İ': 'i','ö': 'o','ş': 's','ü': 'u','Ç': 'c','Ğ': 'g','I': 'i','Ö': 'o','İ': 'i','Ş': 's','Ü': 'u'};
var normalize = function (term) {
    var ret = "";
    for (var i = 0; i < term.length; i++) {
        ret += accentMap[term.charAt(i)] || term.charAt(i);
    }
    return ret;
};
//END Turkish characters mapping
$(document).on("pageshow", "#search-pharmacy", function () { // When entering page search-pharmacy, fill txtCity with last searched city
    var globalValues = window.globalValues || {};
    var value = window.localStorage.getItem("city");
    $("#txtCity").val(value);
    globalValues.selectedCity = $("#txtCity").val();

    //set type of input text to search, so that we can have a 'x' button to empty the box
    var listSimple = $('.searchable');
    for (var i = 0; i < (listSimple.length) ; i++) {
        var control = listSimple[i];
        $(control).prop('type', 'search');
    }
});
function SelectedCityChanged() {
    var globalValues = window.globalValues || {};
    if (globalValues.selectedCity != $("#txtCity").val()) {
        globalValues.selectedCity = $("#txtCity").val();
        globalValues.isCityChanged = true;
        $("#txtDistrict").val('');
        $("#txtNeighbourhood").val('');
    }
}
function SelectedDistrictChanged() {
    var globalValues = window.globalValues || {};
    if (globalValues.selectedDistrict != $("#txtDistrict").val()) {
        globalValues.selectedDistrict = $("#txtDistrict").val();
        globalValues.isDistrictChanged = true;
        $("#txtNeighbourhood").val('');
    }
}
function getAppIdByPhoneNumber() {
    ShowBusyIndicator();
    var cities = 0;
    var phoneNum = { PhoneNumber: $('#mobileNum').val() };
    $.ajax({
      // url: "http://118.139.182.155/TicTAcWebApi/Api/Registration/AppRegistration",
        url: "http://118.139.182.155/TicTacWebApi/Api/Registration/AppRegistration/?phoneNumber=" + $('#mobileNum').val()+"&deviceType=iphone&registrationId="+ window.localStorage.getItem("DeviceId"),
        dataType: "json",
        type: 'Get',
        // data: phoneNum,
        success: function (data) {
            ValidateHideBusyIndicator();
           window.localStorage.setItem("AppId", data);
        }
    });

//    $("#txtCity").autocomplete({
//        source: function (req, response) {
//            var re = $.ui.autocomplete.escapeRegex(req.term);
//            var matcher = new RegExp("^" + re, "i");
//            response($.grep(cities, function (item) {
//                return matcher.test(item.label) || matcher.test(normalize(item.label));
//            }));
//        },
//        minLength: 1
//    });
}
function PopulateDistricts() {
    var globalValues = window.globalValues || {};
    if (globalValues.isCityChanged) {
        globalValues.isCityChanged = false;
        ShowBusyIndicator(); 
        $.ajax({
            url: "http://118.139.182.155/EcazaneWebApi/Api/District/" + globalValues.selectedCity,
            dataType: "json",
            success: function (data) {
                ValidateHideBusyIndicator();
                globalValues.districts = $.map(data, function (item) {
                    return {
                        label: item.DistrictName,
                        value: item.DistrictName
                    };
                });
            }
        });
    }
    $("#txtDistrict").autocomplete({
        source: function (req, response) {
            var re = $.ui.autocomplete.escapeRegex(req.term);
            var matcher = new RegExp("^" + re, "i");
            response($.grep(globalValues.districts, function (item) {
                return matcher.test(item.label) || matcher.test(normalize(item.label));
            }));
        },
        minLength: 1,
    });
}
function PopulateNeighbourhoods() {
    var globalValues = window.globalValues || {};
    if (globalValues.isDistrictChanged) {
        globalValues.isDistrictChanged = false;
        ShowBusyIndicator();
        $.ajax({
            url: "http://118.139.182.155/EcazaneWebApi/Api/Neighbourhood/" + globalValues.selectedCity + "/" + globalValues.selectedDistrict,
            dataType: "json",
            success: function (data) {
                ValidateHideBusyIndicator();
                globalValues.neighbourhoods = $.map(data, function (item) {
                    return {
                        label: item.NeighborhoodName,
                        value: item.NeighborhoodName
                    };
                });
            }
        });
    }
    $("#txtNeighbourhood").autocomplete({
        source: function (req, response) {
            var re = $.ui.autocomplete.escapeRegex(req.term);
            var matcher = new RegExp("^" + re, "i");
            response($.grep(globalValues.neighbourhoods, function (item) {
                return matcher.test(item.label) || matcher.test(normalize(item.label));
            }));
        },
        minLength: 1,
    });
}
function displaySearchResult() {
    var globalValues = window.globalValues || {};
    //initially 'totalRecords' is Zero (0), its being checked, either there are records fetched, if yes, then show number of records in header i.e "4 Pharmacies Found", else "0 Pharmacies Found"
    if (globalValues.searchResult.length > 0) {
        globalValues.totalRecords = globalValues.searchResult[0].rowsCount;
        $('#headR').html('<strong style="font-size: 16px; color: #D0283F; outline-color: #D0283F;">' + globalValues.totalRecords + '</strong>&nbsp Pharmacies Found');     
        //Load More Check
        if (globalValues.totalRecords > globalValues.startingRowIndex)
            $('#searchMore').show();
        else
            $('#searchMore').hide();
    }
    else {
        $('#headR').html('<strong style="font-size: 16px; color: #D0283F; outline-color: #D0283F;">' + globalValues.totalRecords + '</strong>&nbsp Pharmacies Found')
        $('#searchMore').hide();
    }
    //we have searchResult and now convert it in list item form.
    $.each(globalValues.searchResult, function (itemIndex, result) {
        //passing telephone and map's latitude langitude in accessKey and dir attributes respectively.
        if (result.nightPharmacy) {
            $('#result').append(
                '<li onclick="tap(this)" class="search-special ui-li-static ui-body-inherit ui-li-has-thumb ui-first-child ui-last-child" dir=' + result.latlng + ' accesskey=' + result.tel.replace(/\s/g, '') + '>' +
                    '<img class="search-img" src="img/icon-e.png">' +
                    '<p class="search-heading">' + result.label + '</p>' +
                    '<p class="search-detail">' + result.address + '</p>' +
                    '<p class="ui-li-aside search-distance"><strong>' + result.distance + 'KM</strong></p>' +
                '</li> ');
        } else {
            $('#result').append(
                '<li onclick="tap(this)" class="ui-li-static ui-body-inherit ui-li-has-thumb ui-first-child ui-last-child" dir=' + result.latlng + ' accesskey=' + result.tel.replace(/\s/g, '') + '>' +
                    '<img class="search-img" src="img/icon-e.png">' +
                    '<p class="search-heading">' + result.label + '</p>' +
                    '<p class="search-detail">' + result.address + '</p>' +
                    '<p class="ui-li-aside search-distance"><strong>' + result.distance + 'KM</strong></p>' +
                '</li> ');
        }
    });
}
function saveCity() {
    window.localStorage.setItem("city", $("#txtCity").val());
}
function Search(param) {
    var globalValues = window.globalValues || {};
    if ($('#txtCity').val() == "" && $('#txtDistrict').val() == "" && $('#txtNeighbourhood').val() == "" && $('#txtName').val() == "")
    {
        toastr.warning('All params cannot be empty.', 'Search Error');
    }
    else {
        $('#result').empty();
        globalValues.startingRowIndex = 0;
        LoadPharmacyRecords();
                
        saveCity();
        $(param).attr('href', '#search-result');
    }                       
}
function LoadPharmacyRecords() {
    var globalValues = window.globalValues || {};
    globalValues.selectedNeighbourhood = $('#txtNeighbourhood').val();
    globalValues.pharmacyName = $('#txtName').val();
    globalValues.sliderValue = $('#sliderbar').val();
    globalValues.nightPharmacy = $('#chkNightPharmacy').is(':checked')?1:0;
    globalValues.totalRecords = 0;
    ShowBusyIndicator();
    var rowsToLoad = $('#rowCount').val();
    $('#searchMore').hide();
    var requestParam = { PharmacyName: globalValues.pharmacyName, City: globalValues.selectedCity, District: globalValues.selectedDistrict, Neighborhood: globalValues.selectedNeighbourhood, RangeKms: globalValues.sliderValue, CheckOnlyNightPharma: globalValues.nightPharmacy, startingRowIndex: globalValues.startingRowIndex, maxRows: rowsToLoad };
    $.ajax({
        url: "http://118.139.182.155/EcazaneWebApi/Api/Search",
        dataType: "json",
        type:"POST",
        data: requestParam,
        //headers: { "Access-Control-Request-Headers": true, 'Access-Control-Allow-Origin': true },
        success: function (data) {
            globalValues.startingRowIndex += parseInt(rowsToLoad);//Setting the total rows loaded
            globalValues.searchResult = $.map(data, function (item) {
                return {
                    label: item.Name,
                    value: item.Name,
                    address: item.Address,
                    tel: item.Tel,
                    latlng: item.GLatLong,
                    ypId: item.YPID,
                    telId: item.TelID,
                    area: item.Area,
                    distance: item.distance,
                    rowsCount: item.RowsCount,
                    nightPharmacy: item.IsNightPharma
                };
            });
            ValidateHideBusyIndicator();
            displaySearchResult();
        }
    });
}
function closeApp() {
    navigator.app.exitApp();
}

//app.initialize();
