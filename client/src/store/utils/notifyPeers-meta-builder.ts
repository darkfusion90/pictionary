import { CaseReducerWithPrepare, PayloadAction } from "@reduxjs/toolkit"

export interface IPeerNotifyMeta {
    notifyPeers: boolean
}

export type IPayloadActionWithPeerNotifyMeta<Payload> = PayloadAction<Payload, string, IPeerNotifyMeta, void>

// @ts-ignore
export type IPeerNotfyCaseReducerWithPrepare<State, Payload> = CaseReducerWithPrepare<State, IPayloadActionWithPeerNotifyMeta<Payload>>

export const prepareWithNotifyPeersMeta = <P>(payload: P, meta: IPeerNotifyMeta = { notifyPeers: true }) => {
    return {
        payload,
        meta,
        error: undefined
    }
}

export const shouldNotifyPeers = (action: IPayloadActionWithPeerNotifyMeta<any>) => action.meta && action.meta.notifyPeers