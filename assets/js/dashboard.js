$(function() {
    dashboard();
});

dashboard = () => {
    userDashbord();
    instanceDashbord();
    contactDashbord();
    groupDashbord();
}

userDashbord = () => {
    var tips = $("#users");
    tips.html("<img src='assets/img/loader.gif' />");
    tips.addClass("alert-light");
    $.post(
        "api/api.php?action=dashboard", {
            type: "user"
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    tips.html(r.data.total);
                } catch (error) {
                    updateTips(tips, error);
                }
            } else {
                updateTips(tips, data);
            }
        }
    );
}

instanceDashbord = () => {
    var tips = $("#instances");
    tips.html("<img src='assets/img/loader.gif' />");
    tips.addClass("alert-light");
    $.post(
        "api/api.php?action=dashboard", {
            type: "instance"
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    tips.html(r.data.total);
                } catch (error) {
                    updateTips(tips, error);
                }
            } else {
                updateTips(tips, data);
            }
        }
    );
}

contactDashbord = () => {
    var tips = $("#contacts");
    tips.html("<img src='assets/img/loader.gif' />");
    tips.addClass("alert-light");
    $.post(
        "api/api.php?action=dashboard", {
            type: "contact"
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    tips.html(r.data.total);
                } catch (error) {
                    updateTips(tips, error);
                }
            } else {
                updateTips(tips, data);
            }
        }
    );
}

groupDashbord = () => {
    var tips = $("#groups");
    tips.html("<img src='assets/img/loader.gif' />");
    tips.addClass("alert-light");
    $.post(
        "api/api.php?action=dashboard", {
            type: "group"
        },
        (data, status) => {
            if (status == "success") {
                try {
                    var r = JSON.parse(data);
                    tips.html(r.data.total);
                } catch (error) {
                    updateTips(tips, error);
                }
            } else {
                updateTips(tips, data);
            }
        }
    );
}