import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
import json
import uuid


class Publisher:
    def __init__(self, id, hostname='test.mosquitto.org', port=1883) -> None:
        self._id = id
        self._hostname = hostname
        self._port = port

    def publish(self, topic, payload):
        # Note: it would be better to initialize a client instance and maintain a connection
        #       rather than reconnecting for every message.
        #       To keep the demo simple, I will avoid the async code and use only blocking calls.
        publish.single(topic,
                       payload,
                       hostname=self._hostname,
                       port=self._port)

    def publish_state(self, payload):
        self.publish(
            f'/test/78ec5ca2-928f-11eb-a8b3-0242ac130003/nodes/{self._id}/state',
            json.dumps(payload))


import sys

id = sys.argv[1] if len(sys.argv) >= 2 else uuid.uuid1()
p = Publisher(id)

import datetime

timer_state = {}


def publish_timer():
    p.publish_state(timer_state)


publish_timer()
while True:
    try:
        cmd = input('> ')

        args = cmd.split()
        c = args.pop(0).lower()
        if c == 'start':
            timer_state['timestamp'] = datetime.datetime.utcnow().timestamp()
            timer_state['countup'] = True
            publish_timer()

        if c == 'stop':
            timer_state['timestamp'] = None
            publish_timer()

        if c == 'timer':
            timer_state['timestamp'] = (
                datetime.datetime.utcnow() +
                datetime.timedelta(seconds=int(args[0]))).timestamp()
            timer_state['countup'] = False
            publish_timer()

    except KeyboardInterrupt:
        print()
        exit()
    except Exception as e:
        print(e)
