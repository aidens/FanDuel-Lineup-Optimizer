/**
 * Created by Swami on 12/28/15.
 */

var v = 0;

function fillInjuryReport(sportId) {
    $.get("http://www.fantasylabs.com/api/players/news/" + sportId, function (data, status) {

        var table = $("tbody");

        for (i = 0; i < data.length; i++) {
            var playerName = data[i].PlayerName,
                playerTeam = data[i].Team,
                playerPos = data[i].Position,
                playerStatus = data[i].PlayerStatus,
                playerTitle = data[i].Title,
                playerInjury = data[i].Injury,
                statusDate = new Date(data[i].ModifiedDate),
                playerSalary = data[i].Salary;

            table.append(
                '<tr>' +
                '<th>' + playerName + '</th>' +
                '<td>' + playerPos + '</td>' +
                '<td>' + playerTeam + '</td>' +
                '<td>' + playerTitle + '</td>' +
                '<td>' + playerInjury + '</td>' +
                '<td>' + "$" +playerSalary + '</td>' +
                '<td>' + (statusDate.getMonth() + 1) + '/' + statusDate.getDate() + '/' +  statusDate.getFullYear()  + '</td>' +
                '</tr>');

            var rows_arr = $("tbody th");

            if (playerStatus === "Out" || playerStatus === "Suspended" || playerStatus === "Injured") {
                $(rows_arr[i]).css("background-color", "red");
            }

            if (playerStatus === "Doubtful") {
                $(rows_arr[i]).css("background-color", "orange");
            }
        }
        //table.append();
        //console.log();
    });

}

$(document).ready(function() {

   fillInjuryReport(2);

    $(".onoffswitch-inner").click( function () {
        $("#injury-table > tbody > tr").remove();

        if (v == 0) {
            v = 1;
            fillInjuryReport(1);
        } else if (v == 1){
            v = 0;
            fillInjuryReport(2);
        }
    });
});