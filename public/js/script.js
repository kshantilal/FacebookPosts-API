
// Create a config.json file if it was pushed up to git
var accessToken;


	$.ajax({
		url: "config/config.json",
		dataType: "json",
		success: function(DataFromJSON){
			console.log(DataFromJSON.AccessToken);
			accessToken = DataFromJSON.AccessToken;
			getId();
		},
		error: function(){
			console.log("Something went wrong");
		}
	});


	var name = "CafeOlive";
	var pageid;
	function getId(){
	 $.ajax({
	   url: "https://graph.facebook.com/v2.10/"+name+"?access_token="+accessToken,
	   dataType:"jsonp",
	   success:function(DataFromFacebook){

		 console.log(DataFromFacebook);
		 pageid = DataFromFacebook.id;
		 facebookData();
	   },
	   error:function(){
		 console.log("Something went wrong");
	   }
	 });

}
	function facebookData(){

	  $.ajax({
		url: "https://graph.facebook.com/v2.10/"+pageid+"?fields=name,about,description,phone&access_token="+accessToken,
		dataType:"jsonp",
		success:function(DataFromFacebook){
		  console.log(DataFromFacebook);
		},
		error:function(){
		  console.log("Something went wrong");
		}
	  });

	};
 
	




















