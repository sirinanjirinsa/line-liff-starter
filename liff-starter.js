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
                    require __DIR__ . '/vendor/autoload.php';
                    use \LINE\LINEBot\SignatureValidator as SignatureValidator;

                    // load config
                    $dotenv = new Dotenv\Dotenv(__DIR__);
                    $dotenv->load();

                    // initiate app
                    $configs =  [
	                    'settings' => ['displayErrorDetails' => true],
                    ];
                    $app = new Slim\App($configs);

                    /* ROUTES */
                    $app->get('/', function ($request, $response) {
	                    return "Lanjutkan!";
                    });

                    $app->post('/', function ($request, $response)
                    {
	                // get request body and line signature header
	                $body 	   = file_get_contents('php://input');
	                $signature = $_SERVER['HTTP_X_LINE_SIGNATURE'];

	                // log body and signature
	                file_put_contents('php://stderr', 'Body: '.$body);

	                // is LINE_SIGNATURE exists in request header?
	                if (empty($signature)){
		                return $response->withStatus(400, 'Signature not set');
	                }

	                // is this request comes from LINE?
	                if($_ENV['PASS_SIGNATURE'] == false && ! SignatureValidator::validateSignature($body, $_ENV['CHANNEL_SECRET'], $signature)){
		                return $response->withStatus(400, 'Invalid signature');
	                }

	                // init bot
	                $httpClient = new \LINE\LINEBot\HTTPClient\CurlHTTPClient($_ENV['CHANNEL_ACCESS_TOKEN']);
	                $bot = new \LINE\LINEBot($httpClient, ['channelSecret' => $_ENV['CHANNEL_SECRET']]);
	                $data = json_decode($body, true);
	                foreach ($data['events'] as $event)
	                {
		                $userMessage = $event['message']['text'];
		                if(strtolower($userMessage) == 'halo')
		            {
			        $message = "Halo juga";
                    $textMessageBuilder = new \LINE\LINEBot\MessageBuilder\TextMessageBuilder($message);
			        $result = $bot->replyMessage($event['replyToken'], $textMessageBuilder);
			        return $result->getHTTPStatus() . ' ' . $result->getRawBody();
		            }
	            }
            });

            // $app->get('/push/{to}/{message}', function ($request, $response, $args)
            // {
            // 	$httpClient = new \LINE\LINEBot\HTTPClient\CurlHTTPClient($_ENV['CHANNEL_ACCESS_TOKEN']);
            // 	$bot = new \LINE\LINEBot($httpClient, ['channelSecret' => $_ENV['CHANNEL_SECRET']]);

            // 	$textMessageBuilder = new \LINE\LINEBot\MessageBuilder\TextMessageBuilder($args['message']);
            // 	$result = $bot->pushMessage($args['to'], $textMessageBuilder);

            // 	return $result->getHTTPStatus() . ' ' . $result->getRawBody();
            // });

            /* JUST RUN IT */
            $app->run();
            }).catch(function (error) {
                window.alert("Error sending message: " + error);
        });  
    });
  });
};
