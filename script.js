// Setup Variables
// ===============================================================================
var authKey = "xLL3QDOIBtT7Mo2q36DRoGNABIAEf0sG";

// Search Parameters
var queryTerm = "";
var numResults = "";
var startYear = 0;
var endYear = 0;

// URL Base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// Variable to Track number of Articles
var articleCounter = 0;

// Functions
// ===============================================================================
function runQuery (numArticles, queryURL){
    //AJAX Function 
    $.ajax({url: queryURL, method: "GET"})
        .done(function(NYTData){
            // Clear the wells from the previous run 
            $("#wellSection").empty();
            for (var i=0; i<numArticles; i++){
                // Start dumping to HTML
                var wellSection = $("<div>");
                wellSection.addClass("well");
                wellSection.attr("id","articleWell-" + i);
                $("#wellSection").append(wellSection);
            
                if(NYTData.response.docs[i].headline != "null"){
                    $("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
                }

                if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")){
                    $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
                }

                // Attach the content to the appropriate well
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");  
                $("#articleWell-" + i).append("<a href="+ NYTData.response.docs[i].web_url + ">" +  NYTData.response.docs[i].web_url + "</a>");
            }

            console.log(queryURL);
            console.log(NYTData);
        })
   
}

// Main Processes
// ===============================================================================
$("#searchBtn").on("click", function(){
    // Get search term
    queryTerm = $("#search").val().trim();

    // Add in the Search Term
    var newURL = queryURLBase + "&q=" + queryTerm;

    // Get the number of Records
    numResults = $("#numRecords").val();

    //Get the Start Year and End Year
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim() + "0101";

    if (parseInt(startYear)) {
        // Add the neccessary fields
        startYear = startYear + "0101";
        // Add the date information to the URL
        newURL = newURL + "&begin_date=" + startYear;
    }
    if(parseInt(endYear)){
        // Add the neccessary fields
        endYear = endYear  + "0101";
        // Add the date information to the URL
        newURL = newURL  + "&end_date=" + endYear;
    }

    // Send the AJAX Call the newly assembled URL
    runQuery(numResults, newURL);

    return false;
})


