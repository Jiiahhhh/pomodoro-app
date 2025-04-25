<%--
  Created by IntelliJ IDEA.
  User: ilal
  Date: 25/04/25
  Time: 10.30
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Pomodoro Timer</title>
    <asset:stylesheet src="style.css"/>
</head>

<body>
<div id="pomodoro-container">
    <div class="timer-box">
        <h2 id="timer-label">SESSION</h2>
        <div id="time-left">25.00</div>
        <div class="timer-controls">
            <button id="start_stop">Start</button>
            <button id="reset">Reset</button>
        </div>
    </div>

    <div class="length-controls">
        <div class="control-box" id="break-control">
            <div class="adjust-controls">
                <button id="break-decrement">-</button>
                <span id="break-length">5</span>
                <button id="break-increment">+</button>
            </div>
            <div id="break-label">Break Length</div>
        </div>
        <div class="control-box" id="session-control">
            <div class="adjust-controls">
                <button id="session-decrement">-</button>
                <span id="session-length">25</span>
                <button id="session-increment">+</button>
            </div>
            <div id="session-label">Session Length</div>
        </div>
    </div>
</div>
<asset:javascript src="script.js"/>
</body>
</html>