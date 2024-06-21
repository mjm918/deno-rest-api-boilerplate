// deno-lint-ignore-file no-explicit-any
import {Controller, Get, Headers, SocketController, OnMessage, ConnectedSocket, SocketService, MessageBody} from "@qaswa/deps";
import {log} from "@qaswa/middlewares";

@SocketService()
@SocketController()
@Controller("echo")
export class EchoController {
	@Get()
	echo(@Headers("user-agent") userAgent: string) {
		return { status: "ok", userAgent };
	}
	@OnMessage('message')
	connection(@ConnectedSocket() socket: any, @MessageBody() message: any) {
		log.info('message '.concat(message));
	}
}