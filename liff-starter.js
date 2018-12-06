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
        
        
        
    });
   
};
