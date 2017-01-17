/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(".fa-bars").tapend(function(){
	$("#menu").animate({left : "0px"});
	$(".modal").show();
});

$(".modal").tapend(function(){
	$("#menu").animate({left : "-80%"});
	$(".modal").hide();
});


var htmlAdd ="";
var fibo1 = 0;
var fibo2 = 1;
for(var i=1; i < 9; i++) { 
	htmlAdd +=
	'<div class="pokerCard" value="'+(fibo1 + fibo2)+'">\
		<div class="front"></div>\
		<div class="back">'+(fibo1 + fibo2)+'</div>\
	</div>';
	var temp = fibo1;
	fibo1 = fibo2;
	fibo2 = (temp + fibo2);
}
htmlAdd +=
	'<div class="pokerCard" value="X">\
		<div class="front"></div>\
		<div class="back"><i class="fa fa-coffee" aria-hidden="true"></i></div>\
	</div>';
$(".app").html(htmlAdd);
$(".pokerCard").flip();
$(".bigCard").flip();


$("#ec").tapend(function(){
	
	caso = 37220;
	$(".login").hide();
	
		ws = new WebSocket($("#server").val());
		
		ws.onopen = function(){
			conectar();
			addPlayer();
			$(".pokerCard").flip(true);
		}	  	

		ws.onerror = function (error) {
		  console.log('WebSocket Error ' + error);
		};
});

$(".pokerCard").tapend(function(){
	$(".bigCard .back").html($(this).attr("value"));
	addCard($(this).attr("value"));
	$(".bigCard").fadeIn( "slow" );
	$(".pokerCard").flip(true);
	$(".bigCard").flip(false);
	flip();
});

$(".bigCard .back").tapend(function(){
	
	$(".bigCard").fadeOut( "slow" );
});
function conectar(){
	 ws.send(JSON.stringify({"type" : "connect", "connectionType" : "PLAYER", "id" : "ID"+caso}));
}

function addPlayer(){
	 ws.send(JSON.stringify({"type" : "addPlayer", "connectionType" : "PLAYER", "id" : "ID"+caso, "player" : $("#user").val()}));
}

function addCard(points){
	 ws.send(JSON.stringify({"type" : "addCard", "connectionType" : "PLAYER", "id" : "ID"+caso, "player" : $("#user").val(), "points" : points}));
}

function flip(){
	 ws.send(JSON.stringify({"type" : "flipCard", "connectionType" : "PLAYER", "id" : "ID"+caso, "player" : $("#user").val() }));
}


$(".bigCard").css({height : (window.innerHeight -35)+"px"});
$(".bigCard .back").css({"line-height" : (window.innerHeight -35)+"px"});

