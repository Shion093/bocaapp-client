import awsIot from 'aws-iot-device-sdk';

let client, iotTopic;
const IoT = {

  connect: (topic, iotEndpoint, region, accessKey, secretKey, sessionToken) => {

    iotTopic = topic;

    client = awsIot.device({
      region: region,
      protocol: 'wss',
      accessKeyId: accessKey,
      secretKey: secretKey,
      sessionToken: sessionToken,
      port: 443,
      host: iotEndpoint
    });

    client.on('connect', onConnect);
    client.on('message', onMessage);
    client.on('close', onClose);
  },

  send: (message) => {
    client.publish(iotTopic, message);
  }
};

const onConnect = () => {
  client.subscribe(iotTopic);
  console.log('Connected');
};

const onMessage = (topic, message) => {
  console.log(message);
};

const onClose = () => {
  console.log('Connection failed');
};