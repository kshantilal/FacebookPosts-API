
// Create a config.json file if it was pushed up to git
var accessToken;


	$.ajax({
		url: "./config.json",
		dataType: "json",
		beforeSend: function(xhr){
			if (xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}

		},
		success: function(DataFromJSON){
			// console.log(DataFromJSON.AccessToken);
			accessToken = DataFromJSON.AccessToken;
			getData();

		},
		error: function(){
			console.log("Something went wrong");
		}


	});



var Months = [
	
	{
		month: "January",
		count: 0
	},
	{
		month: "February",
		count: 0
	},
	{
		month: "March",
		count: 0
	},
	{
		month: "April",
		count: 0
	},
	{
		month: "May",
		count: 0
	},
	{
		month: "June",
		count: 0
	},
	{
		month: "July",
		count: 0
	},
	{
		month: "August",
		count: 0
	},
	{
		month: "September",
		count: 0
	},
	{
		month: "October",
		count: 0
	},
	{
		month: "November",
		count: 0
	},
	{
		month: "December",
		count: 0
	}

]

function getData(){
	$.ajax({
			url: "https://graph.facebook.com/v2.10/me/feed?limit=100&access_token=" + accessToken,
			dataType: "jsonp", //jsonp is a cross domain call.
			success: function(DataFromFacebook){
				console.log(DataFromFacebook.data);


				var posts = DataFromFacebook.data;
				console.log(posts[0].created_time);


				for (var i = 0; i < posts.length; i++) {
					var date = new Date(posts[i].created_time);
					
					var months = date.getMonth();
					Months[months].count += 1;
					// console.log(month);

				};
				// console.log(Months);
				createGraph();
				

			},
			error: function(){
				console.log("Something went wrong");

			}
	});
		

		function createGraph(){
			google.charts.load('current', {'packages':['corechart']});
	    	google.charts.setOnLoadCallback(drawChart);


	    	function drawChart(){
	    		var data = new google.visualization.DataTable();
	    		data.addColumn('string', 'Month');
	    		data.addColumn('number', 'Number of posts');
	 			for (var i = 0; i < Months.length; i++) {
	 				data.addRow([Months[i].month, Months[i].count]);

	 			};

	 			var options = {
	 				width: 1200,
	 				height: 600,

	 				hAxis: {
	 					title: 'Months of the year'
	 				},
	 				vAxis: {
	 					title: 'Amount of Posts'
	 				}
	 			}
	 			var chart = new google.visualization.LineChart(document.getElementById('Chart'));
	        	chart.draw(data, options);

	    	}

		}


}
	




















