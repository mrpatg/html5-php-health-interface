function locationSearch(query){
        clearReports();
        clearBrowse();
        $.ajax({
            url: 'https://health.beckley.io/api/locations/search/' + query,
            dataType: 'json',
            success: function (data) {
                console.log(data.data);
                if(data.data.length > 0){
                    $('#results_text').text(data.data.length + ' results for ' + query);
                }else{
                    $('#results_text').text('No results for ' + query); 
                }
                // Empty the results-container
                $('#results-container').empty();
                $('#right-results-container').empty();
                // Establish content variable
                var content;
                // Loop through returned data and appent to the results container if any exists
                content = '<div class="list-group">';
                for (var x = 0; x < data.data.length; x++) {
                    var content;
                    content = '<li id="view_reports" data-location-name="' + data.data[x].location_name + '" data-query="' + query + '"';
                    content += 'data-location-locality="'+ data.data[x].locality_name +'" data-location-address="' + data.data[x].location_address + '" ';
                    content += 'data-location="' + data.data[x].location_id + '" class="list-group-item list-group-item-action flex-column align-items-start">';
                    content += '<div class="row">';
                    content += '<div class="col-md-8">';
                    content += data.data[x].location_name;
                    content += '<br><small>';
                    content += data.data[x].location_address;
                    content += '</small>';
                    content += '</div><div class="col-md-4 text-right">';
                    content += '<div class="align-self-center badge badge-danger">';
                    content += data.data[x].reports_meta['critical_reports'];
                    content += '</div>';
                    content += '<div class="align-self-center badge badge-secondary">';
                    content += data.data[x].reports_meta['non_critical_reports'];
                    content += '</div></div>';
                    content += '</li>';
                    $('#results-container').append(content);
                // updateListing(data[x]);
                }
                content_footer = '</div>';
                $('#results-container').append(content_footer);
            }
        });
}

function clearReports(){
    $('#results-container').empty();
    $('#right-results-container').empty();
}
function clearBrowse(){
    $('#browse_locations').empty();
}

$(document).on('click', '.list-group-item', function(){
    detail_report_id = $(this).data('target');
    color = $(this).data('color');
    $(detail_report_id).toggleClass('detail_active');
    $(this).toggleClass('detail_active');
});
$( document ).ready(function() {
    $("#location_name").keydown(function(event) {

        if (event.keyCode === 13) {
            
            locationSearch($('#location_name').val());
        }
    });
});