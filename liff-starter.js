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
                <?php
   			$accessToken = "9bGqcHO9FpNGiE/it1UzhOemU2sM2QsSl0W4M6dfq1QqJfitu8V2cvySu2k3Vmgh1Xbs8Uq31Mn1k4MBBQoakhT+DTMyqGXd8eXtaWAqr4JM1tJfE4hUTEuU/UCMdrYDaXobi3uvRdsyrBjZVO5KFgdB04t89/1O/w1cDnyilFU=";//copy ข้อความ Channel access token ตอนที่ตั้งค่า
   			$content = file_get_contents('php://input');
  			$arrayJson = json_decode($content, true);
   			$arrayHeader = array();
   			$arrayHeader[] = "Content-Type: application/json";
   			$arrayHeader[] = "Authorization: Bearer {$accessToken}";
   			//รับข้อความจากผู้ใช้
   			$message = $arrayJson['events'][0]['message']['text'];
   			//รับ id ของผู้ใช้
   			$id = $arrayJson['events'][0]['source']['userId'];
   			#ตัวอย่าง Message Type "Text + Sticker"
   			if($message == "สวัสดี"){
      				$arrayPostData['to'] = $id;
      				$arrayPostData['messages'][0]['type'] = "text";
      				$arrayPostData['messages'][0]['text'] = "สวัสดีจ้าาา";
      				$arrayPostData['messages'][1]['type'] = "sticker";
      				$arrayPostData['messages'][1]['packageId'] = "2";
      				$arrayPostData['messages'][1]['stickerId'] = "34";
      				pushMsg($arrayHeader,$arrayPostData);
   			}
   			function pushMsg($arrayHeader,$arrayPostData){
      				$strUrl = "https://api.line.me/v2/bot/message/push";
      				$ch = curl_init();
      				curl_setopt($ch, CURLOPT_URL,$strUrl);
      				curl_setopt($ch, CURLOPT_HEADER, false);
      				curl_setopt($ch, CURLOPT_POST, true);
      				curl_setopt($ch, CURLOPT_HTTPHEADER, $arrayHeader);
      				curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($arrayPostData));
      				curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
      				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      				$result = curl_exec($ch);
      				curl_close ($ch);
   			}
   			exit;
		?>
            }).catch(function (error) {
                window.alert("Error sending message: " + error);
        });  
    });
  });
};
