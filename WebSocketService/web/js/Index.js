﻿var ws;
$(function () {
    
    $("#login").click(function () {

        var name = $("#uname").val();
        var pwd = $("#upwd").val();
        if (name && name.length > 0) {
            if (pwd && pwd.length > 0) {
                var data = '{"name":"' + name + '","pwd":"' + pwd + '","action":"login"}';
                if (ws) {
                    sendMessage(data);
                } else {
                    connecService(function () {
                        //发送数据
                        appendMessage("连接成功");

                        sendMessage(data);
                    });
                }



            } else {
                $("#upwd").focus();
            }
        } else {
            $("#uname").focus();
        }
    });
    $("#send").click(function() {
        var txt = $("#text").val();
        if (txt&&txt.length>0) {
            var data = '{"message":"' + txt + '","action":"allmessage"}';
            sendMessage(data);
        } else {
            $("#text").focus();
        }
    });
});
function connecService(success) {
    var support = "MozWebSocket" in window ? 'MozWebSocket' : ("WebSocket" in window ? 'WebSocket' : null);
    if (support == null) {
        appendMessage("浏览器不支持websocket<br/>");
        return;
    }
    ws = new window[support]('ws://192.168.187.251:8888/');
    // 接收到服务器发来的消息
    ws.onmessage = function (evt) {
        var newdata = $.parseJSON(evt.data);
        switch (newdata.action) {
            case "login":
                if (newdata.state == "ok") {
                    $(".main").show();
                    $(".login").hide();
                    $(".content").html("");
                    apendMes(newdata.message);
                } else {
                    alert(newdata.message);
                }
                break;
            case "allmessage":
                apendMes(newdata.message);
                break;

            case "logout":
               
                break;
        }
    };

    // 连接服务器成功
    ws.onopen = success;

    // 服务器被断开
    ws.onclose = function () {
        appendMessage("断开连接");
        ws.close();
        ws = null;
        $(".login").show();
        $(".main").hide();
    };
}
function appendMessage(message) {
    alert(message);
}
function sendMessage(data) {
    if (ws) {
        ws.send(data);
    }
}
function apendMes(message) {
    $(".content").append("<p>"+message+"</p>");
}