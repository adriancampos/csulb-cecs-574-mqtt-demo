import paho.mqtt.subscribe as subscribe

subscribe.callback(lambda client, userdata, message: print(
    message.topic, str(message.payload)),
                   "/test/78ec5ca2-928f-11eb-a8b3-0242ac130003/#",
                   hostname='test.mosquitto.org',
                   port=1883)
