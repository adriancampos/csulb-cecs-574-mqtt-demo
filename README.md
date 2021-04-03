# Edge Timer Demo

## Python IoT 'devices'
Each instance simulates a physical device that can send start/stop/countup commands.
#### Prerequisites
Python 3.5+ and pip
[paho-mqtt](https://pypi.org/project/paho-mqtt/) 1.5.1 (can be installed with `pip install -r requirements.txt`)


Run `timer.py`, optionally passing a name as the first argument.
`python timer.py "chicken timer"`
At the prompt, type one of: `start`, `stop`, `timer <seconds>`.
The program sends its state (along with its device id) to the mqtt server. 

`subscriber.py` listens to all of our messages and is useful for debugging. 
Run 
`python subscriber.py`
in a second terminal to inspect mqtt messages. 


## Frontend
A current build of the frontend can be cound at https://adriancampos.github.io/csulb-cecs-574-mqtt-demo/. To build it yourself:
#### Prerequisites
NodeJS (v12.21+) and npm
#### Build/Develop
##### Develop frontend with:
`cd frontend`
`npm i`
`npm run dev`
Nextjs will start a server on http://localhost:3000 with a webpage that live-updates as you modify `index.js`.

The main page can be found in `index.js`.

##### Build frontend with:
`cd frontend`
`npm i`
`npm run build`
At this point, Nextjs has exported a static site into `out` that can be deployed on any webserver.
Optionally, you can run
`npm run start`
Nextjs will start a server on http://localhost:3000.



## Notes
For now, I'm using the public `test.mosquitto.org` mqtt server with a "secret" topic (to reduce noise). Note that all messages are visible to everyone on the internet. That can be made private by swapping the public server out for a [self-hosted](https://hub.docker.com/_/eclipse-mosquitto) one or any other compatible server.
