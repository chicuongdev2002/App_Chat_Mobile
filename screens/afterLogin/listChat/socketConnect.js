import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socket = new SockJS('http://localhost:8080/ws');
export const stompClient = Stomp.over(socket);