window.onload = function (e) {
    liff.init(function (data) {
        
        liff.getProfile().then(function (profile) {
            var profilePictureDiv = document.getElementById('profilepicturediv');
            var img = document.createElement('img');
            img.src = profile.pictureUrl;
            profilePictureDiv.appendChild(img);
            document.getElementById('displaynamefield').textContent = profile.displayName;
        }).catch(function (error) {
            window.alert("Error getting profile: " + error);
        });
        
        document.getElementById('sendmessagebutton').addEventListener('click', function () {
            var messageuser = document.getElementById("fromname").value;
            var roomno = document.getElementById("roomno").value;
            var subjectuser = document.getElementById("subjects").value;
            var extuser = document.getElementById("extno").value;
            liff.sendMessages([{
                type: 'text',
                text: "From : " + messageuser + "\n"+
                      "Room no. : "+ roomno + "\n"+
                      "Subject : "+ subjectuser + "\n"+
                      "Call me back ext. : " + extuser 
            }]).then(function () {
                window.alert("Message sent");
            }).catch(function (error) {
                window.alert("Error sending message: " + error);
        });  
    });
  });
};
