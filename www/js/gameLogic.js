// Global Variables
var cellSz = 0;
var cellSize;
var playerWM;
var gameType;
var noOfPlayers;
var round;
var winSteak;
var defaultData;
var isWinOccured;
var isBoardDrawn = false;
var boardsize;
var cross;
var tick;
var circle;
var crossCircle;
var tickCircle;
var imageToPlace;
var canvas;
var canvasCtx;
var myViewModel;
var screenwidth;
var screenheight;
var marginLeft = 10;
var direction;
var cellX;
var cellY;
var startPoint = [0, 0];
var endPoint = [0, 0];
var Level;
var appId;
var mobNumber;
var isOnline = false;
var changeText = false;
var MobileNumber=false;
// Declare Array
var gameMatrix = new Array();
var contacts = new Array();

$(function () {

  // set css attributes of buttons and labels
  $('#pageone').css("background-color","#01bca7");
  $('#pageone').css("background-position","center center");
  $('#pageone').css("background-size","100% 100%");
  $('#pageone').css("background-attachment","fixed");
  //$('#pagethree').css("position","fixed");
  $('#popupButton').css("background-color", "#01bca7");
  $('#popupButton').css("color", "#FFFFFF");
//  $('#resetLevel').css("background-color", "#01bca7");
//  $('#resetLevel').css("color", "#FFFFFF");
  $('#reset').css("background-color", "#01bca7");
  $('#reset').css("color", "#FFFFFF");
  $('#quit').css("background-color", "#01bca7");
  $('#quit').css("color", "#FFFFFF");
  $('#message').css("color", "#01bca7");
  $('#message').css("font-size", "100%");
  $('#start').css("background-color", "#01bca7");
  $('#start').css("color", "#FFFFFF");
  $('#send').css("background-color", "#01bca7");
  $('#send').css("color", "#FFFFFF");
  $('#invite').css("background-color", "#01bca7");
  $('#invite').css("color", "#FFFFFF");
  $('#btnClose').css("background-color", "#01bca7");
  $('#btnClose').css("color", "#FFFFFF");
  
  $(document).on("pageshow", "#pagethree", function () {
                 // When entering page search-pharmacy, fill txtCity with last searched city
                 $('#pagefour').css("display","none");
                 });
  // Set page size
  
  
  // set screenwidth and height depending on device
  var aa = $( document ).width();
  var bb = $( document ).height();
  if(aa > bb){
    screenwidth = bb - (marginLeft*2);
    screenheight=aa;
  }
  if (bb > aa) {
    screenwidth = aa - (marginLeft * 2);
    screenheight = bb;
  }
  // Check for user level
  Level = parseInt(window.localStorage.getItem("Level"));
  if (Level === undefined || Level === null || Level.length === 0 || isNaN(Level)) {
    // if no level then set level
    setLevel();
  }
  // Check App Id
  window.location.hash = 'pageone';
  $.mobile.initializePage();
  
  $(document).on('pagebeforeshow', '#pagethree', function(){
                 $(this).width(screenwidth+15);
  });
  // register touch events for buttons
  
  var c1 = document.getElementById("decBoardSize");
  c1.addEventListener("touchstart", decBoardSize, false);
  var c2 = document.getElementById("incBoardSize");
  c2.addEventListener("touchstart", incBoardSize, false);
  var c3 = document.getElementById("decPlayers");
  c3.addEventListener("touchstart", decPlayers, false);
  var c4 = document.getElementById("incPlayers");
  c4.addEventListener("touchstart", incPlayers, false);
  var c5 = document.getElementById("decSteak");
  c5.addEventListener("touchstart", decSteak, false);
  var c6 = document.getElementById("incSteak");
  c6.addEventListener("touchstart", incSteak, false);
  var c7 = document.getElementById("reset");
  c7.addEventListener("touchend", resetBoardEvent, false);
  var c8 = document.getElementById("quit");
  c8.addEventListener("touchstart", quitGame, false);
  var c9 = document.getElementById("start");
  c9.addEventListener("touchend", saveGameSettings, false);
//  var c10 = document.getElementById("resetLevel");
//  c10.addEventListener("touchstart", resetLevel, false);
  var c11 = document.getElementById("start1");
  c11.addEventListener("touchend", loadPageContact, false);
  var c11 = document.getElementById("start1");
  c11.addEventListener("touchend", loadPageContact, false);
  var c12 = document.getElementById("mobile");
  c12.addEventListener("click", getAppIdFromServerByMobileNumber, false);
  var c12 = document.getElementById("invite");
  c12.addEventListener("click", loadContacts, false);
  var c13 = document.getElementById("btnClose");
  c13.addEventListener("touchstart", closePage, false);
  
  // Knockout Model
  myViewModel = {
  boardSize: boardsize,
  screenWidth: screenwidth,
  screenHeight: screenheight,
  
  drawBoard: function () {
    cellSize = Math.floor(screenwidth / boardsize);
    $("#playerIcon").attr('height',cellSize-10);
    $("#playerIcon").attr('width',cellSize-10);
    $('.message').css("font-size:", cellSize + "px");
    if(changeText == true){
        $('#reset').html('Reset Board');
    }
    initializeGlobalData();
    if (!isBoardDrawn) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.strokeStyle = '#01bca7';
        ctx.lineWidth = 1;
        ctx.font = "1px Arial";
        for (var x = 1; x < boardsize; x += 1) {
            ctx.beginPath();
            cellSz = (x * (cellSize));
            ctx.moveTo(cellSz, 0);
            ctx.lineTo(cellSz, myCanvas.height);
            ctx.stroke();
            ctx.closePath();
        }
        cellSz = 0;
        // draw a horizontal line
        for (var y = 1; y < boardsize; y += 1) {
            ctx.beginPath();
            cellSz = (y * (cellSize));
            ctx.moveTo(0, cellSz);
            ctx.lineTo(myCanvas.width, cellSz);
            ctx.stroke();
            ctx.closePath();
        }
    isBoardDrawn = true;
    }
  },
  resetBoard: function () {
    cellSize = Math.floor(screenwidth / boardsize);
    $("#playerIcon").attr('height',cellSize-10);
    $("#playerIcon").attr('width',cellSize-10);
    $('.message').css("font-size", "30px");
    if(changeText == true){
        $('#reset').html('Reset Board');
    }
  
    initializeGlobalData();
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#01bca7';
    ctx.lineWidth = 1;
    ctx.font = "1px Arial";
    for (var x = 1; x < boardsize; x += 1) {
        ctx.beginPath();
        cellSz = (x * (cellSize));
        ctx.moveTo(cellSz, 0);
        ctx.lineTo(cellSz, myCanvas.height);
        ctx.stroke();
        ctx.closePath();
    }
    cellSz = 0;
    // draw a horizontal line
    for (var y = 1; y < boardsize; y += 1) {
        ctx.beginPath();
        cellSz = (y * (cellSize));
        ctx.moveTo(0, cellSz);
        ctx.lineTo(myCanvas.width, cellSz);
        ctx.stroke();
        ctx.closePath();
    }
  }
  
  };
  
  ko.applyBindings(myViewModel, document.getElementById('screenHome'));
  // Set board size
  setCanvasDimensions(screenwidth, screenwidth);
  // Add touch event for canvas
  var userAgent = navigator.userAgent;
  var touchEvent = (userAgent.match(/iPad|iPhone/i)) ? "touchstart" : "tap";
  
  // set "touchstart" for IPhone/IPad
  if(touchEvent == "touchstart"){
    var canvasT = document.getElementById("myCanvas");
    canvasT.addEventListener(touchEvent, doMouseDown, false);
  }
  // set "tap" for other devices
  if(touchEvent == "tap"){
    $('#myCanvas').bind(touchEvent, doMouseDown);
  }
  
  function doMouseDown(event) {
    var canvas_x = 0;
    var canvas_y = 0;
    if (!isWinOccured && round != (boardsize*boardsize)) {
        if (touchEvent == "tap") {
            canvas_x = event.clientX - 10;
            canvas_y = event.clientY - 20;
        }
        if (touchEvent == "touchstart") {
            canvas_x = event.pageX - 10;
            canvas_y = event.pageY - 20;
        }
        cellX = Math.floor((canvas_x + cellSize) / cellSize);
        cellY = Math.floor((canvas_y + cellSize) / cellSize);
        // Check is valid move
        var isValid = false;
        isValid = checkValidMove(cellX - 1, cellY - 1);
        if (isValid) {
            // Place Move
            playMove(cellX, cellY);
            round += 1;
            // Check if is win occured
            var isWin = false;
            isWin = checkResults();
            if (isWin) {
                setTimeout(function(){
                           if(isOnline){
                           $('#screenHome').unblock();
                           //                    $.unblockUI();
                           }
                           isWinOccured = true;
                           var prevLevel = window.localStorage.getItem("Level");
                           var nextLevel = parseInt(prevLevel);
                           if (nextLevel == winSteak && gameType == 2) {
                           $('#reset').html('Next Level');
                           changeText = true;
                           }
                           alert("Player " + playerWM + " wins");
                           }, 200);
            }
            else {
                if(round == (boardsize*boardsize)){
                    alert("Draw");
                    isWinOccured = true;
                }
                else{
                    // Switch players
                    switchPlayer();
                    if (gameType == 2){
                        setTimeout(function(){
                            doMouseUp(event);
                        },500);
  
                    }
                }
            }
        }
  
        if(isOnline && isValid){
            sendMove();
  
            if(!isWinOccured){
                    $('#screenHome').block({
                         message: '<img src="img/busy.gif" /> Waiting for other player to play move...',
                                           css: { border: '3px solid #01bca7' }
                                           });
                $('#countdown-1').timeTo("reset");
                $('#countdown -1').timeTo({ displayHours: false, displayDays: 0 }, 10, function () {
                           });
//                $.blockUI({ message: '<img src="img/busy.gif" /> Waiting for other player to play move...' });
            }
        }
    }
  }
  // when gameType is 2 i.e. Human V Computer then play Computer move
  function doMouseUp(event) {
    // prevent default behaviour
    event.preventDefault();
    if (gameType == 2 && !isWinOccured) {
        switch (playerWM) {
            case 1:
                break;
            case 2:
                if (round == 1) {
                // First Move for Computer
                    if (placeComputerFirstMove()) {
                        round += 1;
                        switchPlayer();
                        break;
                    }
                }
                else {
                    // Intelligent Move For Computer
                    playComputerMove();
                    break;
                }
                default:
                break;
            }
        }
    }
  // if boardsize is >10 then decrease
  function decBoardSize(){
    var a = $('#boardSize').val();
    var bdSize = parseInt(a);
    if(bdSize > 10){
        bdSize = bdSize-1;
        $('#boardSize').val(bdSize);
    }
  }
  // if boardsize is <20 increase
  function incBoardSize(){
    var a = $('#boardSize').val();
    var bdSize = parseInt(a);
    if(bdSize < 20){
        bdSize = bdSize+1;
        $('#boardSize').val(bdSize);
    }
  }
  // if players is >2 then decrease
  function decPlayers(){
    var a = $('#players').val();
    var bdSize = parseInt(a);
    if(bdSize > 2){
        bdSize = bdSize-1;
        $('#players').val(bdSize);
    }
  }
  // if players is <5 increase
  function incPlayers(){
    var a = $('#players').val();
    var bdSize = parseInt(a);
    if(bdSize < 5){
        bdSize = bdSize+1;
        $('#players').val(bdSize);
    }
  }
  // if winningSteak is >3 then decrease
  function decSteak(){
    var a = $('#winningSteak').val();
    var bdSize = parseInt(a);
    if(bdSize > 3){
        bdSize = bdSize-1;
        $('#winningSteak').val(bdSize);
    }
  }
  // if winningSteak is <10 increase
  function incSteak(){
    var a = $('#winningSteak').val();
    var bdSize = parseInt(a);
    if(bdSize < 10){
        bdSize = bdSize+1;
        $('#winningSteak').val(bdSize);
    }
  }
  });
    $("#popupButton").click( function(){
                        $('#winningSteak').val(parseInt(window.localStorage.getItem("Level")));
                        var lvl = parseInt(window.localStorage.getItem("Level"));
                        var lblText = "(Level "+(lvl-2)+"/8)";
                        $('#lblWinSteak').text(lblText);
                        });
// sleep for given milliseconds
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}
function closePage(){
	$('#pagefour').css("display", "none");
	window.location.hash = 'pagethree';
    $.mobile.initializePage();
}
// reset level to 1, winSteak to 3
//function resetLevel() {
//    localStorage.clear();
//    window.localStorage.setItem("Level", 3);
//    $('#winningSteak').val(parseInt(window.localStorage.getItem("Level")));
//    winSteak = parseInt($('#winningSteak').val());
//    $('#toast').css("font-size", "130%");
//    $('#toast').css("margin-left", "20%");
//    $('#toast').css("color", "#FFFFFF");
//    $('#toast').text("Level Reset");
//    $('#toast').fadeIn(400).delay(500).fadeOut(400);
//    
//}
// set level for first time
function setLevel() {
    window.localStorage.setItem("Level", 3);
    $('#winningSteak').val(parseInt(window.localStorage.getItem("Level")));
}
// Get mobile number of user, send to server and get AppId
function getAppIdFromServerByMobileNumber(){
    mobNumber = $('#mobileNum').val();
    if (mobNumber === undefined || mobNumber === null || mobNumber.length === 0) {
        alert("Enter your Mobile Number");
    }
    else{
        // Call to Service for AppId
        // Set Mobile Number at local storage
        var str = mobNumber;
        str = str.replace( /,/g, "" );
        str=str.replace( /-/g, "" );
        str = str.replace(/\s/g, '');
        var idx=  str.length-10
        mobNumber = str.substring(idx, str.length);
        window.localStorage.setItem("mobileNumber", mobNumber);
        $('#mobileNum').val(mobNumber);
        // Set AppId at local storage
        getAppIdByPhoneNumber();
        
        MobileNumber = false;
        
        $('#mobileNumber').css("display","none");
        loadContactsNow();
        // Start Game
//        window.location.hash = 'contact';
//        $.mobile.initializePage();
    }
}
// Show Mobile Number popup
function getMobileNumber(){
    $('#mobileNum').focus();
    $('#mobileNumber').css("display","block");
    $.mobile.changePage( "#mobileNumber", { transition: "pop"} );
}
// increase level when player is playing with level and wins
function increaseLevel() {
    var prevLevel = window.localStorage.getItem("Level");
    var nextLevel = parseInt(prevLevel);
    if (nextLevel == winSteak && gameType == 2) {
        nextLevel = nextLevel + 1;
        window.localStorage.setItem("Level", nextLevel);
        $('#winningSteak').val(parseInt(window.localStorage.getItem("Level")));
        winSteak = parseInt($('#winningSteak').val());
    }
}
// save popup values and display board
function saveGameSettings(){
    var gType = $("#gameTypeR :radio:checked").val();
    gameType = parseInt(gType);
    var boardSz = $('#boardSize').val();
    boardsize = parseInt(boardSz);
    var totalPlayers = $('#players').val();
    noOfPlayers = parseInt(totalPlayers);
    // var winStk = $('#winningSteak').val();
    winSteak = parseInt($('#winningSteak').val());
    myViewModel.resetBoard();
    //$.mobile.changePage( "#pagethree", { transition: "none"} );
    window.location.hash = 'pagethree';
    $.mobile.initializePage();
}
function loadPageContact(){
    $.mobile.changePage( "#pageone", { transition: "none"} );
}
// calls knockout object's function resetBoard()
function resetBoardEvent(){
    myViewModel.resetBoard();
}
// displays the starting page of game
function quitGame(){
    $('#screenHome').unblock();
    window.location.hash = 'pageone';
    $.mobile.initializePage();
}
// initialize all global data
function initializeGlobalData() {
    cellSz = 0;
    playerWM = 1;
    round = 0;
    isWinOccured = false;
    
    winSteak = parseInt($('#winningSteak').val());
    defaultData = '-1';
    canvas = document.getElementById("myCanvas");
    canvasCtx = canvas.getContext("2d");
    var str;
    for (i = 0; i < boardsize; i++) {
        gameMatrix[i] = new Array();
    }
    for (i = 0; i < boardsize; i++) {
        for (j = 0; j < boardsize; j++) {
            gameMatrix[i][j] = '-1';
        }
    }
    circle = 'img/Circle.png';
    cross = 'img/Cross.png';
    tick = 'img/Tick.png';
    crossCircle = 'img/crossCircle.png';
    tickCircle = 'img/tickCircle.png';
    $("#playerIcon").attr("src", cross);
    $("#message").text("Player 1 put a \"Cross\" on board");
    direction = "";
    startPoint = [0, 0];
    endPoint = [0, 0];
}
// switch players
function switchPlayer() {
    switch (noOfPlayers) {
        case 2:
            if (playerWM == 1) {
                playerWM = 2;
                $("#message").text("Player 2 put a \"Circle\" on board");
                $("#playerIcon").attr("src", circle);
                return;
            }
            if (playerWM == 2) {
                playerWM = 1;
                $("#message").text("Player 1 put a \"Cross\" on board");
                $("#playerIcon").attr("src", cross);
                return;
            }
            break;
        case 3:
            if (playerWM == 1) {
                playerWM = 2;
                $("#message").text("Player 2 put a \"Circle\" on board");
                $("#playerIcon").attr("src", circle);
                return;
            }
            if (playerWM == 2) {
                playerWM = 3;
                $("#message").text("Player 3 put a \"Tick\" on board");
                $("#playerIcon").attr("src", tick);
                return;
            }
            if (playerWM == 3) {
                playerWM = 1;
                $("#message").text("Player 1 put a \"Cross\" on board");
                $("#playerIcon").attr("src", cross);
                return;
            }
            break;
        case 4:
            if (playerWM == 1) {
                playerWM = 2;
                $("#message").text("Player 2 put a \"Circle\" on board");
                $("#playerIcon").attr("src", circle);
                return;
            }
            if (playerWM == 2) {
                playerWM = 3;
                $("#message").text("Player 3 put a \"Tick\" on board");
                $("#playerIcon").attr("src", tick);
                return;
            }
            if (playerWM == 3) {
                playerWM = 4;
                $("#message").text("Player 4 put a \"Cross Circle\" on board");
                $("#playerIcon").attr("src", crossCircle);
                return;
            }
            if (playerWM == 4) {
                playerWM = 1;
                $("#message").text("Player 1 put a \"Cross\" on board");
                $("#playerIcon").attr("src", cross);
                return;
            }
            break;
        case 5:
            if (playerWM == 1) {
                playerWM = 2;
                $("#message").text("Player 2 put a \"Circle\" on board");
                $("#playerIcon").attr("src", circle);
                return;
            }
            if (playerWM == 2) {
                playerWM = 3;
                $("#message").text("Player 3 put a \"Tick\" on board");
                $("#playerIcon").attr("src", tick);
                return;
            }
            if (playerWM == 3) {
                playerWM = 4;
                $("#message").text("Player 4 put a \"Cross Circle\" on board");
                $("#playerIcon").attr("src", crossCircle);
                return;
            }
            if (playerWM == 4) {
                playerWM = 5;
                $("#message").text("Player 5 put a \"Tick Cross\" on board");
                $("#playerIcon").attr("src", tickCircle);
                return;
            }
            if (playerWM == 5) {
                playerWM = 1;
                $("#message").text("Player 1 put a \"Cross\" on board");
                $("#playerIcon").attr("src", cross);
                return;
            }
            break;
        default:
            break;
    }
}
// check whether move is valid and then palce icon for player with move
function playMove(cellX, cellY) {
    $('#countdown-1').timeTo("reset");
    var xCord = ((cellX - 1) * cellSize);
    var yCord = ((cellY - 1) * cellSize);
    var imageObj = new Image();
    
    if (checkValidMove(cellX - 1, cellY - 1)) {
        imageObj.onload = function() {
            canvasCtx.drawImage(imageObj, xCord + 1, yCord + 1, cellSize - 2, cellSize - 2);
        };
        // Update Matrix
        gameMatrix[cellX-1][cellY-1] = playerWM;
        
        // Place Icon
        if (playerWM == 1) {
            imageToPlace = cross;
            imageObj.src = imageToPlace;
        }
        if (playerWM == 2) {
            imageToPlace = circle;
            imageObj.src = imageToPlace;
        }
        if (playerWM == 3) {
            imageToPlace = tick;
            imageObj.src = imageToPlace;
        }
        if (playerWM == 4) {
            imageToPlace = crossCircle;
            imageObj.src = imageToPlace;
        }
        if (playerWM == 5) {
            imageToPlace = tickCircle;
            imageObj.src = imageToPlace;
        }
        if(gameType == 2 && playerWM == 1){
            //sleep(300);
        }
        return true;
    }
    else {
        return false;
    }
}
// return true if move is valid
function checkValidMove(i, j) {
    if (gameMatrix[i][j] == '-1') {
        return true;
    }
    else {
        return false;
    }
}
// check results whether any player wins
function checkResults() {
    var isWin = false;
    xCord = -1;
    yCord = -1;
    for (var i = 0; i <= (boardsize - winSteak); i++){
        for (var j = 0; j < (boardsize); j++){
            if (checkRight(i, j)){
                xCord = i+1;
                yCord = j+1;
                direction = "right";
                drawLine(xCord, yCord, direction);
                increaseLevel();
                return true;
            }
        }
    }
    for (var i = 0; i < (boardsize ); i++){
        for (var j = 0; j <= (boardsize - winSteak); j++)
        {
            if (checkBottom(i, j)){
                xCord = i+1;
                yCord = j + 1;
                direction = "bottom";
                drawLine(xCord, yCord, direction);
                increaseLevel();
                return true;
            }
        }
    }
    for (var i = 0; i <= (boardsize - winSteak); i++){
        for (var j = 0; j <= (boardsize - winSteak); j++){
            if (checkDiagonal(i, j)){
                xCord = i+1;
                yCord = j + 1;
                direction = "diagonal";
                drawLine(xCord, yCord, direction);
                increaseLevel();
                return true;
            }
        }
    }
    for (var i = (winSteak - 1); i < (boardsize ) ; i++) {
        for (var j = 0; j < boardsize; j++) {
            if (checkInverseDiagonal(i, j)){
                xCord = i+1;
                yCord = j + 1;
                direction = "inverse";
                drawLine(xCord, yCord, direction);
                increaseLevel();
                return true;
            }
        }
    }
    return isWin;
}
// check towards right for win
function checkRight(xCor, yCor){
    // Declaration and initialization of arrray
    var winning = new Array();
    for(var i = 0; i < winSteak; i++){
        winning[i] = i;
    }
    for(var k = 0; k < winSteak; k++){
        winning[k] = gameMatrix[xCor + k][yCor];
    }
    var retVal = true;
    for(var i = 1; i < winSteak; i++){
        if(winning[i] == '-1'){
            retVal = false;
            return retVal;
        }
        else{
            if(winning[i] != winning[(i-1)] ){
                retVal = false;
            }
            else{
                winningPlayer = winning[i];
            }
        }
    }
    return retVal;
}
// check towards bottom for win
function checkBottom(xCor, yCor){
    // Declaration and initialization of arrray
    var winning = new Array();
    for(var i = 0; i < winSteak; i++){
        winning[i] = i;
    }
    for(var k = 0; k < winSteak; k++){
        winning[k] = gameMatrix[xCor][yCor+k];
    }
    var retVal = true;
    for(var i = 1; i < winSteak; i++){
        if(winning[i] == '-1'){
            retVal = false;
            return retVal;
        }
        else{
            if(winning[i] != winning[(i-1)] ){
                retVal = false;
            }
        }
    }
    return retVal;
}
// check towards diagonal for win
function checkDiagonal(xCor, yCor){
    // Declaration and initialization of arrray
    var winning = new Array();
    for(var i = 0; i < winSteak; i++){
        winning[i] = i;
    }
    for(var k = 0; k < winSteak; k++){
        winning[k] = gameMatrix[xCor+k][yCor+k];
    }
    var retVal = true;
    for(var i = 1; i < winSteak; i++){
        if(winning[i] == '-1'){
            retVal = false;
            return retVal;
        }
        else{
            if(winning[i] != winning[(i-1)] ){
                retVal = false;
            }
        }
    }
    return retVal;
}
// check towards inverse diagonal for win
function checkInverseDiagonal(xCor, yCor) {
    // Declaration and initialization of arrray
    var winning = new Array();
    for (var i = 0; i < winSteak; i++) {
        winning[i] = i;
    }
    for (var k = 0; k < winSteak; k++) {
        winning[k] = gameMatrix[xCor - k][yCor + k];
    }
    var retVal = true;
    for (var i = 1; i < winSteak; i++) {
        if (winning[i] == '-1') {
            retVal = false;
            return retVal;
        }
        else {
            if (winning[i] != winning[(i - 1)]) {
                retVal = false;
            }
        }
    }
    return retVal;
}
// draw a line when player wins this function will set start point and end point for line
function drawLine(xCord, yCord, direction){
    var point = [0, 0];
    if (direction  == "right") {
        point[0] = Math.floor((xCord - 1) * cellSize);
        point[1] = Math.floor((yCord - 1) * cellSize)+(cellSize/2);
        startPoint = point;
        endPoint[0] = Math.floor(point[0]) + (cellSize * winSteak);
        endPoint[1] = point[1];
        draw(startPoint, endPoint);
        return;
    }
    if (direction == "bottom") {
        point[0] = Math.floor((xCord - 1) * cellSize)+(cellSize/2);
        point[1] = Math.floor((yCord - 1) * cellSize);
        startPoint = point;
        endPoint[1] = Math.floor(point[1]) + (cellSize * winSteak);
        endPoint[0] = point[0];
        draw(startPoint, endPoint);
        return;
    }
    if (direction == "diagonal") {
        point[0] = Math.floor((xCord-1)*cellSize);
        point[1] = Math.floor((yCord-1) * cellSize);
        startPoint = point;
        endPoint[0] = Math.floor(point[0]) + ((cellSize * winSteak));
        endPoint[1] = Math.floor(point[1]) + ((cellSize * winSteak));
        draw(startPoint, endPoint);
        return;
    }
    if (direction == "inverse") {
        point[0] = Math.floor((xCord) * cellSize);
        point[1] = Math.floor((yCord-1)*cellSize);
        startPoint = point;
        endPoint[0] = Math.floor(point[0]) - ((cellSize * winSteak));
        endPoint[1] = Math.floor(point[1]) + ((cellSize * winSteak));
        draw(startPoint, endPoint);
        return;
    }
}
// this function will plot line on canvas
function draw(startPoint, endPoint) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#2EC19C';
    ctx.lineWidth = 2;
    ctx.font = "1px Arial";
    //ctx.miterLimit = 1;
    // draw a vertical line
    ctx.beginPath();
    ctx.moveTo(startPoint[0], startPoint[1]);
    ctx.lineTo(endPoint[0], endPoint[1]);
    //ctx.moveToBottom();
    ctx.stroke();
    ctx.closePath();
}
// play/place computer first move
function placeComputerFirstMove() {
    for (var i=0; i<boardsize; i++) {
        for (var j=0; j<boardsize ; j++) {
            if (gameMatrix[i][j] != '-1') {
                var isValid = false;
                // check Top left
                if (i == 0 && j == 0) {
                    if(playCompMoveXX(i, j)){
                        isValid = true;
                        return isValid;
                    }
                }
                // check Top right
                if (i == (boardsize-1) && j == 0) {
                    if (playCompMoveXY(i, j)) {
                        isValid = true;
                        return isValid;
                    }
                }
                // check Bottom left
                if (i == 0 && j == (boardsize - 1)) {
                    if (playCompMoveAA(i, j)) {
                        isValid = true;
                        return isValid;
                    }
                }
                // check Bottom right
                if(i == (boardsize-1) && j == (boardsize-1)){
                    if (playCompMoveAB(i, j)) {
                        isValid = true;
                        return isValid;
                    }
                }
                if (!isValid) {
                    isValid = checkSurrounding(i, j);
                    return isValid;
                }
            }
        }
    }
}
function playCompMoveXX(i, j) {
    var rand = Math.floor((Math.random() * 3) + 1);
    if (rand == 3) {
        if (playMove((i + 1), (j + 2))) {
            return true;
        }
        else {
            return false;
        }
    }
    if (rand == 2) {
        if (playMove((i + 2), (j + 2))) {
            return true;
        }
        else {
            return false;
        }
    }
    if (rand == 1) {
        if (playMove((i + 2), (j + 1))) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}
function playCompMoveXY(i, j) {
    var rand = Math.floor((Math.random() * 3) + 1);
    if (rand == 1) {
        if (playMove(i, (j + 1))) {
            return true;
        }
        else {
            return false;
        }
    }
    if (rand == 2) {
        if (playMove(i, (j + 2))) {
            return true;
        }
        else {
            return false;
        }
    }
    if (rand == 3) {
        if (playMove((i+1), (j + 2))) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}
function playCompMoveAA(i, j) {
    var rand = Math.floor((Math.random() * 3) + 1);
    if (rand == 1) {
        if (playMove((i+1), j)) {
            return true;
        }
        else {
            return false;
        }
    }
    if (rand == 2) {
        if (playMove((i + 2), j)) {
            return true;
        }
        else {
            return false;
        }
    }
    if (rand == 3) {
        if (playMove((i + 2), (j + 1))) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}
function playCompMoveAB(i, j) {
    var rand = Math.floor((Math.random() * 3) + 1);
    if (rand == 1) {
        if (playMove((i + 1), j)) {
            return true;
        }
        else {
            return false;
        }
    }
    if (rand == 2) {
        if (playMove((i), j)) {
            return true;
        }
        else {
            return false;
        }
    }
    if (rand == 3) {
        if (playMove(i, (j + 1))) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}
function checkSurrounding(i, j) {
    if (i > 0 && j > 0 && i < boardsize - 1 && j < boardsize - 1) {
        var rand = Math.floor((Math.random() * 4) + 1);
        if (rand == 1) {
            if (playMove((i + 2), (j + 1))) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 2) {
            if (playMove((i + 1), (j + 2))) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 3) {
            if (playMove((i), (j + 1))) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 4) {
            if (playMove((i + 1), (j))) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
    if (i > 0 && j == 0) {
        var rand = Math.floor((Math.random() * 3) + 1);
        if (rand == 1) {
            if (playMove((i + 2), j+1)) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 2) {
            if (playMove((i), j+1)) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 3) {
            if (playMove(i+1, (j + 2))) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
    if ( i == 0 && j > 0){
        var rand = Math.floor((Math.random() * 3) + 1);
        if (rand == 1) {
            if (playMove((i+1), j)) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 2) {
            if (playMove((i+1), j+2)) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 3) {
            if (playMove(i+2, (j +1))) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
    if (i == boardsize-1 && j > 0) {
        var rand = Math.floor((Math.random() * 3) + 1);
        if (rand == 1) {
            if (playMove((i ), j+1)) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 2) {
            if (playMove((i+1), j+2)) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 3) {
            if (playMove(i+1, j)) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
    if (i > 0 && j == boardsize-1) {
        var rand = Math.floor((Math.random() * 3) + 1);
        if (rand == 1) {
            if (playMove((i+1), j)) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 2) {
            if (playMove((i+2), j+1)) {
                return true;
            }
            else {
                return false;
            }
        }
        if (rand == 3) {
            if (playMove(i, (j+1))) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
}

///
// Intelligent Move For Computer
///
function playComputerMove() {
    if (round == (boardsize * boardsize) - 1) {
        isWinOccured = true;
        alert("Game Draw");
    }
    else{
        winSteak = parseInt(winSteak);
        // Check whether there is a winning combination for computer on winSteak-1
        var retVal = [-1, -1];
        retVal = getWinningPosition(playerWM);
        if (retVal[0] != -1 && retVal[1] != -1) {
            checkIfWinOccur();
            return;
        }

        // Check for missing intervals for Computer
        retVal = checkMissingIntervals(playerWM);
        if (retVal[0] != -1 && retVal[1] != -1) {
            playMove(retVal[0], retVal[1]);
            checkIfWinOccur();
            return;
        }

        // If Computer is not winning then check for other players on winSteak-1
        for (var i = 1; i <= noOfPlayers; i++) {
            if (i != 2) {
                retVal = getWinningPosition(i);
                if (retVal[0] != -1 && retVal[1] != -1) {
                    checkIfWinOccur();
                    return;
                }
            }
        }

        // Check for missing intervals for Player
        for (var i = 1; i <= noOfPlayers; i++) {
            if (i != 2) {
                retVal = checkMissingIntervals(i);
            }
            if (retVal[0] != -1 && retVal[1] != -1) {
                playMove(retVal[0], retVal[1]);
                checkIfWinOccur();
                return;
            }
        }

        // Check Whether Computer with both ends open for winSteak - 2
        retVal = getBoxForComputerOnBothEndOpen(playerWM, 2);
        if (retVal[0] != -1 && retVal[1] != -1) {
            playMove(retVal[0], retVal[1]);
            checkIfWinOccur();
            return retVal;
        }

        // Check whether there is any player with winning chance on both end open for winSteak - 2
        for (var i = 1; i < noOfPlayers; i++) {
            if (i != 2) {
                retVal = getBoxForComputerOnBothEndOpen(i, 2);
                if (retVal[0] != -1 && retVal[1] != -1) {
                    playMove(retVal[0], retVal[1]);
                    checkIfWinOccur();
                    return retVal;
                }
            }
        }

        // Check whether Computer winning combination for winSteak=3
        retVal = getBoxForComputerToWin(playerWM, 2);
        if (retVal[0] != -1 && retVal[1] != -1) {
            playMove(retVal[0], retVal[1]);
            checkIfWinOccur();
            return retVal;
        }

        // Check Whether Computer with both ends open for winSteak = 3,2
        retVal = getBoxForComputerOnBothEndOpen(playerWM, 1);
        if (retVal[0] != -1 && retVal[1] != -1) {
            playMove(retVal[0], retVal[1]);
            checkIfWinOccur();
            return retVal;
        }

        // Check whether there is any player with winning chance on both end open for winSteak = 3,2
        for (var i = 1; i < noOfPlayers; i++) {
            if (i != 2) {
                retVal = getBoxForComputerOnBothEndOpen(i, 1);
                if (retVal[0] != -1 && retVal[1] != -1) {
                    playMove(retVal[0], retVal[1]);
                    checkIfWinOccur();
                    return retVal;
                }
            }
        }

        // if no one is winning then check box with more probability of computer to win
        retVal = getBoxForComputerToWin(playerWM, 1);
        if (retVal[0] != -1 && retVal[1] != -1) {
            playMove(retVal[0], retVal[1]);
            checkIfWinOccur();
            return retVal;
        }

        // If no conbination then place computer move to surrounding of any computer move
        if (retVal[0] == -1 && retVal[1] == -1) {
            // if nothing
            console.log("surrounding");
            for (var i = 0; i < boardsize; i++) {
                for (var j = 0; j < boardsize; j++) {
                    if (gameMatrix[i][j] == playerWM) {
                        retVal = getEmptyBox(i, j);
                        if (retVal[0] != -1 && retVal[1] != -1) {
                            if (playMove(retVal[0], retVal[1])) {
                                checkIfWinOccur();
                                return;
                            }
                        }
                    }
                }
            }
        }
        // place computer move where there is empty box
        if (retVal[0] == -1 && retVal[1] == -1) {
            var isMovePlayed = false;
            console.log("Any where");
            while (isMovePlayed == false) {
                for (var a = 0; a < boardsize; a++) {
                    for (var b = 0; b < boardsize; b++) {
                        if (gameMatrix[a][b] == defaultData) {
                            console.log("Defaul: a " + a + " b= " + b);
                            if (playMove(a + 1, b + 1)) {
                                checkIfWinOccur();
                                isMovePlayed = true;
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
    return;
}
// Get Empty Box for Computer
function getEmptyBox(i, j) {
    var retValue = [-1, -1];
    if (i + 1 < boardsize) {
        if (gameMatrix[i + 1][j] == defaultData) {
            retValue[0] = i + 2;
            retValue[1] = j + 1;
            return retValue;
        }
    }
    if (j + 1 < boardsize) {
        if (gameMatrix[i][j + 1] == defaultData) {
            retValue[0] = i + 1;
            retValue[1] = j + 2;
            return retValue;
        }
    }
    if (i - 1 >= 0) {
        if (gameMatrix[i - 1][j] == defaultData) {
            retValue[0] = i;
            retValue[1] = j + 1;
            return retValue;
        }
    }
    if (j - 1 >= 0) {
        if (gameMatrix[i][j - 1] == defaultData) {
            retValue[0] = i + 1;
            retValue[1] = j;
            return retValue;
        }
    }
    return retValue;
}
// check whether any player wins
function checkIfWinOccur() {
    // place Icon and update gameMatrix
    var isWin = checkResults();
    if (isWin) {
        isWinOccured = true;
        var prevLevel = window.localStorage.getItem("Level");
        var nextLevel = parseInt(prevLevel);
        if (nextLevel == winSteak && gameType == 2) {
            $('#reset').html('Next Level');
            changeText = true;
        }
        if (playerWM == 2) {
            alert('You lose');
        }
        else {
            
            alert("Player " + playerWM + " wins");
        }
        
        return;
    }
    else {
        round += 1;
        switchPlayer();
        return;
    }
}
// return wining position on winSteak-1
function getWinningPosition(playerNum) {
    var returnValue = [-1, -1];
    // Get winning combination for Computer Right
    for (var i=0; i<(boardsize - (winSteak-2)); i++) {
        for (var j = 0; j < boardsize; j++) {
            // check if matrix value belong to computer
            if(gameMatrix[i][j] == playerNum){
                // check right combination
                if (compCheckRight(i, j,  winSteak-1)) {
                    returnValue = getEmptyBoxToBreakMakeCombinationRight(i, j, winSteak);
                    if (returnValue[0] != -1 && returnValue[1] != -1) {
                        if (playMove(returnValue[0], returnValue[1])) {
                            return returnValue;
                        }
                    }
                }
            }
        }
    }
    //Get winning combination for computer Bottom
    for (var i=0; i < boardsize; i++) {
        for (var j = 0; j < (boardsize - (winSteak - 2)) ; j++) {
            // check if matrix value belong to computer
            if(gameMatrix[i][j] == playerNum){
                // check Bottom combination
                if (compCheckBottom(i, j, winSteak-1)) {
                    returnValue = getEmptyBoxToBreakMakeCombinationBottom(i, j, winSteak);
                    if (returnValue[0] != -1 && returnValue[1] != -1) {
                        if (playMove(returnValue[0], returnValue[1])) {
                            return returnValue;
                        }
                    }
                }
            }
        }
    }
    // Get winning combination for computer Diagonal
    for (var i = 0; i <= (boardsize - (winSteak - 2)) ; i++) {
        for (var j = 0; j <= (boardsize - (winSteak - 2)) ; j++) {
            // check if matrix value belong to computer
            if(gameMatrix[i][j] == playerNum){
                // check Diagonal combination
                if (compCheckDiagonal(i, j, winSteak - 1)) {
                    returnValue = getEmptyBoxToBreakMakeCombinationDiagonal(i, j, winSteak);
                    if (returnValue[0] != -1 && returnValue[1] != -1) {
                        if (playMove(returnValue[0], returnValue[1])) {
                            return returnValue;
                        }
                    }
                }
            }
        }
    }
    // get winning combination for computer inverse diagonal
    for (var i = (winSteak-2); i < boardsize; i++){
        for (var j = 0; j <= (boardsize - (winSteak - 2)) ; j++) {
            // check if matrix value belong to computer
            if(gameMatrix[i][j] == playerNum){
                // check inverse diagonal combination
                if (compuCheckInverseDiagonal(i, j, winSteak - 1)) {
                    returnValue = getEmptyBoxToMakeCombinationInverseDiagonal(i, j, winSteak);
                    if (returnValue[0] != -1 && returnValue[1] != -1) {
                        if (playMove(returnValue[0], returnValue[1])) {
                            return returnValue;
                        }
                    }
                }
            }
        }
    }
    return returnValue;
}
// Check on Right side of a box whether there is a combination (also in Intelligent move for computer)
// return yes if combination found

function compCheckRight(xCor, yCor, winOn) {
    var retVal = false;
    if (xCor < boardsize && yCor < boardsize && xCor + (winOn - 1) < boardsize) {
        // Declaration and initialization of arrray
        var winning = new Array();
        for (var i = 0; i < winOn; i++) {
            winning[i] = i;
        }
        for (var k = 0; k < winOn; k++) {
            winning[k] = gameMatrix[xCor+k][yCor];
        }
        retVal = true;
        for (var i = 1; i < winOn; i++) {
            //                        if (winOn == 1 && winning[i] == playerWM) {
            //                            retVal = true;
            //                            return retVal;
            //                        }
            if (winning[i] == '-1') {
                retVal = false;
                return retVal;
            }
            else {
                if (winning[i] != winning[(i - 1)]) {
                    retVal = false;
                }
            }
        }
        
    }
    return retVal;
}
// Check on bottom side of a box whether there is a combination (also in Intelligent move for computer)
// return yes if combination found
function compCheckBottom(xCor, yCor, winOn) {
    var retVal = false;
    if (xCor < boardsize && yCor < boardsize && yCor + (winOn - 1) < boardsize) {
        // Declaration and initialization of arrray
        var winning = new Array();
        for (var i = 0; i < winOn; i++) {
            winning[i] = i;
        }
        for (var k = 0; k < winOn; k++) {
            winning[k] = gameMatrix[xCor][yCor + k];
        }
        retVal = true;
        for (var i = 1; i < winOn; i++) {
            //                        if (winOn == 1 && winning[i] == playerWM) {
            //                            retVal = true;
            //                            return retVal;
            //                        }
            if (winning[i] == '-1') {
                retVal = false;
                return retVal;
            }
            else {
                if (winning[i] != winning[(i - 1)]) {
                    retVal = false;
                }
            }
        }
        
    }
    return retVal;
}
// Check on Diagonal side of a box whether there is a combination (also in Intelligent move for computer)
// return yes if combination found
function compCheckDiagonal(xCor, yCor, winOn) {
    var retVal = false;
    if (xCor < boardsize && yCor < boardsize && xCor + (winOn - 1) < boardsize) {
        // Declaration and initialization of arrray
        var winning = new Array();
        for (var i = 0; i < winOn; i++) {
            winning[i] = i;
        }
        for (var k = 0; k < winOn; k++) {
            winning[k] = gameMatrix[xCor + k][yCor + k];
        }
        retVal = true;
        for (var i = 1; i < winOn; i++) {
            //                        if (winOn == 1 && winning[i] == playerWM) {
            //                            retVal = true;
            //                            return retVal;
            //                        }
            if (winning[i] == '-1') {
                retVal = false;
                return retVal;
            }
            else {
                if (winning[i] != winning[(i - 1)]) {
                    retVal = false;
                }
            }
        }
        
    }
    return retVal;
}
// Check on Inverse Diagonal side of a box whether there is a combination (also in Intelligent move for computer)
// return yes if combination found
function compCheckInverseDiagonal(xCor, yCor, winOn) {
    var retVal = false;
    if (xCor < boardsize && yCor < boardsize && yCor + (winOn - 1) < boardsize && (xCor - (winOn-1)) >= 0) {
        // Declaration and initialization of arrray
        var winning = new Array();
        for (var i = 0; i < winOn; i++) {
            winning[i] = i;
        }
        for (var k = 0; k < winOn; k++) {
            winning[k] = gameMatrix[xCor - k][yCor + k];
        }
        retVal = true;
        for (var i = 1; i < winOn; i++) {
            if (winning[i] == '-1') {
                retVal = false;
                return retVal;
            }
            else {
                if (winning[i] != winning[(i - 1)]) {
                    retVal = false;
                }
            }
        }
        
    }
    return retVal;
}
// Check on Inverse Diagonal side of a box whether there is a combination in Intelligent move for computer)
// return yes if combination found
function compuCheckInverseDiagonal(xCor, yCor, winOn) {
    var retVal = false;
    if (xCor < boardsize && yCor < boardsize && yCor + (winOn - 1) < boardsize && (xCor - (winOn-1)) >= 0) {
        // Declaration and initialization of arrray
        var winning = new Array();
        for (var i = 0; i < winOn; i++) {
            winning[i] = i;
        }
        for (var k = 0; k < winOn; k++) {
            winning[k] = gameMatrix[xCor - k][yCor + k];
        }
        retVal = true;
        for (var i = 1; i < winOn; i++) {
            //                        if (winOn == 1 && winning[i] == playerWM) {
            //                            retVal = true;
            //                            return retVal;
            //                        }
            if (winning[i] == '-1') {
                retVal = false;
                return retVal;
            }
            else {
                if (winning[i] != winning[(i - 1)]) {
                    retVal = false;
                }
            }
        }
        
    }
    return retVal;
}

// Get Empty box to break a combination or get a box to make a combination to win
// This function will check on Right and Left of a combination whether an empty box or not
// return Box along X and along Y number which is free for move to place

function getEmptyBoxToBreakMakeCombinationRight(i, j, winOn){
    var retValX = -1;
    var retValY = -1;
    if (i > 0) {
        if(gameMatrix[i-1][j] == defaultData){
            retValX = i;
            retValY = j+1;
            return [retValX, retValY];
        }
    }
    if ((i+winOn-1) < boardsize) {
        if (gameMatrix[i+winOn-1][j] == defaultData) {
            retValX = i+winOn;
            retValY = j+1;
            return [retValX, retValY];
        }
    }
    return [retValX, retValY];
}
// Get Empty box to break a combination or get a box to make a combination to win
// This function will check bottom up and bottom down of a combination whether an empty box or not
// return Box along X and along Y number which is free for move to place
function getEmptyBoxToBreakMakeCombinationBottom(i, j, winOn) {
    var retValX = -1;
    var retValY = -1;
    if (j > 0) {
        if (gameMatrix[i][j - 1] == defaultData) {
            retValX = i+1;
            retValY = j;
            return [retValX, retValY];
        }
    }
    if ((j + winOn - 1) < boardsize) {
        if (gameMatrix[i][j + winOn - 1] == defaultData) {
            retValX = i+1;
            retValY = j + winOn;
            return [retValX, retValY];
        }
    }
    return [retValX, retValY];
}
// Get Empty box to break a combination or get a box to make a combination to win
// This function will check Inverse up and Inverse down of a combination whether an empty box or not
// return Box along X and along Y number which is free for move to place
function getEmptyBoxToBreakMakeCombinationDiagonal(i, j, winOn) {
    var retValX = -1;
    var retValY = -1;
    if (i > 0 && j > 0) {
        if (gameMatrix[i - 1][j - 1] == defaultData) {
            retValX = i;
            retValY = j;
            return [retValX, retValY];
        }
    }
    if ((i + winOn)-1 < boardsize && (j + winOn)-1 < boardsize) {
        if (gameMatrix[i + winOn - 1][j + winOn - 1] == defaultData) {
            retValX = i + winOn;
            retValY = j + winOn;
            return [retValX, retValY];
        }
    }
    return [retValX, retValY];
}
// Get Empty box to break a combination or get a box to make a combination to win
// This function will check Inverse Diagonal up and Inverse Diagonal down of a combination whether an empty box or not
// return Box along X and along Y number which is free for move to place
function getEmptyBoxToMakeCombinationInverseDiagonal(i, j, winOn) {
    var retValX = -1;
    var retValY = -1;
    if (i > 0 && j > 0 && (i+1) < boardsize) {
        if (gameMatrix[(i + 1)][(j - 1)] == defaultData) {
            retValX = i+2;
            retValY = j;
            return [retValX, retValY];
        }
    }
    if ((i - (winOn - 1)) >= 0 && (j + winOn - 1) < boardsize) {
        if (gameMatrix[i - (winOn - 1)][j + (winOn - 1)] == defaultData) {
            retValX = (i-(winOn-1))+1;
            retValY = j + winOn;
            return [retValX, retValY];
        }
    }
    return [retValX, retValY];
}
// Check missing intervals like X_XX, XX_X, XX_XX etc

function checkMissingIntervals(player){
    var retVal = [-1, -1];
    var winOn = winSteak;
    var winSteakBetween = winOn;
    
    while (winSteakBetween >= 2 && Math.floor(winOn/2) > 1) {
        // Check for Right Combination
        for (var i=0; i< (boardsize-(winOn-2)); i++) {
            for (var j=0; j < boardsize; j++) {
                // Check Right Between
                if (compCheckRight(i, j, Math.floor(winOn / 2))) {
                    if (gameMatrix[i][j] == player) {
                        var j1 = i;
                        if (i + (Math.floor(winOn / 2)) + 1 >= 0 && i + (Math.floor(winOn / 2)) + 1 < boardsize) {
                            if (gameMatrix[(i + (Math.floor(winOn / 2)))][j] == defaultData) {
                                var val = i + (Math.floor(winOn / 2)) + 1;
                                if (compCheckRight(val, j, (Math.floor(winOn / 2)))) {
                                    var j2 = val;
                                    if (j1 + (Math.floor(winOn / 2)) + 1 == j2) {
                                        retVal[0] = i + (Math.floor(winOn / 2)) + 1;
                                        retVal[1] = j+1;
                                        return retVal;
                                    }
                                }
                            }
                        }
                    }
                }
                // Check Right Corner
                if (compCheckRight(i, j, (winOn-2))) {
                    if (i + (winOn - 1) < boardsize) {
                        if (gameMatrix[i][j] == player) {
                            if (gameMatrix[(i + (winOn - 1))][j] == player) {
                                if (gameMatrix[(i + (winOn - 2))][j] == defaultData) {
                                    retVal[0] = i + (winOn - 2) + 1;
                                    retVal[1] = j + 1;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
                // Check Left Corner
                if (compCheckRight(i, j, (winOn-2))) {
                    if (i - 2 >= 0) {
                        if (gameMatrix[i][j] == player) {
                            if (gameMatrix[i - 2][j] == player) {
                                if (gameMatrix[i - 1][j] == defaultData) {
                                    retVal[0] = i;
                                    retVal[1] = j + 1;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
            }
        }
        // Check Bottom Between
        for (var i = 0; i < boardsize; i++) {
            for (var j=0; j <= (boardsize-(winOn-2)); j++) {
                // Check Between
                if (compCheckBottom(i, j, (Math.floor(winOn / 2)))) {
                    if (gameMatrix[i][j] == player) {
                        var j1 = j;
                        if (j1 + (Math.floor(winOn / 2)) + 1 < boardsize && i + (Math.floor(winOn / 2)) + 1 < boardsize) {
                            var val = j + (Math.floor(winOn / 2));
                            if (gameMatrix[i][val] == defaultData) {
                                if (compCheckBottom(i, (val + 1), (Math.floor(winOn / 2)))) {
                                    var j2 = val+1;
                                    if (j1 + (Math.floor(winOn / 2)) + 1 == j2) {
                                        retVal[0] = i+1;
                                        retVal[1] = j2;
                                        return retVal;
                                    }
                                }
                            }
                        }
                    }
                }
                // Check Bottom Down
                if (compCheckBottom(i, j, (winOn-2))) {
                    if (j + (winOn - 1) < boardsize) {
                        if (gameMatrix[i][j] == player) {
                            if (gameMatrix[i][j + (winOn - 1)] == player) {
                                if (gameMatrix[i][j + (winOn - 2)] == defaultData) {
                                    retVal[0] = i + 1;
                                    retVal[1] = j + (winOn - 1);
                                    return retVal;
                                }
                            }
                        }
                    }
                }
                // Check Bottom Up
                if (compCheckBottom(i, j, (winOn-2))) {
                    if (j - 2 >= 0) {
                        if (gameMatrix[i][j] == player) {
                            if (gameMatrix[i][j - 2] == player) {
                                if (gameMatrix[i][j - 1] == defaultData) {
                                    retVal[0] = i + 1;
                                    retVal[1] = j;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
            }
        }
        // Check Diagonal
        for (var i=0; i < (boardsize-(winOn-2)); i++) {
            for (var j=0; j < (boardsize-(winOn-2)); j++) {
                if (i + (Math.floor(winOn / 2)) + 1 < boardsize && j + (Math.floor(winOn / 2)) + 1 < boardsize) {
                    // Check Between
                    if (compCheckDiagonal(i, j, (Math.floor(winOn / 2)))) {
                        if (gameMatrix[i][j] == player) {
                            var i1 = i + (Math.floor(winOn / 2));
                            var j1 = j + (Math.floor(winOn / 2));
                            if(i1+1 < boardsize && j1+1 < (boardsize-(winOn-2))){
                                if (gameMatrix[i1][j1] == defaultData) {
                                    if (compCheckDiagonal((i1 + 1), j1 + 1, (Math.floor(winOn / 2)))) {
                                        retVal[0] = i1+1;
                                        retVal[1] = j1+1;
                                        return retVal;
                                    }
                                }
                            }
                        }
                    }
                }
                // Check Diagonal Down
                if (compCheckDiagonal(i, j, (winOn-2))) {
                    if (j + (winOn - 1) < boardsize && i + (winOn - 1) < boardsize) {
                        if (gameMatrix[i][j] == player) {
                            if (gameMatrix[(i + (winOn - 1))][(j + (winOn - 1))] == player) {
                                if (gameMatrix[(i + (winOn - 2))][(j + (winOn - 2))] == defaultData) {
                                    retVal[0] = i + (winOn - 1);
                                    retVal[1] = j + (winOn - 1);
                                    return retVal;
                                }
                            }
                        }
                    }
                }
                // Check Diagonal Up
                if (compCheckDiagonal(i, j, (winOn-2))) {
                    if (j - 2 >= 0 && i - 2 >= 0) {
                        if (gameMatrix[i][j] == player) {
                            if (gameMatrix[i - 2][j - 2] == player) {
                                if (gameMatrix[i - 1][j - 1] == defaultData) {
                                    retVal[0] = i;
                                    retVal[1] = j;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
            }
        }
        // Check Inverse Diagonal
        for (var i = (winOn-1); i < boardsize; i++) {
            for (var j=0; j < boardsize - winOn; j++) {
                // Check Between
                if (compCheckInverseDiagonal(i, j, (Math.floor(winOn / 2)))) {
                    if (gameMatrix[i][j] == player) {
                        var i1 = i - (Math.floor(winOn / 2));
                        var j1 = j + (Math.floor(winOn / 2));
                        if(i1-1 >= 0 && j1+1 < boardsize){
                            if (gameMatrix[i1][j1] == defaultData) {
                                if (compCheckInverseDiagonal((i1 - 1), (j1 + 1), (Math.floor(winOn / 2)))) {
                                    retVal[0] = i1+1;
                                    retVal[1] = j1+1;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
                // Check Inverse Diagonal Down
                if (compCheckInverseDiagonal(i, j, (winOn-2))) {
                    if (i - (Math.floor(winOn / 2)) - 2 >= 0 && j + (Math.floor(winOn / 2)) + 2 < boardsize) {
                        var ii = (i - ((winOn - 2) + 1));
                        var jj = (j + ((winOn - 2) + 1));
                        if (gameMatrix[i][j] == player) {
                            if (gameMatrix[ii][jj] == player) {
                                if (gameMatrix[(i - (winOn - 2))][(j + (winOn - 2))] == defaultData) {
                                    retVal[0] = i - (winOn - 2) + 1;
                                    retVal[1] = j + (winOn - 2) + 1;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
                // Check Inverse Diagonal Up
                if (compCheckInverseDiagonal(i, j, (winOn-2))) {
                    if (j - 2 >= 0 && i + 2 < boardsize) {
                        if (gameMatrix[i][j] == player) {
                            if (gameMatrix[i + 2][j - 2] == player) {
                                if (gameMatrix[i + 1][j - 1] == defaultData) {
                                    retVal[0] = i + 2;
                                    retVal[1] = j;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        winSteakBetween -= 2;
    }
    var WS1 = 2;
    var WS2 = (winSteak-3);
    retVal = checkForMissingIntervalForTwoWinSteaks(WS1, WS2, player);
    if (retVal[0] != -1 && retVal[1] != -1) {
        return retVal;
    }
    
    
    
    return retVal;
}

// Return a missing interval for two different Win Steaks
// winSteak1 will start from 1 and goes to totalWinSteak-2
// winSteak2 will start from totalWinSteak-2 and goes to 1

function checkForMissingIntervalForTwoWinSteaks(WS1, WS2, player) {
    var retVal = [-1, -1];
    var winSteak1 = WS1;
    var winSteak2 = WS2;
    var totalWinSteak = winSteak;
    
    // Check Right
    while (winSteak1 <= (totalWinSteak - 3) && winSteak2 >= 2) {
        for (var i=0; i<(boardsize-winSteak); i++) {
            for (var j = 0; j < boardsize; j++) {
                if (compCheckRight(i, j, winSteak1)) {
                    if (i+winSteak1+1 <= boardsize) {
                        if (gameMatrix[(i + (winSteak1 + 1))][j] == player) {
                            if (gameMatrix[(i + winSteak1)][j] == defaultData) {
                                if (compCheckRight((i+winSteak1+1), j, winSteak2)) {
                                    retVal[0] = i+winSteak1+1;
                                    retVal[1] = j+1;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
            }
        }
        winSteak1 += 1;
        winSteak2 -= 1;
    }
    winSteak1 = WS1;
    winSteak2 = WS2;
    
    // Check Bottom
    while (winSteak1 <= (totalWinSteak - 3) && winSteak2 >= 2) {
        for (var i = 0; i < (boardsize ); i++) {
            for (var j = 0; j < boardsize - winSteak; j++) {
                if (compCheckBottom(i, j, winSteak1)) {
                    if (j + winSteak1 + 1 <= boardsize) {
                        if (gameMatrix[i][(j + (winSteak1 + 1))] == player) {
                            if (gameMatrix[i][(j + winSteak1)] == defaultData) {
                                if (compCheckBottom(i, (j + winSteak1 + 1), winSteak2)) {
                                    retVal[0] = i + 1;
                                    retVal[1] = j + winSteak1 + 1;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
            }
        }
        winSteak1 += 1;
        winSteak2 -= 1;
    }
    winSteak1 = WS1;
    winSteak2 = WS2;
    
    // Check Diagonal
    while (winSteak1 <= (totalWinSteak - 3) && winSteak2 >= 2) {
        for (var i = 0; i <= (boardsize - winSteak) ; i++) {
            for (var j = 0; j <= (boardsize - winSteak) ; j++) {
                if (compCheckDiagonal(i, j, winSteak1)) {
                    if (i + winSteak1 + 1 <= boardsize && j + winSteak1 + 1 <= boardsize) {
                        if (gameMatrix[i + (winSteak1 + 1)][(j + (winSteak1 + 1))] == player) {
                            if (gameMatrix[(i + winSteak1)][(j + winSteak1)] == defaultData) {
                                if (compCheckDiagonal((i + winSteak1 + 1), (j + winSteak1 + 1), winSteak2)) {
                                    retVal[0] = i + winSteak1 + 1;
                                    retVal[1] = j + winSteak1 + 1;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
            }
        }
        winSteak1 += 1;
        winSteak2 -= 1;
    }
    winSteak1 = WS1;
    winSteak2 = WS2;
    
    // Check Inverse Diagonal
    while (winSteak1 <= (totalWinSteak - 3) && winSteak2 >= 2) {
        for (var i = (totalWinSteak - 2); i < boardsize; i++) {
            for (var j = 0; j < (boardsize - (winSteak - 2)) ; j++) {
                if (compCheckInverseDiagonal(i, j, winSteak1)) {
                    if ((i - winSteak1 - 1) >= 0 && (j + winSteak1 + 1) >= 0) {
                        if (gameMatrix[((i - winSteak1) - 1)][((j + winSteak1) + 1)] == player) {
                            if (gameMatrix[(i - winSteak1)][(j + winSteak1)] == defaultData) {
                                if (compuCheckInverseDiagonal((i-winSteak1)-1, j+winSteak1+1, winSteak2)) {
                                    retVal[0] = (i - winSteak1) + 1;
                                    retVal[1] = j + winSteak1 + 1;
                                    return retVal;
                                }
                            }
                        }
                    }
                }
            }
        }
        winSteak1 += 1;
        winSteak2 -= 1;
    }
    return retVal;
}

// Check whether palyer will win on both ends open.

function getBoxForComputerOnBothEndOpen(player, to){
    var returnValue = [-1, -1];
    var winOn = winSteak-2;
    for (var k=0; k < winSteak-2; k++) {
        if (winOn > to) {
            // Get winning combination for Right
            for (var i=0; i <= (boardsize - winSteak)+1; i++) {
                for (var j = 0; j < boardsize; j++) {
                    // check if matrix value belong to player
                    if(gameMatrix[i][j] == player){
                        // check right combination
                        if (compCheckRight(i, j, winOn)) {
                            returnValue = getEmptyBoxToBreakBothEndedCombinationRight(i, j, winOn);
                            if(returnValue[0] != -1 && returnValue[1] != -1){
                                return returnValue;
                            }
                        }
                    }
                }
            }
            // get winning combination for bottom
            for (var i=0; i < boardsize; i++) {
                for (var j=0; j < boardsize - winSteak; j++) {
                    // check if matrix value belong to player
                    if(gameMatrix[i][j] == player){
                        // check bottom combination
                        if (compCheckBottom(i, j, winOn)) {
                            returnValue = getEmptyBoxToBreakBothEndedCombinationBottom(i, j, winOn);
                            if(returnValue[0] != -1 && returnValue[1] != -1){
                                return returnValue;
                            }
                        }
                    }
                }
            }
            // Get winning combination for Diagonal
            for (var i = 0; i <= (boardsize - winSteak)+1; i++){
                for (var j = 0; j <= (boardsize - winSteak)+1; j++){
                    // check if matrix value belong to player
                    if(gameMatrix[i][j] == player){
                        // check Diagonal combination
                        if (compCheckDiagonal(i, j, winOn)) {
                            returnValue = getEmptyBoxToBreakBothEndedCombinationDiagonal(i, j, winOn);
                            if (returnValue[0] != -1 && returnValue[1] != -1) {
                                return returnValue;
                            }
                        }
                    }
                }
            }
            // Get winning combination for computer Inverse Diagonal
            for (var i = (winOn - 1); i < (boardsize-1) ; i++){
                for (var j = 0; j < (boardsize - winOn); j++) {
                    // check if matrix value belong to player
                    if(gameMatrix[i][j] == player){
                        // check Inverse Diagonal combination
                        
                            if (compCheckInverseDiagonal(i, j, winOn)) {
                                returnValue = getEmptyBoxToBreakBothEndedCombinationInverseDiagonal(i, j, winOn);
                                if (returnValue[0] != -1 && returnValue[1] != -1) {
                                    return returnValue;
                                
                            }
                        }
                    }
                }
            }
        }
        winOn = winOn-1;
    }
    
    return returnValue;
}

//
// Get box for Computer/ Player with winning probability on both ends open
//

function getEmptyBoxToBreakBothEndedCombinationRight(i, j, winOn){
    var retVal = [-1, -1];
    var firstEnd = false;
    if (i-1 >= 0) {
        if(gameMatrix[(i-1)][j] == defaultData){
            firstEnd = true;
        }
    }
    if ((i+winOn) < boardsize && firstEnd == true) {
        if (gameMatrix[(i + (winOn))][j] == defaultData) {
            retVal[0] = i+winOn+1;
            retVal[1] = j+1;
            return retVal;
        }
    }
    return retVal;
}
function getEmptyBoxToBreakBothEndedCombinationBottom(i, j, winOn){
    var retVal = [-1, -1];
    var firstEnd = false;
    if (j - 1 >= 0) {
        if (gameMatrix[i][(j-1)] == defaultData) {
            firstEnd = true;
        }
    }
    if ((j + winOn) < boardsize && firstEnd == true) {
        if (gameMatrix[i][(j + (winOn))] == defaultData) {
            retVal[0] = i + 1;
            retVal[1] = j + winOn + 1;
            return retVal;
        }
    }
    return retVal;
}
// Get Empty box to break a combination or get a box to make a computer to win
// This function will check on Diagonal up and Diagonal down whether an empty box or not
// return Box number which is free for move to place
function getEmptyBoxToBreakBothEndedCombinationDiagonal(i, j, winOn) {
    var retVal = [-1, -1];
    var firstEnd = false;
    if (i > 0 && j > 0 && i < boardsize && j < boardsize) {
        if (gameMatrix[(i-1)][(j-1)] == defaultData) {
            firstEnd = true;
        }
    }
    if ((j + winOn) < boardsize && (i + winOn) < boardsize && firstEnd == true) {
        if (gameMatrix[(i + winOn)][(j + winOn)] == defaultData) {
            retVal[0] = i + winOn + 1;
            retVal[1] = j + winOn + 1;
            return retVal;
        }
    }
    return retVal;
}
function getEmptyBoxToBreakBothEndedCombinationInverseDiagonal(i, j, winOn) {
    var retVal = [-1, -1];
    var firstEnd = false;
    if (i > 0 && j > 0 && i < boardsize && j < boardsize) {
        if (gameMatrix[(i + 1)][(j - 1)] == defaultData) {
            firstEnd = true;
        }
    }
    if ((j + winOn) < boardsize && (i - winOn) > 0 && firstEnd == true) {
        if (gameMatrix[(i - winOn)][(j + winOn)] == defaultData) {
            retVal[0] = i - winOn + 1;
            retVal[1] = j + winOn + 1;
            return retVal;
        }
    }
    return retVal;
}

// return a box where Computer can win with more probability

function getBoxForComputerToWin(player, to){
    var returnValue = [-1, -1];
    var winOn = winSteak-2;
    
    for (var k=0; k < winSteak-2; k++) {
        if (winOn > to) {
            
            // Get winning combination for Computer Right
            for (var i=0; i<boardsize-winOn; i++) {
                for (var j=0; j<boardsize; j++) {
                    // check if matrix value belong to computer
                    if(gameMatrix[i][j] == player){
                        // check right combination
                        if (compCheckRight(i, j, winOn)) {
                            returnValue = getEmptyBoxToBreakMakeCombinationRight(i, j, winOn+1);
                            if(returnValue[0] != -1 && returnValue[1] != -1){
                                return returnValue;
                            }
                        }
                    }
                }
            }
            //Get winning combination for computer Bottom
            for (var i=0; i < boardsize; i++) {
                for (var j=0; j < (boardsize - winOn); j++) {
                    // check if matrix value belong to computer
                    if(gameMatrix[i][j] == player){
                        // check Bottom combination
                        if (compCheckBottom(i, j, winOn)) {
                            returnValue = getEmptyBoxToBreakMakeCombinationBottom(i, j, winOn+1);
                            if (returnValue[0] != -1 && returnValue[1] != -1) {
                                return returnValue;
                            }
                        }
                    }
                }
            }
            // Get winning combination for computer Diagonal
            for (var i = 0; i <= (boardsize - winOn); i++){
                for (var j = 0; j <= (boardsize - winOn); j++){
                    // check if matrix value belong to computer
                    if(gameMatrix[i][j] == player){
                        // check Diagonal combination
                        if (compCheckDiagonal(i, j, winOn)) {
                            returnValue = getEmptyBoxToBreakMakeCombinationDiagonal(i, j, winOn+1);
                            if(returnValue[0] != -1 && returnValue[1] != -1){
                                return returnValue;
                            }
                        }
                    }
                }
            }
            // Get winning combination for computer Inverse Diagonal
            for (var i = (winOn - 1) ; i < boardsize; i++) {
                for (var j = 0; j < (boardsize - winOn); j++){
                    // check if matrix value belong to computer
                    if(gameMatrix[i][j] == player){
                        // check Inverse Diagonal combination
                        if (compCheckInverseDiagonal(i, j, winOn)) {
                            returnValue = getEmptyBoxToMakeCombinationInverseDiagonal(i, j, winOn+1);
                            if(returnValue[0] != -1 && returnValue[1] != -1){
                                return returnValue;
                            }
                        }
                    }
                }
            }
        }
        winOn -= 1;
    }
    return returnValue;
}