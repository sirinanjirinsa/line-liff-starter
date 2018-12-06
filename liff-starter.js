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
            var subjectuser = document.getElementById("subjects").value;
            var extuser = document.getElementById("extno").value;
            liff.sendMessages([{
                type: 'text',
                text: "From : " + messageuser + "\n"+
                      "Subject : "+ subjectuser + "\n"+
                      "Please call me : " + extuser 
            }]).then(function () {
                window.alert("Message sent");
            }).catch(function (error) {
                window.alert("Error sending message: " + error);
        });  
    });
  });
};
