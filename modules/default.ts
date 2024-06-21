import {Module, SocketIoServer, SocketControllers, SocketContainer} from "@qaswa/deps";
import {EchoController} from "@qaswa/controllers";
import { DefaultEventsMap } from "socket_io/packages/event-emitter/mod.ts";

@Module({
	controllers: [
		EchoController
	],
	modules: []
})
export class DefaultAppModule {}
export const DefaultAppWs = (io: SocketIoServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>) => {
	new SocketControllers({
		io,
		controllers: [
			EchoController
		],
		container: SocketContainer
	})
}