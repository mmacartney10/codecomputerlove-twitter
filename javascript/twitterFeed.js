var socket = io(),
	dataBlock = '[data-block]',
	blockBackground = $(dataBlock).css('background-image'),
	$tweetContainer = $('[data-tweet-container]'),
	$hearContainer = $('[data-heart]'),
	boxesArr = $(dataBlock),
	boxesLength = boxesArr.length,
	correctUsers = [
		//{username:'test', text:'test', image:'http://greensportsalliance.org/images/lightGreenSquare.gif', qno:'test', answer:'test', time:'5'},
		//{username:'hello', text:'test', image:'http://greensportsalliance.org/images/lightGreenSquare.gif', qno:'test', answer:'test', time:'5'}
	],
	usedUsers = [],
	
	unusedSquares = [],
	usedSquares = [],
	d = new Date(),
	minutes = d.getMinutes();

function getRand(len){
	return Math.floor(Math.random() * len);
}

function populateUsedUsers(username){
	console.log('used users: ' + username);
	username = [{'username': username }];
	usedUsers.push(username);
}
function populateCorrectUsers(username){
	console.log('correct users: ' + username);
	username = [{'username': username }];
	correctUsers.push(username);
}

function log(str){
	$('[data-output]').append(str +'<br />');
}

function getRandBox(){
	var box = getRand(boxesLength),
	randBox = $(dataBlock)[box];
	$(randBox).data('block', usedUsers[usedUsers.length-1][0].username);
}

socket.on('info', function(data, info){

	var username =  data.tweet.user.screen_name,
		text = data.tweet.text,
		image = data.tweet.user.profile_image_url,
		question,
		answer,
		time = data.tweet.created_at,
		hashtag = data.tweet.entities.hashtags,
		checkForString;


	for(var i = 0; i < hashtag.length; i++){
		checkForString = data.tweet.entities.hashtags[i].text;
	}

	//check for correct hash tag
	
	
	if((checkForString !== 'music')) return;
	//console.log(checkForString);
	
			
		//check if user has provided question with answer
		for(var i = 0; i < 3; i++){
			testQuestion = info.info.question[i].number;
			testAnswer = info.info.question[i].answer;

			//console.log(testQuestion);

			if(text.toLowerCase().indexOf(question) >= 0) {
				//console.log(text);
				//console.log('found');
			}else{
				//console.log(text);
				//console.log('not found');
			}
		}
		
		$tweetContainer.prepend('<div> <img src=" '+ data.tweet.user.profile_image_url +' "> <li>' + data.tweet.text + '</li> <li> ' + data.tweet.created_at + '</li></div>');
		//correctUsers.push({username:username, text:text, image:image, qno:question, answer:answer, time:minutes});
		

	
	
	var usersLength = correctUsers.length,
		usedUsersLength = usedUsers.length;

	// add the first correct user
	if(usersLength <= 0){
		populateCorrectUsers(username);
	}

	// check if the correct user exists, if not then add to the correct user array
	var cUName = correctUsers.indexOf(username);
	if(cUName < 0){
		populateCorrectUsers(username);
	}

	// add the first used user
	if(usedUsersLength <= 0){
		populateUsedUsers(username);
		getRandBox();
	}

	/* only need used users for the amount of boxes available
	* so check.  then check if used user exists, if not add to the array
	*/
	if(usedUsersLength < boxesLength && usedUsersLength > 0){
		var uUName = usedUsers.indexOf(username);
		if(uUName < 0){
			populateUsedUsers(username);
			getRandBox();
		}
	}
	
	if(usedUsersLength === 2){
		//setInterval(function(){
			usedUsers.shift();
			console.log('one removed');
			
		//}, 300);
	}
	
	console.log(usedUsers);

	/*$(boxesArr).each(function(i, elem){

		//get random image url and box number, then get the specific box
		var randNum = getRand(usersLength),
			user = correctUsers[randNum].username,
			box = getRand(boxesLength),
			selectBox = $(elem),
			randBox = $(dataBlock)[box];

		var isEmpty = $(randBox).data('block') === '';

		if(!isEmpty) return;

		//populate boxes
		$(randBox).data('block', username);
		
	});*/
});

