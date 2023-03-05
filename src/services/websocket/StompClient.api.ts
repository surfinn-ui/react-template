import {
  Client,
  IFrame,
  IPublishParams,
  Message,
  StompSubscription,
} from '@stomp/stompjs';

export class StompClient {
  private client: Client;
  private subscriptions: { [key: string]: StompSubscription };

  constructor() {
    const { VITE_APP_WS_PREFIX, VITE_APP_WS_URL, VITE_APP_API_CONTEXT_PATH } =
      process.env;
    this.client = new Client({
      brokerURL: `${VITE_APP_WS_PREFIX}${VITE_APP_WS_URL}${VITE_APP_API_CONTEXT_PATH}/ws/maiwacs`,
      debug: function (str) {
        console.log(str);
      },
    });
    this.client.onStompError = this.onStompError;
    this.subscriptions = {};
  }

  onStompError(frame: IFrame) {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  }

  connect(onConnect: () => void) {
    this.client.onConnect = onConnect;
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  subscribe(destination: string, callback: (message: Message) => void) {
    if (this.subscriptions[destination]) {
      this.subscriptions[destination].unsubscribe();
      delete this.subscriptions[destination];
    }
    const subscription = this.client.subscribe(destination, callback);
    this.subscriptions[destination] = subscription;
  }

  unsubscribe(destination: string) {
    if (this.subscriptions[destination]) {
      this.subscriptions[destination].unsubscribe();
      delete this.subscriptions[destination];
    }
  }

  publish(params: IPublishParams) {
    this.client.publish(params);
  }
}

export default new StompClient();
