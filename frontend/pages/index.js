import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Countdown from "react-countdown";
import mqtt from "mqtt";

export default function Home() {
  const [timers, setTimers] = useState({});

  useEffect(() => {
    var client = mqtt.connect("wss://test.mosquitto.org:8081");

    client.on("connect", function () {
      client.subscribe(
        "/test/78ec5ca2-928f-11eb-a8b3-0242ac130003/nodes/#",
        function (err) {}
      );
    });

    client.on("message", function (topic, message) {
      console.log(topic, JSON.parse(message));
      const timer_id = topic.split("/")[topic.split("/").length - 2];

      const payload = JSON.parse(message);
      const timerState = {
        id: timer_id,
        ...payload,
      };

      setTimers((timers) => {
        timers = { ...timers };
        timers[timerState.id] = timerState;
        return timers;
      });
    });
  }, []);

  const renderTimer = (timerState) => {
    let title = timerState.id;
    if (title.toLowerCase().includes("grilled")) {
      title = "🍔 " + title;
    } else if (title.toLowerCase().includes("chicken")) {
      title = "🐔 " + title;
    } else if (title.toLowerCase().includes("fries")) {
      title = "🍟 " + title;
    } else {
      title = "🍽️ " + title;
    }

    const date = timerState.timestamp
      ? new Date(timerState.timestamp * 1000)
      : new Date();

    return (
      <div key={timerState.id}>
        <Countdown
          date={date}
          key={date}
          overtime={timerState.countup}
          renderer={(props) => {
            return (
              <div
                className={
                  styles.card +
                  " " +
                  (!timerState.timestamp || props.total ? null : styles.red)
                }
                key={timerState.id}
              >
                <h3> {title} </h3>
                {timerState.timestamp ? (
                  <p>
                    {Math.abs(
                      parseInt(props.total / (1000 * 60))
                    ).toLocaleString("en-US", { minimumIntegerDigits: 2 })}
                    :
                    {props.seconds.toLocaleString("en-US", {
                      minimumIntegerDigits: 2,
                    })}
                  </p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
              </div>
            );
          }}
        ></Countdown>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Edge Timer Demo</title>
        <link rel="icon" href="/favicon.ico " />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}> Welcome to the edge timer demo! </h1>
        <div className={styles.grid}>
          {Object.values(timers).map(renderTimer)}
        </div>
      </main>
    </div>
  );
}
