import { CSSProperties, ReactNode, useRef, useState, createContext, useEffect } from 'react'
import { Form, FormInstance } from 'antd'
import './index.scss'

export const FormContext = createContext({
    formWidth: 0,
    preview: false,
})

export interface Props {
    name?: string
    labelSpan?: number
    initData?: Record<string, any>
    preview?: boolean
    onReset?: (form: Record<string, any>) => void
    onSubmit?: (form: Record<string, any>) => void
    children?: ReactNode
    disabled?: boolean

    onReady?: (form: FormInstance) => void

    className?: string
    style?: CSSProperties
}
export default (props: Props) => {
    const [width, setWidth] = useState(0)
    const formRef = useRef<HTMLDivElement>(null)
    const [form] = Form.useForm()

    useEffect(() => {
        props.onReady && props.onReady(form)
    }, [])

    useEffect(() => {
        if (formRef.current) {
            setWidth(formRef.current.clientWidth)
        }
        const onWinResize = () => {
            if (formRef.current) {
                setWidth(formRef.current.clientWidth)
            }
        }
        window.addEventListener('resize', onWinResize);
        return () => window.removeEventListener('resize', onWinResize);
    }, [formRef.current])

    return (
        <div className={props.disabled ? 'form form-disabled' : 'form'} ref={formRef}>
            <FormContext.Provider value={{ formWidth: width, preview: props.preview ?? false }}>
                <Form
                    form={form}

                    labelWrap={true}
                    initialValues={props.initData}
                    onReset={props.onReset}
                    onFinish={props.onSubmit}
                    autoComplete="off"

                    size='middle'
                    name={props.name}
                    className={props.className}
                    style={props.style}
                >
                    {props.children}
                </Form>
            </FormContext.Provider>
        </div>
    )
}