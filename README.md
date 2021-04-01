# Edge Timer Demo

## Python IoT 'devices'
Each instance simulates a physical device that can send start/stop/countup commands.
Run `timer.py`, optionally passing a name as the first argument. At the prompt, type one of: `start`, `stop`, `timer <seconds>`.
The program sends its state (along with its device id) to the mqtt server. 

`subscriber.py` listens to all of our messages and is useful for debugging.


## Frontend
Build frontend with:
`npm i`
`npm run build`

Develop frontend with:
`npm i`
`npm run dev`


## Notes
For now, I'm using the public `test.mosquitto.org` mqtt server with a "secret" topic (to reduce noise). Note that all messages are visible to everyone on the internet. That can be made private by swapping the public server out for a [self-hosted](https://hub.docker.com/_/eclipse-mosquitto) one or any other compatible server.