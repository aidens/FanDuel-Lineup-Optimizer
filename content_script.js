/**
 * Created by Swami on 12/17/15.
 */

var gameID = window.location.href.substr(30, 5);

var sport = "nba";

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };

    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader('Authorization', 'Basic N2U3ODNmMTE4OTIzYzE2NzVjNWZhYWFmZTYwYTc5ZmM6');
    xmlHttp.send(null);
}

//function download(filename, text) {
//    var pom = document.createElement('a');
//    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//    pom.setAttribute('download', filename);
//
//    if (document.createEvent) {
//        var event = document.createEvent('MouseEvents');
//        event.initEvent('click', true, true);
//        pom.dispatchEvent(event);
//    }
//    else {
//        pom.click();
//    }
//}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);

    rawFile.send();
    var doc = rawFile.responseText;

    console.log(doc);

}

var reader; //GLOBAL File Reader object for demo purpose only

/**
 * Check for the various File API support.
 */
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true;
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

function readText(filePath) {
    var output = ""; //placeholder for text output
    if(filePath.files && filePath.files[0]) {
        reader.onload = function (e) {
            output = e.target.result;
            displayContents(output);
        };//end onload()
        reader.readAsText(filePath.files[0]);
    }//end if html5 filelist support
    else { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }
    return true;
}

/**
 * display content using a basic HTML replacement
 */
function displayContents(txt) {
    console.log(txt);
   alert(txt);
}


$(document).ready(function() {

    //setTimeout(function(){
    //    //do what you need here
    //
    //    readTextFile("file:///Users/Swami/WebstormProjects/fanduel_lineup/proj.txt");
    //}, 10000);
    //checkFileAPI();
    //readText("file:///Users/Swami/WebstormProjects/fanduel_lineup/proj.txt");

    if ($(".salary-container")[0]) {

        sport = document.getElementsByTagName('player-indicator-legend')[0].getAttribute('sport').toLowerCase();

        var totalPoints = 0,
            totalProjPoints = 0;

        var fill_total_avg_points = function() {
            totalPoints = 0;

            httpGetAsync("https://api.fanduel.com/fixture-lists/" + gameID + "/players", function(data) {
                var obj = jQuery.parseJSON(data);

                $(document).ready(function() {
                    for (i = 0; i < 9; i++) {
                        var firstName = document.getElementsByClassName("lineup lineup--draft")[0].getElementsByClassName('player-first-name')[i].innerHTML;
                        var lastName = document.getElementsByClassName("lineup lineup--draft")[0].getElementsByClassName('player-last-name')[i].innerHTML;
                        //var salary = 0;
                        var fppg = 0;

                        for (j = 0; j < obj.players.length; j++) {
                            if (firstName.replace(/\s/g, "") === (obj.players[j].first_name).replace(/\s/g, "") && lastName.replace(/\s/g, "") === (obj.players[j].last_name).replace(/\s/g, "")) {
                                //salary = obj.players[j].salary;
                                fppg =  Number((obj.players[j].fppg).toFixed(2));
                                totalPoints += fppg;
                            }
                        }
                    }

                    totalPoints = Number((totalPoints).toFixed(1));

                    if ($(".statistic-total-avg-points")[0]) {

                    } else {
                        $(".salary-container").prepend('<div class="statistic-total-avg-points data-chunk data-chunk--medium" ng-if=":: !salary.hideAverage()"> <figure class="fppg-avg-player-amount" style="color:limegreen;">999</figure> <figcaption class="data-chunk-name" style="color:limegreen;">Avg Points</figcaption> </div>');
                    }

                    $(".fppg-avg-player-amount").text(totalPoints);
                });
            });
        };

        fill_total_avg_points();
        $(document).on('click', '.remove-from-roster, .player-add-button, .player-remove-button', fill_total_avg_points);

        // Add PROJ header to table
        $(document.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0]).after('<th class="player-proj-header">PROJ</th>');

        $.get("https://rotogrinders.com/projected-stats/" + sport + "?site=fanduel", function (data, status) {
            var el = document.createElement( 'div' );
            el.innerHTML = data;

            var load_projections = function() {
                var table = document.getElementsByClassName("player-list-vs-repeat-container")[0];
                var table_row = table.getElementsByTagName("tr");
                var table_length = table_row.length;

                for (i = 0; i < table_length; i++) {

                    var firstName = table.getElementsByClassName("player-first-name")[i].innerText.replace(/\s/g, "");
                    var lastName = table.getElementsByClassName("player-last-name")[i].innerText.replace(/\s/g, "");

                    var fromTable_fullName = firstName + " " + lastName;
                    var projectionTable = el.getElementsByClassName("player");


                    for (j = 1; j < projectionTable.length; j++) {
                        var fullName = projectionTable[j].getElementsByClassName("player-popup")[0].innerText;
                        var fpts = parseFloat(projectionTable[j].getElementsByTagName("td")[4].innerText.replace(/\s/g, ""));


                        // console.log(fromTable_fullName + "  " + fullName + " " + fpts);

                        if (fromTable_fullName === fullName) {
                            if ($(table_row[i].getElementsByClassName("player-proj"))[0]) {

                            } else {
                                $(table_row[i].getElementsByTagName("td")[1]).after('<td class="player-proj" title="PROJ">16.2 </td>');

                            }

                            $(table_row[i].getElementsByTagName("td")[2]).text(fpts);
                            break;
                        }
                    }
                }
            };

            load_projections();
            $(".player-list-position-tab").on('click', load_projections);
            $(".player-list-vs-repeat-container").on('scroll', load_projections);
        });


        //Get Projects from draft lineup
        $.get("https://rotogrinders.com/projected-stats/" + sport + "?site=fanduel", function (data, status) {
            //var obj = jQuery.parseJSON(JSON.stringify(data));

            var el = document.createElement('div');
            el.innerHTML = data;


            var fill_total_projections = function() {
                totalProjPoints = 0;

                for (i = 0; i < 9; i++) {
                    var firstName = document.getElementsByClassName("lineup lineup--draft")[0].getElementsByClassName('player-first-name')[i].innerHTML;
                    var lastName = document.getElementsByClassName("lineup lineup--draft")[0].getElementsByClassName('player-last-name')[i].innerHTML;

                    for (j = 1; j < el.getElementsByClassName("player").length; j++) {
                        var fullName = el.getElementsByClassName("player")[j].getElementsByClassName("player-popup")[0].innerText;
                        var fpts = parseFloat(el.getElementsByClassName("player")[j].getElementsByTagName("td")[4].innerText.replace(/\s/g, ""));

                        var fromDraft_fullName = firstName.replace(/\s/g, "") + " " + lastName.replace(/\s/g, "") ;

                        //console.log("checking: "+ el.getElementsByClassName("player").length);

                        if (fromDraft_fullName === fullName) {
                            //console.log(fullName);
                            totalProjPoints += fpts;
                        }
                    }
                }

                totalProjPoints = Number((totalProjPoints).toFixed(1));

                if ($(".statistic-total-proj-points")[0]) {

                } else {
                    $(".statistic-total-avg-points").after('<div class="statistic-total-proj-points data-chunk data-chunk--medium" ng-if=":: !salary.hideAverage()"> <figure class="proj-avg-player-amount" style="color:steelblue;padding-left:30px">195.6</figure> <figcaption class="data-chunk-name" style="color:steelblue;padding-left:30px"">Projections</figcaption> </div>');
                }

                //console.log("Projected Points: " + totalProjPoints);
                $(".proj-avg-player-amount").text(totalProjPoints);
            };

            fill_total_projections();
            $(document).on('click', '.remove-from-roster, .player-add-button, .player-remove-button', fill_total_projections);

        });

        //Highlight Optimized LineUp to lightblue
        $.get("https://rotogrinders.com/projected-stats/" + sport + "/lineup?site=fanduel", function (data, status) {
            var el = document.createElement( 'div' );
            el.innerHTML = data;

            var load_top_lineup = function() {
                //console.log("loaded");

                var table = document.getElementsByClassName("player-list-vs-repeat-container")[0];
                var table_length = table.getElementsByTagName("tr").length;
                var table_row = table.getElementsByTagName("tr");

                var optimized_lineup_table = el.getElementsByTagName("tbody")[0];
                var lineup_rows = optimized_lineup_table.getElementsByTagName("tr");

                for (k = 0; k < lineup_rows.length; k++) {
                    var fullName = lineup_rows[k].getElementsByTagName("td")[1].innerText;

                    //console.log(fullName);

                    for (i = 0; i < table_length; i++) {
                        var firstName = table.getElementsByClassName("player-first-name")[i].innerText.replace(/\s/g, "");
                        var lastName = table.getElementsByClassName("player-last-name")[i].innerText.replace(/\s/g, "");

                        var fromTable_fullName = firstName.replace(/\s/g, "") + " " + lastName.replace(/\s/g, "");

                        if (fromTable_fullName === fullName) {
                            table_row[i].style.background = "PaleTurquoise";
                            break;
                        }
                    }
                }
            };

            load_top_lineup();
            $(".player-list-position-tab").on('click', load_top_lineup);
            $(".player-list-vs-repeat-container").on('scroll', load_top_lineup);
        });
    }
});

