import { CaseReducerWithPrepare, PayloadAction } from "@reduxjs/toolkit"

export interface IPeerNotifyMeta {
    notifyPeers: boolean
}

export type IPayloadActionWithPeerNotifyMeta<Payload = any, Meta = {}> = PayloadAction<Payload, string, IPeerNotifyMeta & Meta, void>

// @ts-ignore
export type IPeerNotfyCaseReducerWithPrepare<State, Payload, Meta = {}> = CaseReducerWithPrepare<State, IPayloadActionWithPeerNotifyMeta<Payload, Meta>>

export const prepareWithNotifyPeersMeta = <P>(payload: P, meta: IPeerNotifyMeta = { notifyPeers: true }) => {
    return {
        payload,
        meta,
        error: undefined
    }
}

export const shouldNotifyPeers = (action: IPayloadActionWithPeerNotifyMeta<any>) => action.meta && action.meta.notifyPeers