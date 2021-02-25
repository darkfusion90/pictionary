type VoidCallback<R = void> = () => R
type ValueCallback<V, R = void> = (value: V) => R
type Hook<Meta, Actions> = [Meta, Actions]

interface BasicProps {
    className?: string
}