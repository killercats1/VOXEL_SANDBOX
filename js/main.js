// main.js

// Clr data
function openClrModal() {
    document.getElementById('clr-data-model').style.display = 'flex';
}

function closeClrModal() {
    document.getElementById('clr-data-model').style.display = 'none';
}

$(document).ready(function() {
    document.getElementById('clr-data-model').addEventListener('click', function(event) {
        if (event.target.classList.contains('cancel-btn')) {
            closeClrModal();
        } else if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Yes') {
            localStorage.clear();
            location.reload();
        }
    });

    // Search Bar Functionality
    $('#search-bar').on('keyup', function() {
        var query = $(this).val().toLowerCase();
        $('.filter-button').each(function() {
            var buttonText = $(this).text().toLowerCase();
            if (buttonText.indexOf(query) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Show Modded Clients Functionality
    function updateShowModded() {
        var isChecked = $("#showModded").is(":checked");
        if (isChecked) {
            $("#moddedButtons").show();
        } else {
            $("#moddedButtons").hide();
        }
    }

    $("#showModded").on("change", updateShowModded);
    updateShowModded();
});
