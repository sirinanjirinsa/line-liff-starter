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
            liff.sendMessages([{
                type: 'text',
                text: "Messageuser From : " + messageuser + "You've successfully sent a message! Hooray!"
            }, {
                type: 'sticker',
                packageId: '2',
                stickerId: '144'
            }]).then(function () {
                window.alert("Message sent");
            }).catch(function (error) {
                window.alert("Error sending message: " + error);
        });  
    });
  });
};
