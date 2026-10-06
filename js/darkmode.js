$(document).ready(function() {
    function updateDarkMode(isChecked) {
        if (isChecked) {
            const body = document.querySelector('body');
            body.style.backgroundColor = '#141414';
            body.style.color = '#f1f1f1';
            body.style.backgroundImage= 'none';  
            const paragraphs = document.querySelectorAll('p');
            paragraphs.forEach(function(p) {
                p.style.color = '#f1f1f1';
            });
            const headTwo = document.querySelector('h2');
            headTwo.style.color = '#f1f1f1';
            const head = document.querySelector('h1');
            head.style.color = '#f1f1f1';
            head.classList.add('text-shadow');
            head.style.textShadow = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
            
            const foot = document.querySelector('.footer');
            foot.style.backgroundColor = '#6C8592';
            const gitBtn = document.querySelector('.source-btn');
            gitBtn.style.backgroundColor = '#ff6847';
            
            const buttons = document.querySelectorAll('button');
            buttons.forEach(function(button) {
                button.style.backgroundColor = '#30d3d2';
            });
            const versionTexts = document.querySelectorAll('.version-text');
            versionTexts.forEach(function(vt) {
                vt.style.color = '#f1f1f1';
            });
            const dZone = document.querySelector('.danger-zone');
            dZone.style.color = '#ff6847';
            const dZoneText = document.querySelector('.modal');
            dZoneText.style.color = '#ff3c00';
            localStorage.setItem('darkModeOn', true);
        } else {
            const body = document.querySelector('body');
            body.style.backgroundColor = '#f1f1f1';
            body.style.color = 'black';
            body.style.backgroundImage= "url('images/grass-background.jpg')";  
            const paragraphs = document.querySelectorAll('p');
            paragraphs.forEach(function(p) {
                p.style.color = 'black';
            });
            const headTwo = document.querySelector('h2');
            headTwo.style.color = 'black';
            const head = document.querySelector('h1');
            head.style.color = 'black';
            head.classList.remove('text-shadow');
            head.style.textShadow = '-0px 0 white, 0 0px white, 0px 0 white, 0 -0px white';
            
            const foot = document.querySelector('.footer');
            foot.style.backgroundColor = '#dfe1e2';
            foot.style.color = '#ffffff';
            const gitBtn = document.querySelector('.source-btn');
            gitBtn.style.backgroundColor = '#0095ff';
            const buttons = document.querySelectorAll('button');
            buttons.forEach(function(button) {
                button.style.backgroundColor = '#4caf50';
            });
            const versionTexts = document.querySelectorAll('.version-text');
            versionTexts.forEach(function(vt) {
                vt.style.color = 'black';
            });
            const dZone = document.querySelector('.danger-zone');
            dZone.style.color = '#010101';
            const dZoneText = document.querySelector('.modal');
            dZoneText.style.color = '#010101';
            localStorage.removeItem("darkModeOn");
        }
    }
    if (localStorage.getItem('darkModeOn') === 'true') {
        document.getElementById('darkModeCheckbox').checked = true; 
        var checked = document.getElementById('darkModeCheckbox').checked;
        updateDarkMode(checked);
    }
    $("#darkModeCheckbox").on("change", function() {
        var checked = document.getElementById('darkModeCheckbox').checked;
        updateDarkMode(checked);
    });
});
