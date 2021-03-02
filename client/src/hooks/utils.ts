import { IPeerNotifyMeta } from "../store/utils/notifyPeers-meta-builder";

export type IHookActionWithPeerNotify<V = void> = (meta?: IPeerNotifyMeta) => ValueCallback<V>