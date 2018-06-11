import React, {Component} from 'react'
export default class extends Component {
    getEl=el=>{
        this.container=el
    }
    componentDidMount() {
        document.addEventListener('click', this.handle, true)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handle, true)
    }
    handle=e=>{
        const onOutClick  = this.props.onOutClick
        const el = this.container
        if(!el.contains(e.target)){
            onOutClick&&onOutClick(e)
        }
    }
    render() {
        const {children,onOutClick,...rest}=this.props
        return (
            <div ref={this.getEl} {...rest}>
                {children}
            </div>
        )
    }
}
