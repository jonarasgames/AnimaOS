let windows = {};

function openApp(appName) {
    if (windows[appName]) {
        windows[appName].focus();
        return;
    }

    const windowElement = document.createElement('div');
    windowElement.className = 'window';
    windowElement.innerHTML = `
        <div class="header">
            ${appName} 
            <span class="close-btn" onclick="closeWindow('${appName}')">❌</span>
            <span class="minimize-btn" onclick="minimizeWindow('${appName}')">➖</span>
            <span class="fullscreen-btn" onclick="fullscreenWindow('${appName}')">⛶</span>
        </div>
        <div class="content">
            <p>Conteúdo do ${appName}</p>
        </div>
    `;
    
    document.getElementById('windows').appendChild(windowElement);
    windows[appName] = windowElement;
    windowElement.style.display = 'block';
    windowElement.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
    windowElement.style.left = `${Math.random() * (window.innerWidth - 300)}px`;
    
    makeDraggable(windowElement);
    windowElement.focus();
}

function closeWindow(appName) {
    const windowElement = windows[appName];
    if (windowElement) {
        windowElement.remove();
        delete windows[appName];
    }
}

function minimizeWindow(appName) {
    const windowElement = windows[appName];
    if (windowElement) {
        windowElement.style.display = 'none';
    }
}

function fullscreenWindow(appName) {
    const windowElement = windows[appName];
    if (windowElement) {
        if (!document.fullscreenElement) {
            windowElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

function makeDraggable(element) {
    let offsetX, offsetY;

    element.querySelector('.header').addEventListener('mousedown', function(e) {
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        function mouseMoveHandler(e) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }, { once: true });
    });
}
