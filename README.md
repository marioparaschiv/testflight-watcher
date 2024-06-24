# TestFlight Sniper
Watches TestFlight apps for open slots.

# Features
- Independent accounts for both redeeming and checking the status of an app
- Configurable interval
- Discord webhook support

# Setting Up - Getting Headers & Account IDs
- We will start off by setting up Fiddler Classic on our iDevice. You may begin by following the steps [here.](https://docs.telerik.com/fiddler/configure-fiddler/tasks/configureforios)

- Please make sure you follow this section of the guide in order to decrypt HTTPS traffic successfully:

![Image](https://i.imgur.com/pNehx3l.png)

- Assuming you have Fiddler Classic successfully set up with HTTPS decryption, you will proceed by grabbing the account id of the request through the network sniffer (Fiddler).

- An example of an account ID: `e1e54b3a-a56c-4c5d-b6t3-08ef3e647de7`

- To obtain the account id you must grab it from the web request that testflight makes when opening the app from the web, you may reproduce this by searching up the desired testflight app you would like to target, then opening it in Safari. The request will look like the following:

- Once you open that URL, Safari should redirect you to the TestFlight app on your phone, which will initiate the request we are looking to sniff.

- The request you will have to look for will look similar if not the same as: `/v3/accounts/${accountId}/ru/{code}`.

![Image](https://i.imgur.com/HZMxmIH.png)

- After selecting the request, proceed to the `Headers` panel.

- We can now see the needed headers to apply in our `config.json`. If you'd like to use the same account for both checking the status of the app and redeeming, fill both of `headers.checker` and `headers.redeemer` sections of the config with the same headers.

  ![Image](https://i.imgur.com/yYAfpmU.png)

- You may easily copy a header's value by using the right click context menu like so:

![Image](https://i.imgur.com/LOtkIzB.png)

- Once you're done with the headers and still haven't grabbed the account id, you may do so by copying this part of the URL:

![Image](https://i.imgur.com/W0B5auJ.png)

- As said before, if you'd like to use the same account for both checking the status of the app and redeeming, please fill out `accountId.checker` and `accountId.redeemer` with the same value in `config.json`

- That's all! You may now remove the Certificate Profile from your device by heading to `General -> VPN & Device Management` and deleting the `DO_NOT_TRUST_FiddlerRoot` profile.

- You may also want to remove the proxy we had set earlier by going into `WiFi -> Your Network -> (i) icon -> Configure Proxy` and setting it to `Off`

- Once done, you may proceed to launch the sniper by making sure you have dependencies installed (`npm i`) and using `node .` to start the sniper.
