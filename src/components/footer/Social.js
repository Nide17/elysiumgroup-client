import React, { Component } from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

class Social extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }

    render() {

        return (
            <li>
                <i className={`fa fa-${this.props.icon.name} fa-lg`} id={`Popover${this.props.icon.id}`} onClick={this.toggle}></i>

                <UncontrolledPopover trigger="legacy" placement="top" target={`Popover${this.props.icon.id}`} isOpen={this.state.popoverOpen} toggle={this.toggle}>

                    <PopoverHeader className="pop-header text-center">{this.props.icon.title}</PopoverHeader>
                    <PopoverBody>
                        <strong><a href={this.props.icon.link}>{this.props.icon.desc}</a></strong>
                    </PopoverBody>
                </UncontrolledPopover>
            </li>
        )

    }
}
export default Social;
